/* eslint-disable */
const canvas = document.getElementById('canvas');

const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const config = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1024,
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 1,
  VELOCITY_DISSIPATION: 0.2,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 20,
  CURL: 30,
  SPLAT_RADIUS: 0.25,
  SPLAT_FORCE: 6000,
  SHADING: true,
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  TRANSPARENT: false,
  BLOOM: true,
  BLOOM_ITERATIONS: 8,
  BLOOM_RESOLUTION: 128,
  BLOOM_INTENSITY: 0.7,
  BLOOM_THRESHOLD: 0.5,
  BLOOM_SOFT_KNEE: 0.6,
  SUNRAYS: true,
  SUNRAYS_RESOLUTION: 128,
  SUNRAYS_WEIGHT: 1.0,
};

function pointerPrototype() {
  this.id = -1;
  this.texcoordX = 0;
  this.texcoordY = 0;
  this.prevTexcoordX = 0;
  this.prevTexcoordY = 0;
  this.deltaX = 0;
  this.deltaY = 0;
  this.down = false;
  this.moved = false;
  this.color = [30, 0, 300];
}
let pointers = [];
window.splatStack = [];
pointers.push(new pointerPrototype());

const { gl, ext } = getWebGLContext(canvas);

if (isMobile) {
  config.DYE_RESOLUTION = 512;
}
if (!ext.supportLinearFiltering) {
  config.DYE_RESOLUTION = 512;
  config.SHADING = false;
  config.BLOOM = false;
  config.SUNRAYS = false;
}

function getWebGLContext(canvas) {
  const params = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
  };
  let gl = canvas.getContext('webgl2', params);
  const isWebGL2 = !!gl;
  if (!isWebGL2)
    gl =
      canvas.getContext('webgl', params) ||
      canvas.getContext('experimental-webgl', params);
  let halfFloat;
  let supportLinearFiltering;
  if (isWebGL2) {
    gl.getExtension('EXT_color_buffer_float');
    supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
  } else {
    halfFloat = gl.getExtension('OES_texture_half_float');
    supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
  }
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
  let formatRGBA;
  let formatRG;
  let formatR;
  if (isWebGL2) {
    formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
    formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
    formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
  } else {
    formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
  }
  return {
    gl,
    ext: {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering,
    },
  };
}

function getSupportedFormat(gl, internalFormat, format, type) {
  if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
    switch (internalFormat) {
      case gl.R16F:
        return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
      case gl.RG16F:
        return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
      default:
        return null;
    }
  }
  return {
    internalFormat,
    format,
  };
}

function supportRenderTextureFormat(gl, internalFormat, format, type) {
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
  let fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0,
  );
  let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  return status == gl.FRAMEBUFFER_COMPLETE;
}

function textureToCanvas(texture, width, height) {
  let ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  let imageData = ctx.createImageData(width, height);
  imageData.data.set(texture);
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

function downloadURI(filename, uri) {
  let link = document.createElement('a');
  link.download = filename;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

class Material {
  constructor(vertexShader, fragmentShaderSource) {
    this.vertexShader = vertexShader;
    this.fragmentShaderSource = fragmentShaderSource;
    this.programs = [];
    this.activeProgram = null;
    this.uniforms = [];
  }
  setKeywords(keywords) {
    let hash = 0;
    for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);
    let program = this.programs[hash];
    if (program == null) {
      let fragmentShader = compileShader(
        gl.FRAGMENT_SHADER,
        this.fragmentShaderSource,
        keywords,
      );
      program = createProgram(this.vertexShader, fragmentShader);
      this.programs[hash] = program;
    }
    if (program == this.activeProgram) return;
    this.uniforms = getUniforms(program);
    this.activeProgram = program;
  }
  bind() {
    gl.useProgram(this.activeProgram);
  }
}
class Program {
  constructor(vertexShader, fragmentShader) {
    this.uniforms = {};
    this.program = createProgram(vertexShader, fragmentShader);
    this.uniforms = getUniforms(this.program);
  }
  bind() {
    gl.useProgram(this.program);
  }
}
function createProgram(vertexShader, fragmentShader) {
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    console.trace(gl.getProgramInfoLog(program));
  return program;
}
function getUniforms(program) {
  let uniforms = [];
  let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < uniformCount; i++) {
    let uniformName = gl.getActiveUniform(program, i).name;
    uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
  }
  return uniforms;
}
function compileShader(type, source, keywords) {
  source = addKeywords(source, keywords);
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    console.trace(gl.getShaderInfoLog(shader));
  return shader;
}
function addKeywords(source, keywords) {
  if (keywords == null) return source;
  let keywordsString = '';
  keywords.forEach((keyword) => {
    keywordsString += '#define ' + keyword + '\n';
  });
  return keywordsString + source;
}
const baseVertexShader = compileShader(
  gl.VERTEX_SHADER,
  `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;
    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`,
);
const blurVertexShader = compileShader(
  gl.VERTEX_SHADER,
  `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;
    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`,
);
const blurShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform sampler2D uTexture;
    void main () {
        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
        sum += texture2D(uTexture, vL) * 0.35294117;
        sum += texture2D(uTexture, vR) * 0.35294117;
        gl_FragColor = sum;
    }
`,
);
const copyShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`,
);
const clearShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;
    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`,
);
const colorShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision mediump float;
    uniform vec4 color;
    void main () {
        gl_FragColor = color;
    }
`,
);
const checkerboardShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;
    #define SCALE 25.0
    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`,
);
const displayShaderSource = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;
    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }
    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;
        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);
        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);
        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
    #endif
    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif
    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif
    #ifdef BLOOM
        float noise = texture2D(uDithering, vUv * ditherScale).r;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif
        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
`;
const bloomPrefilterShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;
    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
`,
);
const bloomBlurShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
`,
);
const bloomFinalShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision mediump float;
    precision mediump sampler2D;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;
    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
`,
);
const sunraysMaskShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }
`,
);
const sunraysShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float weight;
    #define ITERATIONS 16
    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;
        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;
        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;
        float color = texture2D(uTexture, vUv).a;
        for (int i = 0; i < ITERATIONS; i++)
        {
            coord -= dir;
            float col = texture2D(uTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }
        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
    }
`,
);
const splatShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;
    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`,
);
const advectionShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;
    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;
        vec2 iuv = floor(st);
        vec2 fuv = fract(st);
        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }
    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }`,
  ext.supportLinearFiltering ? null : ['MANUAL_FILTERING'],
);
const divergenceShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }
        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`,
);
const curlShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`,
);
const vorticityShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;
    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`,
);
const pressureShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`,
);
const gradientSubtractShader = compileShader(
  gl.FRAGMENT_SHADER,
  `
    precision mediump float;
    precision mediump sampler2D;
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;
    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`,
);
const blit = (() => {
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
    gl.STATIC_DRAW,
  );
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([0, 1, 2, 0, 2, 3]),
    gl.STATIC_DRAW,
  );
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);
  return (target, clear = false) => {
    if (target == null) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
      gl.viewport(0, 0, target.width, target.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    }

    if (clear) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  };
})();

let dye;
let velocity;
let divergence;
let curl;
let pressure;
let bloom;
let bloomFramebuffers = [];
let sunrays;
let sunraysTemp;
const blurProgram = new Program(blurVertexShader, blurShader);
const copyProgram = new Program(baseVertexShader, copyShader);
const clearProgram = new Program(baseVertexShader, clearShader);
const colorProgram = new Program(baseVertexShader, colorShader);
const checkerboardProgram = new Program(baseVertexShader, checkerboardShader);
const bloomPrefilterProgram = new Program(
  baseVertexShader,
  bloomPrefilterShader,
);
const bloomBlurProgram = new Program(baseVertexShader, bloomBlurShader);
const bloomFinalProgram = new Program(baseVertexShader, bloomFinalShader);
const sunraysMaskProgram = new Program(baseVertexShader, sunraysMaskShader);
const sunraysProgram = new Program(baseVertexShader, sunraysShader);
const splatProgram = new Program(baseVertexShader, splatShader);
const advectionProgram = new Program(baseVertexShader, advectionShader);
const divergenceProgram = new Program(baseVertexShader, divergenceShader);
const curlProgram = new Program(baseVertexShader, curlShader);
const vorticityProgram = new Program(baseVertexShader, vorticityShader);
const pressureProgram = new Program(baseVertexShader, pressureShader);
const gradienSubtractProgram = new Program(
  baseVertexShader,
  gradientSubtractShader,
);
const displayMaterial = new Material(baseVertexShader, displayShaderSource);
function initFramebuffers() {
  let simRes = getResolution(config.SIM_RESOLUTION);
  let dyeRes = getResolution(config.DYE_RESOLUTION);
  const texType = ext.halfFloatTexType;
  const rgba = ext.formatRGBA;
  const rg = ext.formatRG;
  const r = ext.formatR;
  const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
  gl.disable(gl.BLEND);
  if (dye == null)
    dye = createDoubleFBO(
      dyeRes.width,
      dyeRes.height,
      rgba.internalFormat,
      rgba.format,
      texType,
      filtering,
    );
  else
    dye = resizeDoubleFBO(
      dye,
      dyeRes.width,
      dyeRes.height,
      rgba.internalFormat,
      rgba.format,
      texType,
      filtering,
    );
  if (velocity == null)
    velocity = createDoubleFBO(
      simRes.width,
      simRes.height,
      rg.internalFormat,
      rg.format,
      texType,
      filtering,
    );
  else
    velocity = resizeDoubleFBO(
      velocity,
      simRes.width,
      simRes.height,
      rg.internalFormat,
      rg.format,
      texType,
      filtering,
    );
  divergence = createFBO(
    simRes.width,
    simRes.height,
    r.internalFormat,
    r.format,
    texType,
    gl.NEAREST,
  );
  curl = createFBO(
    simRes.width,
    simRes.height,
    r.internalFormat,
    r.format,
    texType,
    gl.NEAREST,
  );
  pressure = createDoubleFBO(
    simRes.width,
    simRes.height,
    r.internalFormat,
    r.format,
    texType,
    gl.NEAREST,
  );
  initBloomFramebuffers();
  initSunraysFramebuffers();
}
function initBloomFramebuffers() {
  let res = getResolution(config.BLOOM_RESOLUTION);
  const texType = ext.halfFloatTexType;
  const rgba = ext.formatRGBA;
  const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
  bloom = createFBO(
    res.width,
    res.height,
    rgba.internalFormat,
    rgba.format,
    texType,
    filtering,
  );
  bloomFramebuffers.length = 0;
  for (let i = 0; i < config.BLOOM_ITERATIONS; i++) {
    let width = res.width >> (i + 1);
    let height = res.height >> (i + 1);
    if (width < 2 || height < 2) break;
    let fbo = createFBO(
      width,
      height,
      rgba.internalFormat,
      rgba.format,
      texType,
      filtering,
    );
    bloomFramebuffers.push(fbo);
  }
}
function initSunraysFramebuffers() {
  let res = getResolution(config.SUNRAYS_RESOLUTION);
  const texType = ext.halfFloatTexType;
  const r = ext.formatR;
  const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
  sunrays = createFBO(
    res.width,
    res.height,
    r.internalFormat,
    r.format,
    texType,
    filtering,
  );
  sunraysTemp = createFBO(
    res.width,
    res.height,
    r.internalFormat,
    r.format,
    texType,
    filtering,
  );
}
function createFBO(w, h, internalFormat, format, type, param) {
  gl.activeTexture(gl.TEXTURE0);
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
  let fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0,
  );
  gl.viewport(0, 0, w, h);
  gl.clear(gl.COLOR_BUFFER_BIT);
  let texelSizeX = 1.0 / w;
  let texelSizeY = 1.0 / h;
  return {
    texture,
    fbo,
    width: w,
    height: h,
    texelSizeX,
    texelSizeY,
    attach(id) {
      gl.activeTexture(gl.TEXTURE0 + id);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return id;
    },
  };
}
function createDoubleFBO(w, h, internalFormat, format, type, param) {
  let fbo1 = createFBO(w, h, internalFormat, format, type, param);
  let fbo2 = createFBO(w, h, internalFormat, format, type, param);
  return {
    width: w,
    height: h,
    texelSizeX: fbo1.texelSizeX,
    texelSizeY: fbo1.texelSizeY,
    get read() {
      return fbo1;
    },
    set read(value) {
      fbo1 = value;
    },
    get write() {
      return fbo2;
    },
    set write(value) {
      fbo2 = value;
    },
    swap() {
      let temp = fbo1;
      fbo1 = fbo2;
      fbo2 = temp;
    },
  };
}
function resizeFBO(target, w, h, internalFormat, format, type, param) {
  let newFBO = createFBO(w, h, internalFormat, format, type, param);
  copyProgram.bind();
  gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
  blit(newFBO);
  return newFBO;
}
function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
  if (target.width == w && target.height == h) return target;
  target.read = resizeFBO(
    target.read,
    w,
    h,
    internalFormat,
    format,
    type,
    param,
  );
  target.write = createFBO(w, h, internalFormat, format, type, param);
  target.width = w;
  target.height = h;
  target.texelSizeX = 1.0 / w;
  target.texelSizeY = 1.0 / h;
  return target;
}
function createTextureAsync(url) {
  let texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGB,
    1,
    1,
    0,
    gl.RGB,
    gl.UNSIGNED_BYTE,
    new Uint8Array([255, 255, 255]),
  );
  let obj = {
    texture,
    width: 1,
    height: 1,
    attach(id) {
      gl.activeTexture(gl.TEXTURE0 + id);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return id;
    },
  };
  let image = new Image();
  image.onload = () => {
    obj.width = image.width;
    obj.height = image.height;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  };
  image.src = url;
  return obj;
}
function updateKeywords() {
  let displayKeywords = [];
  if (config.SHADING) displayKeywords.push('SHADING');
  if (config.BLOOM) displayKeywords.push('BLOOM');
  if (config.SUNRAYS) displayKeywords.push('SUNRAYS');
  displayMaterial.setKeywords(displayKeywords);
}
updateKeywords();
// initFramebuffers();

requestAnimationFrame(() => {
  multipleSplats(parseInt(Math.random()) + 5);
});

let lastUpdateTime = Date.now();
let colorUpdateTimer = 0.0;

function update() {
  const dt = calcDeltaTime();
  const resizedCanvas = resizeCanvas();
  if (resizedCanvas) initFramebuffers();
  updateColors(dt);
  applyInputs();
  if (!config.PAUSED) step(dt);
  render(null);

  requestAnimationFrame(update);
}

update();

setInterval(() => {
  requestAnimationFrame(() => {
    multipleSplats(parseInt(Math.random() * 1) + 4);
  });
}, 4000);

function calcDeltaTime() {
  let now = Date.now();
  let dt = (now - lastUpdateTime) / 1000;
  dt = Math.min(dt, 0.016666);
  lastUpdateTime = now;
  return dt;
}
function resizeCanvas() {
  let width = scaleByPixelRatio(canvas.clientWidth);
  let height = scaleByPixelRatio(canvas.clientHeight);
  if (canvas.width != width || canvas.height != height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}
function updateColors(dt) {
  if (!config.COLORFUL) return;
  colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
  if (colorUpdateTimer >= 1) {
    colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
    pointers.forEach((p) => {
      p.color = generateColor();
    });
  }
}
function applyInputs() {
  if (window.splatStack.length > 0) multipleSplats(window.splatStack.pop());
  pointers.forEach((p) => {
    if (p.moved) {
      p.moved = false;
      splatPointer(p);
    }
  });
}

function step(dt) {
  gl.disable(gl.BLEND);
  curlProgram.bind();
  gl.uniform2f(
    curlProgram.uniforms.texelSize,
    velocity.texelSizeX,
    velocity.texelSizeY,
  );
  gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
  blit(curl);
  vorticityProgram.bind();
  gl.uniform2f(
    vorticityProgram.uniforms.texelSize,
    velocity.texelSizeX,
    velocity.texelSizeY,
  );
  gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
  gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
  gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
  gl.uniform1f(vorticityProgram.uniforms.dt, dt);
  blit(velocity.write);
  velocity.swap();
  divergenceProgram.bind();
  gl.uniform2f(
    divergenceProgram.uniforms.texelSize,
    velocity.texelSizeX,
    velocity.texelSizeY,
  );
  gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
  blit(divergence);
  clearProgram.bind();
  gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
  gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
  blit(pressure.write);
  pressure.swap();
  pressureProgram.bind();
  gl.uniform2f(
    pressureProgram.uniforms.texelSize,
    velocity.texelSizeX,
    velocity.texelSizeY,
  );
  gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
  for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
    gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
    blit(pressure.write);
    pressure.swap();
  }
  gradienSubtractProgram.bind();
  gl.uniform2f(
    gradienSubtractProgram.uniforms.texelSize,
    velocity.texelSizeX,
    velocity.texelSizeY,
  );
  gl.uniform1i(
    gradienSubtractProgram.uniforms.uPressure,
    pressure.read.attach(0),
  );
  gl.uniform1i(
    gradienSubtractProgram.uniforms.uVelocity,
    velocity.read.attach(1),
  );
  blit(velocity.write);
  velocity.swap();
  advectionProgram.bind();
  gl.uniform2f(
    advectionProgram.uniforms.texelSize,
    velocity.texelSizeX,
    velocity.texelSizeY,
  );
  if (!ext.supportLinearFiltering)
    gl.uniform2f(
      advectionProgram.uniforms.dyeTexelSize,
      velocity.texelSizeX,
      velocity.texelSizeY,
    );
  let velocityId = velocity.read.attach(0);
  gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
  gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
  gl.uniform1f(advectionProgram.uniforms.dt, dt);
  gl.uniform1f(
    advectionProgram.uniforms.dissipation,
    config.VELOCITY_DISSIPATION,
  );
  blit(velocity.write);
  velocity.swap();
  if (!ext.supportLinearFiltering)
    gl.uniform2f(
      advectionProgram.uniforms.dyeTexelSize,
      dye.texelSizeX,
      dye.texelSizeY,
    );
  gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
  gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
  gl.uniform1f(
    advectionProgram.uniforms.dissipation,
    config.DENSITY_DISSIPATION,
  );
  blit(dye.write);
  dye.swap();
}
function render(target) {
  // if (config.BLOOM) {
  //   requestAnimationFrame(() => {
  //     applyBloom(dye.read, bloom);
  //   });
  // }
  // if (config.SUNRAYS) {
  //   requestAnimationFrame(() => {
  //     applySunrays(dye.read, dye.write, sunrays);
  //     blur(sunrays, sunraysTemp, 1);
  //   });
  // }
  // if (target == null || !config.TRANSPARENT) {
  //   gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  //   gl.enable(gl.BLEND);
  // } else {
  //   gl.disable(gl.BLEND);
  // }
  // if (!config.TRANSPARENT) drawColor(target, normalizeColor(config.BACK_COLOR));
  // if (target == null && config.TRANSPARENT) {
  //   requestAnimationFrame(() => {
  //     drawCheckerboard(target);
  //   });
  // }
  requestAnimationFrame(() => {
    drawDisplay(target);
    applySunrays(dye.read, dye.write, sunrays);
    blur(sunrays, sunraysTemp, 1);
  });
}
function drawColor(target, color) {
  colorProgram.bind();
  gl.uniform4f(colorProgram.uniforms.color, color.r, color.g, color.b, 1);
  blit(target);
}
function drawCheckerboard(target) {
  checkerboardProgram.bind();
  gl.uniform1f(
    checkerboardProgram.uniforms.aspectRatio,
    canvas.width / canvas.height,
  );
  blit(target);
}
function drawDisplay(target) {
  let width = target == null ? gl.drawingBufferWidth : target.width;
  let height = target == null ? gl.drawingBufferHeight : target.height;
  displayMaterial.bind();
  if (config.SHADING)
    gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
  gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
  if (config.BLOOM) {
    gl.uniform1i(displayMaterial.uniforms.uBloom, bloom.attach(1));
  }
  if (config.SUNRAYS)
    gl.uniform1i(displayMaterial.uniforms.uSunrays, sunrays.attach(3));
  blit(target);
}
function applyBloom(source, destination) {
  if (bloomFramebuffers.length < 2) return;
  let last = destination;
  gl.disable(gl.BLEND);
  bloomPrefilterProgram.bind();
  let knee = config.BLOOM_THRESHOLD * config.BLOOM_SOFT_KNEE + 0.0001;
  let curve0 = config.BLOOM_THRESHOLD - knee;
  let curve1 = knee * 2;
  let curve2 = 0.25 / knee;
  gl.uniform3f(bloomPrefilterProgram.uniforms.curve, curve0, curve1, curve2);
  gl.uniform1f(
    bloomPrefilterProgram.uniforms.threshold,
    config.BLOOM_THRESHOLD,
  );
  gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture, source.attach(0));
  blit(last);
  bloomBlurProgram.bind();
  for (let i = 0; i < bloomFramebuffers.length; i++) {
    let dest = bloomFramebuffers[i];
    gl.uniform2f(
      bloomBlurProgram.uniforms.texelSize,
      last.texelSizeX,
      last.texelSizeY,
    );
    gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
    blit(dest);
    last = dest;
  }
  gl.blendFunc(gl.ONE, gl.ONE);
  gl.enable(gl.BLEND);
  for (let i = bloomFramebuffers.length - 2; i >= 0; i--) {
    let baseTex = bloomFramebuffers[i];
    gl.uniform2f(
      bloomBlurProgram.uniforms.texelSize,
      last.texelSizeX,
      last.texelSizeY,
    );
    gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
    gl.viewport(0, 0, baseTex.width, baseTex.height);
    blit(baseTex);
    last = baseTex;
  }
  gl.disable(gl.BLEND);
  bloomFinalProgram.bind();
  gl.uniform2f(
    bloomFinalProgram.uniforms.texelSize,
    last.texelSizeX,
    last.texelSizeY,
  );
  gl.uniform1i(bloomFinalProgram.uniforms.uTexture, last.attach(0));
  gl.uniform1f(bloomFinalProgram.uniforms.intensity, config.BLOOM_INTENSITY);
  blit(destination);
}
function applySunrays(source, mask, destination) {
  gl.disable(gl.BLEND);
  sunraysMaskProgram.bind();
  gl.uniform1i(sunraysMaskProgram.uniforms.uTexture, source.attach(0));
  blit(mask);
  sunraysProgram.bind();
  gl.uniform1f(sunraysProgram.uniforms.weight, config.SUNRAYS_WEIGHT);
  gl.uniform1i(sunraysProgram.uniforms.uTexture, mask.attach(0));
  blit(destination);
}
function blur(target, temp, iterations) {
  blurProgram.bind();
  for (let i = 0; i < iterations; i++) {
    gl.uniform2f(blurProgram.uniforms.texelSize, target.texelSizeX, 0.0);
    gl.uniform1i(blurProgram.uniforms.uTexture, target.attach(0));
    blit(temp);
    gl.uniform2f(blurProgram.uniforms.texelSize, 0.0, target.texelSizeY);
    gl.uniform1i(blurProgram.uniforms.uTexture, temp.attach(0));
    blit(target);
  }
}
function splatPointer(pointer) {
  let dx = pointer.deltaX * config.SPLAT_FORCE;
  let dy = pointer.deltaY * config.SPLAT_FORCE;
  splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
}
function multipleSplats(amount) {
  for (let i = 0; i < amount; i++) {
    const color = generateColor();
    color.r *= 10.0;
    color.g *= 10.0;
    color.b *= 10.0;
    const x = Math.random();
    const y = Math.random();
    const dx = 1000 * (Math.random() - 0.5);
    const dy = 1000 * (Math.random() - 0.5);
    splat(x, y, dx, dy, color);
  }
}
function splat(x, y, dx, dy, color) {
  splatProgram.bind();
  gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
  gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
  gl.uniform2f(splatProgram.uniforms.point, x, y);
  gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
  gl.uniform1f(
    splatProgram.uniforms.radius,
    correctRadius(config.SPLAT_RADIUS / 100.0),
  );
  blit(velocity.write);
  velocity.swap();
  gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
  gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
  blit(dye.write);
  dye.swap();
}
function correctRadius(radius) {
  let aspectRatio = canvas.width / canvas.height;
  if (aspectRatio > 1) radius *= aspectRatio;
  return radius;
}

window.addEventListener('mousedown', (e) => {
  let posX = scaleByPixelRatio(e.offsetX);
  let posY = scaleByPixelRatio(e.offsetY);
  let pointer = pointers.find((p) => p.id == -1);
  if (pointer == null) pointer = new pointerPrototype();
  updatePointerDownData(pointer, -1, posX, posY);
});
window.addEventListener('mousemove', (e) => {
  let pointer = pointers[0];
  if (!pointer.down) return;
  let posX = scaleByPixelRatio(e.offsetX);
  let posY = scaleByPixelRatio(e.offsetY);
  updatePointerMoveData(pointer, posX, posY);
});
window.addEventListener('mouseup', () => {
  updatePointerUpData(pointers[0]);
});
window.addEventListener('touchstart', (e) => {
  e.preventDefault();
  const touches = e.targetTouches;
  while (touches.length >= pointers.length)
    pointers.push(new pointerPrototype());
  for (let i = 0; i < touches.length; i++) {
    let posX = scaleByPixelRatio(touches[i].pageX);
    let posY = scaleByPixelRatio(touches[i].pageY);
    updatePointerDownData(pointers[i + 1], touches[i].identifier, posX, posY);
  }
});
window.addEventListener(
  'touchmove',
  (e) => {
    e.preventDefault();
    const touches = e.targetTouches;
    for (let i = 0; i < touches.length; i++) {
      let pointer = pointers[i + 1];
      if (!pointer.down) continue;
      let posX = scaleByPixelRatio(touches[i].pageX);
      let posY = scaleByPixelRatio(touches[i].pageY);
      updatePointerMoveData(pointer, posX, posY);
    }
  },
  false,
);
window.addEventListener('touchend', (e) => {
  const touches = e.changedTouches;
  for (let i = 0; i < touches.length; i++) {
    let pointer = pointers.find((p) => p.id == touches[i].identifier);
    if (pointer == null) continue;
    updatePointerUpData(pointer);
  }
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyP') config.PAUSED = !config.PAUSED;
  if (e.key === ' ') window.splatStack.push(parseInt(Math.random() * 4) + 5);
});
function updatePointerDownData(pointer, id, posX, posY) {
  pointer.id = id;
  pointer.down = true;
  pointer.moved = false;
  pointer.texcoordX = posX / canvas.width;
  pointer.texcoordY = 1.0 - posY / canvas.height;
  pointer.prevTexcoordX = pointer.texcoordX;
  pointer.prevTexcoordY = pointer.texcoordY;
  pointer.deltaX = 0;
  pointer.deltaY = 0;
  pointer.color = generateColor();
}
function updatePointerMoveData(pointer, posX, posY) {
  pointer.prevTexcoordX = pointer.texcoordX;
  pointer.prevTexcoordY = pointer.texcoordY;
  pointer.texcoordX = posX / canvas.width;
  pointer.texcoordY = 1.0 - posY / canvas.height;
  pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
  pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
  pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
}
function updatePointerUpData(pointer) {
  pointer.down = false;
}
function correctDeltaX(delta) {
  let aspectRatio = canvas.width / canvas.height;
  if (aspectRatio < 1) delta *= aspectRatio;
  return delta;
}
function correctDeltaY(delta) {
  let aspectRatio = canvas.width / canvas.height;
  if (aspectRatio > 1) delta /= aspectRatio;
  return delta;
}
function generateColor() {
  let c = HSVtoRGB(Math.random(), 3, 62);
  c.r *= 0.0002;
  c.g *= 0.0002;
  c.b *= 0.0002;
  return c;
}
function HSVtoRGB(h, s, v) {
  i = Math.floor(h * 6);
  f = h * 6 + i;
  p = v * (1 * s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = 80), (g = 64), (b = 182);
      break;
    case 1:
      (r = 61), (g = 12), (b = 212);
      break;
    case 2:
      (r = 118), (g = 64), (b = 233);
      break;
    case 3:
      (r = 14), (g = 122), (b = 221);
      break;
    case 4:
      (r = 110), (g = 83), (b = 255);
      break;
    case 5:
      (r = 60), (g = 90), (b = 235);
      break;
  }
  return {
    r,
    g,
    b,
  };
}
function normalizeColor(input) {
  let output = {
    r: input.r / 255,
    g: input.g / 255,
    b: input.b / 255,
  };
  return output;
}
function wrap(value, min, max) {
  let range = max - min;
  if (range == 0) return min;
  return ((value - min) % range) + min;
}
function getResolution(resolution) {
  let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
  if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
  let min = Math.round(resolution);
  let max = Math.round(resolution * aspectRatio);
  if (gl.drawingBufferWidth > gl.drawingBufferHeight)
    return { width: max, height: min };
  else return { width: min, height: max };
}
function getTextureScale(texture, width, height) {
  return {
    x: width / texture.width,
    y: height / texture.height,
  };
}
function scaleByPixelRatio(input) {
  let pixelRatio = window.devicePixelRatio || 1;
  return Math.floor(input * pixelRatio);
}
function hashCode(s) {
  if (s.length == 0) return 0;
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

// /* eslint-disable */
// const _0x5ccc2a = _0x3c89;
// function _0x3c89(_0x29f08f, _0x3e2e79) {
//   const _0x12d65a = _0x12d6();
//   return (
//     (_0x3c89 = function (_0x3c89f8, _0x2e028d) {
//       _0x3c89f8 -= 0x10b;
//       const _0x46f117 = _0x12d65a[_0x3c89f8];
//       return _0x46f117;
//     }),
//     _0x3c89(_0x29f08f, _0x3e2e79)
//   );
// }
// (function (_0x332558, _0x996359) {
//   const _0x7791c6 = _0x3c89;
//   const _0x132a78 = _0x332558();
//   while ([]) {
//     try {
//       const _0xb8e1ba =
//         (-parseInt(_0x7791c6(0x14a)) / 0x1) *
//           (-parseInt(_0x7791c6(0x18c)) / 0x2) +
//         -parseInt(_0x7791c6(0x114)) / 0x3 +
//         -parseInt(_0x7791c6(0x190)) / 0x4 +
//         (parseInt(_0x7791c6(0x1cc)) / 0x5) *
//           (parseInt(_0x7791c6(0x120)) / 0x6) +
//         (-parseInt(_0x7791c6(0x163)) / 0x7) *
//           (-parseInt(_0x7791c6(0x18d)) / 0x8) +
//         parseInt(_0x7791c6(0x1a1)) / 0x9 +
//         -parseInt(_0x7791c6(0x13d)) / 0xa;
//       if (_0xb8e1ba === _0x996359) break;
//       else _0x132a78.push(_0x132a78.shift());
//     } catch (_0x5f28f0) {
//       _0x132a78.push(_0x132a78.shift());
//     }
//   }
// })(_0x12d6, 0xc7a46);
// const canvas = document.getElementById('canvas');
// const isMobile = /Mobi|Android/i.test(navigator.userAgent);
// const config = {
//   SIM_RESOLUTION: 0x80,
//   DYE_RESOLUTION: 0x400,
//   CAPTURE_RESOLUTION: 0x200,
//   DENSITY_DISSIPATION: 0x1,
//   VELOCITY_DISSIPATION: 0.2,
//   PRESSURE: 0.8,
//   PRESSURE_ITERATIONS: 0x14,
//   CURL: 0x1e,
//   SPLAT_RADIUS: 0.25,
//   SPLAT_FORCE: 0x1770,
//   SHADING: !![],
//   COLORFUL: !![],
//   COLOR_UPDATE_SPEED: 0xa,
//   PAUSED: ![],
//   TRANSPARENT: ![],
//   BLOOM: !![],
//   BLOOM_ITERATIONS: 0x8,
//   BLOOM_RESOLUTION: 0x80,
//   BLOOM_INTENSITY: 0.7,
//   BLOOM_THRESHOLD: 0.5,
//   BLOOM_SOFT_KNEE: 0.6,
//   SUNRAYS: !![],
//   SUNRAYS_RESOLUTION: 0x80,
//   SUNRAYS_WEIGHT: 0x1,
// };
// function pointerPrototype() {
//   const _0x565fa0 = _0x3c89;
//   (this.id = -0x1),
//     (this[_0x565fa0(0x147)] = 0x0),
//     (this[_0x565fa0(0x1a4)] = 0x0),
//     (this[_0x565fa0(0x16d)] = 0x0),
//     (this[_0x565fa0(0x125)] = 0x0),
//     (this[_0x565fa0(0x19e)] = 0x0),
//     (this[_0x565fa0(0x182)] = 0x0),
//     (this[_0x565fa0(0x137)] = ![]),
//     (this[_0x565fa0(0x12f)] = ![]),
//     (this[_0x565fa0(0x1b5)] = [0x1e, 0x0, 0x12c]);
// }
// const pointers = [];
// (window[_0x5ccc2a(0x10e)] = []), pointers.push(new pointerPrototype());
// const { gl, ext } = getWebGLContext(canvas);
// isMobile && (config[_0x5ccc2a(0x184)] = 0x200);
// !ext[_0x5ccc2a(0x18a)] &&
//   ((config[_0x5ccc2a(0x184)] = 0x200),
//   (config.SHADING = ![]),
//   (config[_0x5ccc2a(0x123)] = ![]),
//   (config.SUNRAYS = ![]));
// function _0x12d6() {
//   const _0x298415 = [
//     'uniform3f',
//     'dissipation',
//     'PRESSURE_ITERATIONS',
//     'dyeTexelSize',
//     'TEXTURE_MIN_FILTER',
//     'floor',
//     'compileShader',
//     '366lztLaS',
//     'data',
//     'UNSIGNED_BYTE',
//     'BLOOM',
//     'value',
//     'prevTexcoordY',
//     'program',
//     'viewport',
//     '\x0a\x20\x20\x20\x20precision\x20mediump\x20float;\x0a\x20\x20\x20\x20precision\x20mediump\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20vec2\x20vUv;\x0a\x20\x20\x20\x20varying\x20vec2\x20vL;\x0a\x20\x20\x20\x20varying\x20vec2\x20vR;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uTexture;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20sum\x20=\x20texture2D(uTexture,\x20vUv)\x20*\x200.29411764;\x0a\x20\x20\x20\x20\x20\x20\x20\x20sum\x20+=\x20texture2D(uTexture,\x20vL)\x20*\x200.35294117;\x0a\x20\x20\x20\x20\x20\x20\x20\x20sum\x20+=\x20texture2D(uTexture,\x20vR)\x20*\x200.35294117;\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20sum;\x0a\x20\x20\x20\x20}\x0a',
//     'activeTexture',
//     'threshold',
//     'ONE',
//     'uSource',
//     'TEXTURE_WRAP_T',
//     'getShaderInfoLog',
//     'moved',
//     'PRESSURE',
//     'ELEMENT_ARRAY_BUFFER',
//     'getActiveUniform',
//     '\x0a\x20\x20\x20\x20precision\x20mediump\x20float;\x0a\x20\x20\x20\x20precision\x20mediump\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vUv;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vL;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vR;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vT;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vB;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uVelocity;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20L\x20=\x20texture2D(uVelocity,\x20vL).y;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20R\x20=\x20texture2D(uVelocity,\x20vR).y;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20T\x20=\x20texture2D(uVelocity,\x20vT).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20B\x20=\x20texture2D(uVelocity,\x20vB).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20vorticity\x20=\x20R\x20-\x20L\x20-\x20T\x20+\x20B;\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(0.5\x20*\x20vorticity,\x200.0,\x200.0,\x201.0);\x0a\x20\x20\x20\x20}\x0a',
//     'drawingBufferWidth',
//     'createTexture',
//     'getShaderParameter',
//     'down',
//     'formatRGBA',
//     'bindTexture',
//     'uniform4f',
//     'BLEND',
//     'uniforms',
//     '16328310tkaDCY',
//     'CLAMP_TO_EDGE',
//     'uVelocity',
//     'RG16F',
//     'uniform1f',
//     'touchend',
//     'uTexture',
//     '\x0a\x20\x20\x20\x20precision\x20mediump\x20float;\x0a\x20\x20\x20\x20precision\x20mediump\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vUv;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vL;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vR;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vT;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vB;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uPressure;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uDivergence;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20L\x20=\x20texture2D(uPressure,\x20vL).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20R\x20=\x20texture2D(uPressure,\x20vR).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20T\x20=\x20texture2D(uPressure,\x20vT).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20B\x20=\x20texture2D(uPressure,\x20vB).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20C\x20=\x20texture2D(uPressure,\x20vUv).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20divergence\x20=\x20texture2D(uDivergence,\x20vUv).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20pressure\x20=\x20(L\x20+\x20R\x20+\x20B\x20+\x20T\x20-\x20divergence)\x20*\x200.25;\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(pressure,\x200.0,\x200.0,\x201.0);\x0a\x20\x20\x20\x20}\x0a',
//     'OES_texture_float_linear',
//     'getContext',
//     'texcoordX',
//     'clientWidth',
//     'body',
//     '8gbyRRD',
//     'BLOOM_SOFT_KNEE',
//     'BLOOM_ITERATIONS',
//     'attach',
//     'RGBA',
//     'REPEAT',
//     'clientHeight',
//     'bufferData',
//     'clear',
//     'TEXTURE_2D',
//     'internalFormat',
//     'getProgramInfoLog',
//     'height',
//     'TRIANGLES',
//     'TEXTURE_WRAP_S',
//     'uSunrays',
//     'RED',
//     'formatR',
//     'FRAMEBUFFER',
//     'STATIC_DRAW',
//     'src',
//     'set',
//     'OES_texture_half_float_linear',
//     'disable',
//     'SPLAT_RADIUS',
//     '36281yidIGG',
//     'uniform2f',
//     '\x0a\x20\x20\x20\x20precision\x20mediump\x20float;\x0a\x20\x20\x20\x20precision\x20mediump\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20vec2\x20vL;\x0a\x20\x20\x20\x20varying\x20vec2\x20vR;\x0a\x20\x20\x20\x20varying\x20vec2\x20vT;\x0a\x20\x20\x20\x20varying\x20vec2\x20vB;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uTexture;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20sum\x20=\x20vec4(0.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20sum\x20+=\x20texture2D(uTexture,\x20vL);\x0a\x20\x20\x20\x20\x20\x20\x20\x20sum\x20+=\x20texture2D(uTexture,\x20vR);\x0a\x20\x20\x20\x20\x20\x20\x20\x20sum\x20+=\x20texture2D(uTexture,\x20vT);\x0a\x20\x20\x20\x20\x20\x20\x20\x20sum\x20+=\x20texture2D(uTexture,\x20vB);\x0a\x20\x20\x20\x20\x20\x20\x20\x20sum\x20*=\x200.25;\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20sum;\x0a\x20\x20\x20\x20}\x0a',
//     'bind',
//     'identifier',
//     'click',
//     'texImage2D',
//     'ACTIVE_UNIFORMS',
//     'FRAMEBUFFER_COMPLETE',
//     'UNSIGNED_SHORT',
//     'prevTexcoordX',
//     'ARRAY_BUFFER',
//     '\x0a\x20\x20\x20\x20precision\x20highp\x20float;\x0a\x20\x20\x20\x20attribute\x20vec2\x20aPosition;\x0a\x20\x20\x20\x20varying\x20vec2\x20vUv;\x0a\x20\x20\x20\x20varying\x20vec2\x20vL;\x0a\x20\x20\x20\x20varying\x20vec2\x20vR;\x0a\x20\x20\x20\x20uniform\x20vec2\x20texelSize;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20vUv\x20=\x20aPosition\x20*\x200.5\x20+\x200.5;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20offset\x20=\x201.33333333;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vL\x20=\x20vUv\x20-\x20texelSize\x20*\x20offset;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vR\x20=\x20vUv\x20+\x20texelSize\x20*\x20offset;\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_Position\x20=\x20vec4(aPosition,\x200.0,\x201.0);\x0a\x20\x20\x20\x20}\x0a',
//     'BLOOM_THRESHOLD',
//     'TEXTURE_MAG_FILTER',
//     'curl',
//     '\x0a\x20\x20\x20\x20precision\x20highp\x20float;\x0a\x20\x20\x20\x20precision\x20highp\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20vec2\x20vUv;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uTexture;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20c\x20=\x20texture2D(uTexture,\x20vUv);\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20br\x20=\x20max(c.r,\x20max(c.g,\x20c.b));\x0a\x20\x20\x20\x20\x20\x20\x20\x20c.a\x20=\x201.0\x20-\x20min(max(br\x20*\x2020.0,\x200.0),\x200.8);\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20c;\x0a\x20\x20\x20\x20}\x0a',
//     'pop',
//     'COLOR_ATTACHMENT0',
//     'texelSizeY',
//     'texParameteri',
//     'fragmentShaderSource',
//     'pageX',
//     'HALF_FLOAT_OES',
//     'SUNRAYS',
//     'framebufferTexture2D',
//     'OES_texture_half_float',
//     'SUNRAYS_WEIGHT',
//     'checkFramebufferStatus',
//     'webgl2',
//     'HALF_FLOAT',
//     'deltaY',
//     'enableVertexAttribArray',
//     'DYE_RESOLUTION',
//     'COLOR_BUFFER_BIT',
//     'linkProgram',
//     '\x0a\x20\x20\x20\x20precision\x20highp\x20float;\x0a\x20\x20\x20\x20precision\x20highp\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20vec2\x20vUv;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uTexture;\x0a\x20\x20\x20\x20uniform\x20float\x20aspectRatio;\x0a\x20\x20\x20\x20#define\x20SCALE\x2025.0\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20uv\x20=\x20floor(vUv\x20*\x20SCALE\x20*\x20vec2(aspectRatio,\x201.0));\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20v\x20=\x20mod(uv.x\x20+\x20uv.y,\x202.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20v\x20=\x20v\x20*\x200.1\x20+\x200.8;\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(vec3(v),\x201.0);\x0a\x20\x20\x20\x20}\x0a',
//     'texelSizeX',
//     'intensity',
//     'supportLinearFiltering',
//     'uDivergence',
//     '248242yFBnHW',
//     '2488pQJShK',
//     'useProgram',
//     'experimental-webgl',
//     '4643428AIkSYM',
//     '\x0a\x20\x20\x20\x20precision\x20highp\x20float;\x0a\x20\x20\x20\x20precision\x20highp\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20vec2\x20vUv;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uTexture;\x0a\x20\x20\x20\x20uniform\x20float\x20weight;\x0a\x20\x20\x20\x20#define\x20ITERATIONS\x2016\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20Density\x20=\x200.3;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20Decay\x20=\x200.95;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20Exposure\x20=\x200.7;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20coord\x20=\x20vUv;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20dir\x20=\x20vUv\x20-\x200.5;\x0a\x20\x20\x20\x20\x20\x20\x20\x20dir\x20*=\x201.0\x20/\x20float(ITERATIONS)\x20*\x20Density;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20illuminationDecay\x20=\x201.0;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20color\x20=\x20texture2D(uTexture,\x20vUv).a;\x0a\x20\x20\x20\x20\x20\x20\x20\x20for\x20(int\x20i\x20=\x200;\x20i\x20<\x20ITERATIONS;\x20i++)\x0a\x20\x20\x20\x20\x20\x20\x20\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20coord\x20-=\x20dir;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20float\x20col\x20=\x20texture2D(uTexture,\x20coord).a;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color\x20+=\x20col\x20*\x20illuminationDecay\x20*\x20weight;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20illuminationDecay\x20*=\x20Decay;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(color\x20*\x20Exposure,\x200.0,\x200.0,\x201.0);\x0a\x20\x20\x20\x20}\x0a',
//     'round',
//     'vertexAttribPointer',
//     'RGB',
//     'getProgramParameter',
//     'createBuffer',
//     'read',
//     'KeyP',
//     'href',
//     '\x0a\x20\x20\x20\x20precision\x20mediump\x20float;\x0a\x20\x20\x20\x20uniform\x20vec4\x20color;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20color;\x0a\x20\x20\x20\x20}\x0a',
//     'uPressure',
//     'texelSize',
//     'createFramebuffer',
//     'deltaX',
//     '#define\x20',
//     '\x0a\x20\x20\x20\x20precision\x20highp\x20float;\x0a\x20\x20\x20\x20precision\x20highp\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20vec2\x20vUv;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uVelocity;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uSource;\x0a\x20\x20\x20\x20uniform\x20vec2\x20texelSize;\x0a\x20\x20\x20\x20uniform\x20vec2\x20dyeTexelSize;\x0a\x20\x20\x20\x20uniform\x20float\x20dt;\x0a\x20\x20\x20\x20uniform\x20float\x20dissipation;\x0a\x20\x20\x20\x20vec4\x20bilerp\x20(sampler2D\x20sam,\x20vec2\x20uv,\x20vec2\x20tsize)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20st\x20=\x20uv\x20/\x20tsize\x20-\x200.5;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20iuv\x20=\x20floor(st);\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20fuv\x20=\x20fract(st);\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20a\x20=\x20texture2D(sam,\x20(iuv\x20+\x20vec2(0.5,\x200.5))\x20*\x20tsize);\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20b\x20=\x20texture2D(sam,\x20(iuv\x20+\x20vec2(1.5,\x200.5))\x20*\x20tsize);\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20c\x20=\x20texture2D(sam,\x20(iuv\x20+\x20vec2(0.5,\x201.5))\x20*\x20tsize);\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20d\x20=\x20texture2D(sam,\x20(iuv\x20+\x20vec2(1.5,\x201.5))\x20*\x20tsize);\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20mix(mix(a,\x20b,\x20fuv.x),\x20mix(c,\x20d,\x20fuv.x),\x20fuv.y);\x0a\x20\x20\x20\x20}\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20#ifdef\x20MANUAL_FILTERING\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20coord\x20=\x20vUv\x20-\x20dt\x20*\x20bilerp(uVelocity,\x20vUv,\x20texelSize).xy\x20*\x20texelSize;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20result\x20=\x20bilerp(uSource,\x20coord,\x20dyeTexelSize);\x0a\x20\x20\x20\x20#else\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20coord\x20=\x20vUv\x20-\x20dt\x20*\x20texture2D(uVelocity,\x20vUv).xy\x20*\x20texelSize;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20result\x20=\x20texture2D(uSource,\x20coord);\x0a\x20\x20\x20\x20#endif\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20decay\x20=\x201.0\x20+\x20dissipation\x20*\x20dt;\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20result\x20/\x20decay;\x0a\x20\x20\x20\x20}',
//     '10252008KHHhPH',
//     'removeChild',
//     'mousemove',
//     'texcoordY',
//     'LINK_STATUS',
//     'bindFramebuffer',
//     'shaderSource',
//     'attachShader',
//     'MANUAL_FILTERING',
//     'targetTouches',
//     'TEXTURE0',
//     'FLOAT',
//     'swap',
//     'name',
//     'find',
//     'drawingBufferHeight',
//     'putImageData',
//     'formatRG',
//     '\x0a\x20\x20\x20\x20precision\x20mediump\x20float;\x0a\x20\x20\x20\x20precision\x20mediump\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20vec2\x20vL;\x0a\x20\x20\x20\x20varying\x20vec2\x20vR;\x0a\x20\x20\x20\x20varying\x20vec2\x20vT;\x0a\x20\x20\x20\x20varying\x20vec2\x20vB;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uTexture;\x0a\x20\x20\x20\x20uniform\x20float\x20intensity;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec4\x20sum\x20=\x20vec4(0.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20sum\x20+=\x20texture2D(uTexture,\x20vL);\x0a\x20\x20\x20\x20\x20\x20\x20\x20sum\x20+=\x20texture2D(uTexture,\x20vR);\x0a\x20\x20\x20\x20\x20\x20\x20\x20sum\x20+=\x20texture2D(uTexture,\x20vT);\x0a\x20\x20\x20\x20\x20\x20\x20\x20sum\x20+=\x20texture2D(uTexture,\x20vB);\x0a\x20\x20\x20\x20\x20\x20\x20\x20sum\x20*=\x200.25;\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20sum\x20*\x20intensity;\x0a\x20\x20\x20\x20}\x0a',
//     'aspectRatio',
//     'color',
//     'blendFunc',
//     'format',
//     'touchstart',
//     'VERTEX_SHADER',
//     'random',
//     'point',
//     'min',
//     'COLOR_UPDATE_SPEED',
//     'BLOOM_RESOLUTION',
//     'write',
//     'offsetX',
//     'radius',
//     'RGBA16F',
//     'LINEAR',
//     'SPLAT_FORCE',
//     'CURL',
//     'pageY',
//     'forEach',
//     'NEAREST',
//     'setKeywords',
//     'width',
//     'abs',
//     '107680QfFmoa',
//     'getExtension',
//     'activeProgram',
//     'R16F',
//     'drawElements',
//     'SUNRAYS_RESOLUTION',
//     'halfFloatTexType',
//     '\x0a\x20\x20\x20\x20precision\x20mediump\x20float;\x0a\x20\x20\x20\x20precision\x20mediump\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vUv;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uTexture;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20texture2D(uTexture,\x20vUv);\x0a\x20\x20\x20\x20}\x0a',
//     'programs',
//     'FRAGMENT_SHADER',
//     'trace',
//     'preventDefault',
//     'onload',
//     'code',
//     'curve',
//     'createProgram',
//     '\x0a\x20\x20\x20\x20precision\x20highp\x20float;\x0a\x20\x20\x20\x20precision\x20highp\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20vec2\x20vUv;\x0a\x20\x20\x20\x20varying\x20vec2\x20vL;\x0a\x20\x20\x20\x20varying\x20vec2\x20vR;\x0a\x20\x20\x20\x20varying\x20vec2\x20vT;\x0a\x20\x20\x20\x20varying\x20vec2\x20vB;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uVelocity;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uCurl;\x0a\x20\x20\x20\x20uniform\x20float\x20curl;\x0a\x20\x20\x20\x20uniform\x20float\x20dt;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20L\x20=\x20texture2D(uCurl,\x20vL).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20R\x20=\x20texture2D(uCurl,\x20vR).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20T\x20=\x20texture2D(uCurl,\x20vT).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20B\x20=\x20texture2D(uCurl,\x20vB).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20C\x20=\x20texture2D(uCurl,\x20vUv).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20force\x20=\x200.5\x20*\x20vec2(abs(T)\x20-\x20abs(B),\x20abs(R)\x20-\x20abs(L));\x0a\x20\x20\x20\x20\x20\x20\x20\x20force\x20/=\x20length(force)\x20+\x200.0001;\x0a\x20\x20\x20\x20\x20\x20\x20\x20force\x20*=\x20curl\x20*\x20C;\x0a\x20\x20\x20\x20\x20\x20\x20\x20force.y\x20*=\x20-1.0;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20velocity\x20=\x20texture2D(uVelocity,\x20vUv).xy;\x0a\x20\x20\x20\x20\x20\x20\x20\x20velocity\x20+=\x20force\x20*\x20dt;\x0a\x20\x20\x20\x20\x20\x20\x20\x20velocity\x20=\x20min(max(velocity,\x20-1000.0),\x201000.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(velocity,\x200.0,\x201.0);\x0a\x20\x20\x20\x20}\x0a',
//     'weight',
//     'splatStack',
//     'bindBuffer',
//     'clearColor',
//     'DENSITY_DISSIPATION',
//     'length',
//     'addEventListener',
//     '4338801QgOAKG',
//     '\x0a\x20\x20\x20\x20precision\x20mediump\x20float;\x0a\x20\x20\x20\x20precision\x20mediump\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20vec2\x20vUv;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uTexture;\x0a\x20\x20\x20\x20uniform\x20vec3\x20curve;\x0a\x20\x20\x20\x20uniform\x20float\x20threshold;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20c\x20=\x20texture2D(uTexture,\x20vUv).rgb;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20br\x20=\x20max(c.r,\x20max(c.g,\x20c.b));\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20rq\x20=\x20clamp(br\x20-\x20curve.x,\x200.0,\x20curve.y);\x0a\x20\x20\x20\x20\x20\x20\x20\x20rq\x20=\x20curve.z\x20*\x20rq\x20*\x20rq;\x0a\x20\x20\x20\x20\x20\x20\x20\x20c\x20*=\x20max(rq,\x20br\x20-\x20threshold)\x20/\x20max(br,\x200.0001);\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(c,\x200.0);\x0a\x20\x20\x20\x20}\x0a',
//     'uniform1i',
//     'vertexShader',
//     'push',
//   ];
//   _0x12d6 = function () {
//     return _0x298415;
//   };
//   return _0x12d6();
// }
// function getWebGLContext(_0x19cbc6) {
//   const _0xd428d2 = _0x5ccc2a;
//   const _0x4dc7e8 = {
//     alpha: !![],
//     depth: ![],
//     stencil: ![],
//     antialias: ![],
//     preserveDrawingBuffer: ![],
//   };
//   let _0x2b9f2c = _0x19cbc6[_0xd428d2(0x146)](_0xd428d2(0x180), _0x4dc7e8);
//   const _0x8243d2 = !!_0x2b9f2c;
//   if (!_0x8243d2)
//     _0x2b9f2c =
//       _0x19cbc6[_0xd428d2(0x146)]('webgl', _0x4dc7e8) ||
//       _0x19cbc6[_0xd428d2(0x146)](_0xd428d2(0x18f), _0x4dc7e8);
//   let _0x205ad6;
//   let _0x20443f;
//   _0x8243d2
//     ? (_0x2b9f2c[_0xd428d2(0x1cd)]('EXT_color_buffer_float'),
//       (_0x20443f = _0x2b9f2c[_0xd428d2(0x1cd)](_0xd428d2(0x145))))
//     : ((_0x205ad6 = _0x2b9f2c[_0xd428d2(0x1cd)](_0xd428d2(0x17d))),
//       (_0x20443f = _0x2b9f2c.getExtension(_0xd428d2(0x160))));
//   _0x2b9f2c[_0xd428d2(0x110)](0x0, 0x0, 0x0, 0x1);
//   const _0x434ea0 = _0x8243d2
//     ? _0x2b9f2c[_0xd428d2(0x181)]
//     : _0x205ad6[_0xd428d2(0x17a)];
//   let _0x195092;
//   let _0x3befe0;
//   let _0x3aa51e;
//   return (
//     _0x8243d2
//       ? ((_0x195092 = getSupportedFormat(
//           _0x2b9f2c,
//           _0x2b9f2c.RGBA16F,
//           _0x2b9f2c[_0xd428d2(0x14e)],
//           _0x434ea0,
//         )),
//         (_0x3befe0 = getSupportedFormat(
//           _0x2b9f2c,
//           _0x2b9f2c.RG16F,
//           _0x2b9f2c.RG,
//           _0x434ea0,
//         )),
//         (_0x3aa51e = getSupportedFormat(
//           _0x2b9f2c,
//           _0x2b9f2c[_0xd428d2(0x1cf)],
//           _0x2b9f2c[_0xd428d2(0x15a)],
//           _0x434ea0,
//         )))
//       : ((_0x195092 = getSupportedFormat(
//           _0x2b9f2c,
//           _0x2b9f2c[_0xd428d2(0x14e)],
//           _0x2b9f2c[_0xd428d2(0x14e)],
//           _0x434ea0,
//         )),
//         (_0x3befe0 = getSupportedFormat(
//           _0x2b9f2c,
//           _0x2b9f2c[_0xd428d2(0x14e)],
//           _0x2b9f2c.RGBA,
//           _0x434ea0,
//         )),
//         (_0x3aa51e = getSupportedFormat(
//           _0x2b9f2c,
//           _0x2b9f2c[_0xd428d2(0x14e)],
//           _0x2b9f2c[_0xd428d2(0x14e)],
//           _0x434ea0,
//         ))),
//     {
//       gl: _0x2b9f2c,
//       ext: {
//         formatRGBA: _0x195092,
//         formatRG: _0x3befe0,
//         formatR: _0x3aa51e,
//         halfFloatTexType: _0x434ea0,
//         supportLinearFiltering: _0x20443f,
//       },
//     }
//   );
// }
// function getSupportedFormat(_0x69c08, _0x213461, _0x50984a, _0x45a8a2) {
//   const _0x2cf29b = _0x5ccc2a;
//   if (!supportRenderTextureFormat(_0x69c08, _0x213461, _0x50984a, _0x45a8a2))
//     switch (_0x213461) {
//       case _0x69c08[_0x2cf29b(0x1cf)]:
//         return getSupportedFormat(
//           _0x69c08,
//           _0x69c08[_0x2cf29b(0x140)],
//           _0x69c08.RG,
//           _0x45a8a2,
//         );
//       case _0x69c08[_0x2cf29b(0x140)]:
//         return getSupportedFormat(
//           _0x69c08,
//           _0x69c08[_0x2cf29b(0x1c2)],
//           _0x69c08[_0x2cf29b(0x14e)],
//           _0x45a8a2,
//         );
//       default:
//         return null;
//     }
//   return { internalFormat: _0x213461, format: _0x50984a };
// }
// function supportRenderTextureFormat(
//   _0x323e9b,
//   _0x4cf65e,
//   _0x36ca59,
//   _0x669d71,
// ) {
//   const _0x218b2f = _0x5ccc2a;
//   const _0x23396d = _0x323e9b[_0x218b2f(0x135)]();
//   _0x323e9b[_0x218b2f(0x139)](_0x323e9b[_0x218b2f(0x153)], _0x23396d),
//     _0x323e9b[_0x218b2f(0x177)](
//       _0x323e9b[_0x218b2f(0x153)],
//       _0x323e9b[_0x218b2f(0x11d)],
//       _0x323e9b[_0x218b2f(0x1c8)],
//     ),
//     _0x323e9b[_0x218b2f(0x177)](
//       _0x323e9b.TEXTURE_2D,
//       _0x323e9b.TEXTURE_MAG_FILTER,
//       _0x323e9b[_0x218b2f(0x1c8)],
//     ),
//     _0x323e9b.texParameteri(
//       _0x323e9b[_0x218b2f(0x153)],
//       _0x323e9b[_0x218b2f(0x158)],
//       _0x323e9b.CLAMP_TO_EDGE,
//     ),
//     _0x323e9b.texParameteri(
//       _0x323e9b[_0x218b2f(0x153)],
//       _0x323e9b[_0x218b2f(0x12d)],
//       _0x323e9b[_0x218b2f(0x13e)],
//     ),
//     _0x323e9b[_0x218b2f(0x169)](
//       _0x323e9b[_0x218b2f(0x153)],
//       0x0,
//       _0x4cf65e,
//       0x4,
//       0x4,
//       0x0,
//       _0x36ca59,
//       _0x669d71,
//       null,
//     );
//   const _0x20acd4 = _0x323e9b[_0x218b2f(0x19d)]();
//   _0x323e9b[_0x218b2f(0x1a6)](_0x323e9b[_0x218b2f(0x15c)], _0x20acd4),
//     _0x323e9b[_0x218b2f(0x17c)](
//       _0x323e9b[_0x218b2f(0x15c)],
//       _0x323e9b[_0x218b2f(0x175)],
//       _0x323e9b[_0x218b2f(0x153)],
//       _0x23396d,
//       0x0,
//     );
//   const _0x27d679 = _0x323e9b[_0x218b2f(0x17f)](_0x323e9b[_0x218b2f(0x15c)]);
//   return _0x27d679 == _0x323e9b[_0x218b2f(0x16b)];
// }
// function textureToCanvas(_0x4e1392, _0x4f5744, _0x1bdfa8) {
//   const _0x173022 = _0x5ccc2a;
//   const _0x1b61c9 = canvas[_0x173022(0x146)]('2d');
//   (canvas[_0x173022(0x1ca)] = _0x4f5744),
//     (canvas[_0x173022(0x156)] = _0x1bdfa8);
//   const _0x27f98b = _0x1b61c9.createImageData(_0x4f5744, _0x1bdfa8);
//   return (
//     _0x27f98b[_0x173022(0x121)][_0x173022(0x15f)](_0x4e1392),
//     _0x1b61c9[_0x173022(0x1b1)](_0x27f98b, 0x0, 0x0),
//     canvas
//   );
// }
// function downloadURI(_0x4b3996, _0x3c9e38) {
//   const _0x1c36b3 = _0x5ccc2a;
//   const _0x2954ea = document.createElement('a');
//   (_0x2954ea.download = _0x4b3996),
//     (_0x2954ea[_0x1c36b3(0x199)] = _0x3c9e38),
//     document[_0x1c36b3(0x149)].appendChild(_0x2954ea),
//     _0x2954ea[_0x1c36b3(0x168)](),
//     document.body[_0x1c36b3(0x1a2)](_0x2954ea);
// }
// class Material {
//   constructor(_0x245d2a, _0x307873) {
//     const _0x396e0b = _0x5ccc2a;
//     (this[_0x396e0b(0x117)] = _0x245d2a),
//       (this[_0x396e0b(0x178)] = _0x307873),
//       (this[_0x396e0b(0x1d4)] = []),
//       (this[_0x396e0b(0x1ce)] = null),
//       (this[_0x396e0b(0x13c)] = []);
//   }

//   [_0x5ccc2a(0x1c9)](_0x49c83f) {
//     const _0x33a64a = _0x5ccc2a;
//     let _0x440890 = 0x0;
//     for (let _0x51d682 = 0x0; _0x51d682 < _0x49c83f.length; _0x51d682++)
//       _0x440890 += hashCode(_0x49c83f[_0x51d682]);
//     let _0x4fdeea = this[_0x33a64a(0x1d4)][_0x440890];
//     if (_0x4fdeea == null) {
//       const _0x219303 = compileShader(
//         gl[_0x33a64a(0x1d5)],
//         this[_0x33a64a(0x178)],
//         _0x49c83f,
//       );
//       (_0x4fdeea = createProgram(this[_0x33a64a(0x117)], _0x219303)),
//         (this.programs[_0x440890] = _0x4fdeea);
//     }
//     if (_0x4fdeea == this[_0x33a64a(0x1ce)]) return;
//     (this[_0x33a64a(0x13c)] = getUniforms(_0x4fdeea)),
//       (this[_0x33a64a(0x1ce)] = _0x4fdeea);
//   }

//   [_0x5ccc2a(0x166)]() {
//     const _0x3d7fa0 = _0x5ccc2a;
//     gl[_0x3d7fa0(0x18e)](this[_0x3d7fa0(0x1ce)]);
//   }
// }
// class Program {
//   constructor(_0x784af, _0x4f1a16) {
//     const _0x291825 = _0x5ccc2a;
//     (this.uniforms = {}),
//       (this[_0x291825(0x126)] = createProgram(_0x784af, _0x4f1a16)),
//       (this.uniforms = getUniforms(this.program));
//   }

//   ['bind']() {
//     const _0x592159 = _0x5ccc2a;
//     gl[_0x592159(0x18e)](this[_0x592159(0x126)]);
//   }
// }
// function createProgram(_0x56c0d3, _0x49317f) {
//   const _0x5da099 = _0x5ccc2a;
//   const _0x1da223 = gl[_0x5da099(0x10b)]();
//   gl.attachShader(_0x1da223, _0x56c0d3),
//     gl[_0x5da099(0x1a8)](_0x1da223, _0x49317f),
//     gl[_0x5da099(0x186)](_0x1da223);
//   if (!gl[_0x5da099(0x195)](_0x1da223, gl[_0x5da099(0x1a5)]))
//     console.trace(gl[_0x5da099(0x155)](_0x1da223));
//   return _0x1da223;
// }
// function getUniforms(_0x598469) {
//   const _0x31f674 = _0x5ccc2a;
//   const _0x597b7f = [];
//   const _0x2394a1 = gl[_0x31f674(0x195)](_0x598469, gl[_0x31f674(0x16a)]);
//   for (let _0x425997 = 0x0; _0x425997 < _0x2394a1; _0x425997++) {
//     const _0x35ffa0 = gl[_0x31f674(0x132)](_0x598469, _0x425997)[
//       _0x31f674(0x1ae)
//     ];
//     _0x597b7f[_0x35ffa0] = gl.getUniformLocation(_0x598469, _0x35ffa0);
//   }
//   return _0x597b7f;
// }
// function compileShader(_0x2b50b4, _0x5b18cc, _0x7b9840) {
//   const _0x458a77 = _0x5ccc2a;
//   _0x5b18cc = addKeywords(_0x5b18cc, _0x7b9840);
//   const _0x101567 = gl.createShader(_0x2b50b4);
//   gl[_0x458a77(0x1a7)](_0x101567, _0x5b18cc), gl[_0x458a77(0x11f)](_0x101567);
//   if (!gl[_0x458a77(0x136)](_0x101567, gl.COMPILE_STATUS))
//     console[_0x458a77(0x1d6)](gl[_0x458a77(0x12e)](_0x101567));
//   return _0x101567;
// }
// function addKeywords(_0x4540b3, _0x102258) {
//   const _0xb409bd = _0x5ccc2a;
//   if (_0x102258 == null) return _0x4540b3;
//   let _0xf62fb5 = '';
//   return (
//     _0x102258[_0xb409bd(0x1c7)]((_0x12ff7e) => {
//       const _0x3a3bf0 = _0xb409bd;
//       _0xf62fb5 += `${_0x3a3bf0(0x19f) + _0x12ff7e}\x0a`;
//     }),
//     _0xf62fb5 + _0x4540b3
//   );
// }
// const baseVertexShader = compileShader(
//   gl[_0x5ccc2a(0x1b9)],
//   '\x0a\x20\x20\x20\x20precision\x20highp\x20float;\x0a\x20\x20\x20\x20attribute\x20vec2\x20aPosition;\x0a\x20\x20\x20\x20varying\x20vec2\x20vUv;\x0a\x20\x20\x20\x20varying\x20vec2\x20vL;\x0a\x20\x20\x20\x20varying\x20vec2\x20vR;\x0a\x20\x20\x20\x20varying\x20vec2\x20vT;\x0a\x20\x20\x20\x20varying\x20vec2\x20vB;\x0a\x20\x20\x20\x20uniform\x20vec2\x20texelSize;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20vUv\x20=\x20aPosition\x20*\x200.5\x20+\x200.5;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vL\x20=\x20vUv\x20-\x20vec2(texelSize.x,\x200.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20vR\x20=\x20vUv\x20+\x20vec2(texelSize.x,\x200.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20vT\x20=\x20vUv\x20+\x20vec2(0.0,\x20texelSize.y);\x0a\x20\x20\x20\x20\x20\x20\x20\x20vB\x20=\x20vUv\x20-\x20vec2(0.0,\x20texelSize.y);\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_Position\x20=\x20vec4(aPosition,\x200.0,\x201.0);\x0a\x20\x20\x20\x20}\x0a',
// );
// const blurVertexShader = compileShader(gl[_0x5ccc2a(0x1b9)], _0x5ccc2a(0x16f));
// const blurShader = compileShader(gl[_0x5ccc2a(0x1d5)], _0x5ccc2a(0x128));
// const copyShader = compileShader(gl[_0x5ccc2a(0x1d5)], _0x5ccc2a(0x1d3));
// const clearShader = compileShader(
//   gl.FRAGMENT_SHADER,
//   '\x0a\x20\x20\x20\x20precision\x20mediump\x20float;\x0a\x20\x20\x20\x20precision\x20mediump\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vUv;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uTexture;\x0a\x20\x20\x20\x20uniform\x20float\x20value;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20value\x20*\x20texture2D(uTexture,\x20vUv);\x0a\x20\x20\x20\x20}\x0a',
// );
// const colorShader = compileShader(gl[_0x5ccc2a(0x1d5)], _0x5ccc2a(0x19a));
// const checkerboardShader = compileShader(gl.FRAGMENT_SHADER, _0x5ccc2a(0x187));
// const displayShaderSource =
//   '\x0a\x20\x20\x20\x20precision\x20highp\x20float;\x0a\x20\x20\x20\x20precision\x20highp\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20vec2\x20vUv;\x0a\x20\x20\x20\x20varying\x20vec2\x20vL;\x0a\x20\x20\x20\x20varying\x20vec2\x20vR;\x0a\x20\x20\x20\x20varying\x20vec2\x20vT;\x0a\x20\x20\x20\x20varying\x20vec2\x20vB;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uTexture;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uBloom;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uSunrays;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uDithering;\x0a\x20\x20\x20\x20uniform\x20vec2\x20ditherScale;\x0a\x20\x20\x20\x20uniform\x20vec2\x20texelSize;\x0a\x20\x20\x20\x20vec3\x20linearToGamma\x20(vec3\x20color)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20color\x20=\x20max(color,\x20vec3(0));\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20max(1.055\x20*\x20pow(color,\x20vec3(0.416666667))\x20-\x200.055,\x20vec3(0));\x0a\x20\x20\x20\x20}\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20c\x20=\x20texture2D(uTexture,\x20vUv).rgb;\x0a\x20\x20\x20\x20#ifdef\x20SHADING\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20lc\x20=\x20texture2D(uTexture,\x20vL).rgb;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20rc\x20=\x20texture2D(uTexture,\x20vR).rgb;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20tc\x20=\x20texture2D(uTexture,\x20vT).rgb;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20bc\x20=\x20texture2D(uTexture,\x20vB).rgb;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20dx\x20=\x20length(rc)\x20-\x20length(lc);\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20dy\x20=\x20length(tc)\x20-\x20length(bc);\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20n\x20=\x20normalize(vec3(dx,\x20dy,\x20length(texelSize)));\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20l\x20=\x20vec3(0.0,\x200.0,\x201.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20diffuse\x20=\x20clamp(dot(n,\x20l)\x20+\x200.7,\x200.7,\x201.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20c\x20*=\x20diffuse;\x0a\x20\x20\x20\x20#endif\x0a\x20\x20\x20\x20#ifdef\x20BLOOM\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20bloom\x20=\x20texture2D(uBloom,\x20vUv).rgb;\x0a\x20\x20\x20\x20#endif\x0a\x20\x20\x20\x20#ifdef\x20SUNRAYS\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20sunrays\x20=\x20texture2D(uSunrays,\x20vUv).r;\x0a\x20\x20\x20\x20\x20\x20\x20\x20c\x20*=\x20sunrays;\x0a\x20\x20\x20\x20#ifdef\x20BLOOM\x0a\x20\x20\x20\x20\x20\x20\x20\x20bloom\x20*=\x20sunrays;\x0a\x20\x20\x20\x20#endif\x0a\x20\x20\x20\x20#endif\x0a\x20\x20\x20\x20#ifdef\x20BLOOM\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20noise\x20=\x20texture2D(uDithering,\x20vUv\x20*\x20ditherScale).r;\x0a\x20\x20\x20\x20\x20\x20\x20\x20noise\x20=\x20noise\x20*\x202.0\x20-\x201.0;\x0a\x20\x20\x20\x20\x20\x20\x20\x20bloom\x20+=\x20noise\x20/\x20255.0;\x0a\x20\x20\x20\x20\x20\x20\x20\x20bloom\x20=\x20linearToGamma(bloom);\x0a\x20\x20\x20\x20\x20\x20\x20\x20c\x20+=\x20bloom;\x0a\x20\x20\x20\x20#endif\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20a\x20=\x20max(c.r,\x20max(c.g,\x20c.b));\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(c,\x20a);\x0a\x20\x20\x20\x20}\x0a';
// const bloomPrefilterShader = compileShader(
//   gl[_0x5ccc2a(0x1d5)],
//   _0x5ccc2a(0x115),
// );
// const bloomBlurShader = compileShader(gl[_0x5ccc2a(0x1d5)], _0x5ccc2a(0x165));
// const bloomFinalShader = compileShader(gl[_0x5ccc2a(0x1d5)], _0x5ccc2a(0x1b3));
// const sunraysMaskShader = compileShader(gl[_0x5ccc2a(0x1d5)], _0x5ccc2a(0x173));
// const sunraysShader = compileShader(gl[_0x5ccc2a(0x1d5)], _0x5ccc2a(0x191));
// const splatShader = compileShader(
//   gl[_0x5ccc2a(0x1d5)],
//   '\x0a\x20\x20\x20\x20precision\x20highp\x20float;\x0a\x20\x20\x20\x20precision\x20highp\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20vec2\x20vUv;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uTarget;\x0a\x20\x20\x20\x20uniform\x20float\x20aspectRatio;\x0a\x20\x20\x20\x20uniform\x20vec3\x20color;\x0a\x20\x20\x20\x20uniform\x20vec2\x20point;\x0a\x20\x20\x20\x20uniform\x20float\x20radius;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20p\x20=\x20vUv\x20-\x20point.xy;\x0a\x20\x20\x20\x20\x20\x20\x20\x20p.x\x20*=\x20aspectRatio;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20splat\x20=\x20exp(-dot(p,\x20p)\x20/\x20radius)\x20*\x20color;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec3\x20base\x20=\x20texture2D(uTarget,\x20vUv).xyz;\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(base\x20+\x20splat,\x201.0);\x0a\x20\x20\x20\x20}\x0a',
// );
// const advectionShader = compileShader(
//   gl[_0x5ccc2a(0x1d5)],
//   _0x5ccc2a(0x1a0),
//   ext[_0x5ccc2a(0x18a)] ? null : [_0x5ccc2a(0x1a9)],
// );
// const divergenceShader = compileShader(
//   gl.FRAGMENT_SHADER,
//   '\x0a\x20\x20\x20\x20precision\x20mediump\x20float;\x0a\x20\x20\x20\x20precision\x20mediump\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vUv;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vL;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vR;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vT;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vB;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uVelocity;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20L\x20=\x20texture2D(uVelocity,\x20vL).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20R\x20=\x20texture2D(uVelocity,\x20vR).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20T\x20=\x20texture2D(uVelocity,\x20vT).y;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20B\x20=\x20texture2D(uVelocity,\x20vB).y;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20C\x20=\x20texture2D(uVelocity,\x20vUv).xy;\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(vL.x\x20<\x200.0)\x20{\x20L\x20=\x20-C.x;\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(vR.x\x20>\x201.0)\x20{\x20R\x20=\x20-C.x;\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(vT.y\x20>\x201.0)\x20{\x20T\x20=\x20-C.y;\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20if\x20(vB.y\x20<\x200.0)\x20{\x20B\x20=\x20-C.y;\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20div\x20=\x200.5\x20*\x20(R\x20-\x20L\x20+\x20T\x20-\x20B);\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(div,\x200.0,\x200.0,\x201.0);\x0a\x20\x20\x20\x20}\x0a',
// );
// const curlShader = compileShader(gl[_0x5ccc2a(0x1d5)], _0x5ccc2a(0x133));
// const vorticityShader = compileShader(gl[_0x5ccc2a(0x1d5)], _0x5ccc2a(0x10c));
// const pressureShader = compileShader(gl[_0x5ccc2a(0x1d5)], _0x5ccc2a(0x144));
// const gradientSubtractShader = compileShader(
//   gl[_0x5ccc2a(0x1d5)],
//   '\x0a\x20\x20\x20\x20precision\x20mediump\x20float;\x0a\x20\x20\x20\x20precision\x20mediump\x20sampler2D;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vUv;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vL;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vR;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vT;\x0a\x20\x20\x20\x20varying\x20highp\x20vec2\x20vB;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uPressure;\x0a\x20\x20\x20\x20uniform\x20sampler2D\x20uVelocity;\x0a\x20\x20\x20\x20void\x20main\x20()\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20L\x20=\x20texture2D(uPressure,\x20vL).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20R\x20=\x20texture2D(uPressure,\x20vR).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20T\x20=\x20texture2D(uPressure,\x20vT).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20float\x20B\x20=\x20texture2D(uPressure,\x20vB).x;\x0a\x20\x20\x20\x20\x20\x20\x20\x20vec2\x20velocity\x20=\x20texture2D(uVelocity,\x20vUv).xy;\x0a\x20\x20\x20\x20\x20\x20\x20\x20velocity.xy\x20-=\x20vec2(R\x20-\x20L,\x20T\x20-\x20B);\x0a\x20\x20\x20\x20\x20\x20\x20\x20gl_FragColor\x20=\x20vec4(velocity,\x200.0,\x201.0);\x0a\x20\x20\x20\x20}\x0a',
// );
// const blit = (() => {
//   const _0x191a35 = _0x5ccc2a;
//   return (
//     gl[_0x191a35(0x10f)](gl[_0x191a35(0x16e)], gl[_0x191a35(0x196)]()),
//     gl[_0x191a35(0x151)](
//       gl[_0x191a35(0x16e)],
//       new Float32Array([-0x1, -0x1, -0x1, 0x1, 0x1, 0x1, 0x1, -0x1]),
//       gl[_0x191a35(0x15d)],
//     ),
//     gl[_0x191a35(0x10f)](gl[_0x191a35(0x131)], gl[_0x191a35(0x196)]()),
//     gl[_0x191a35(0x151)](
//       gl[_0x191a35(0x131)],
//       new Uint16Array([0x0, 0x1, 0x2, 0x0, 0x2, 0x3]),
//       gl.STATIC_DRAW,
//     ),
//     gl[_0x191a35(0x193)](0x0, 0x2, gl[_0x191a35(0x1ac)], ![], 0x0, 0x0),
//     gl[_0x191a35(0x183)](0x0),
//     (_0x5250d4, _0x18d359 = ![]) => {
//       const _0x494deb = _0x191a35;
//       _0x5250d4 == null
//         ? (gl[_0x494deb(0x127)](
//             0x0,
//             0x0,
//             gl[_0x494deb(0x134)],
//             gl[_0x494deb(0x1b0)],
//           ),
//           gl.bindFramebuffer(gl.FRAMEBUFFER, null))
//         : (gl[_0x494deb(0x127)](
//             0x0,
//             0x0,
//             _0x5250d4.width,
//             _0x5250d4[_0x494deb(0x156)],
//           ),
//           gl[_0x494deb(0x1a6)](gl.FRAMEBUFFER, _0x5250d4.fbo)),
//         _0x18d359 &&
//           (gl[_0x494deb(0x110)](0x0, 0x0, 0x0, 0x1),
//           gl[_0x494deb(0x152)](gl.COLOR_BUFFER_BIT)),
//         gl[_0x494deb(0x1d0)](
//           gl[_0x494deb(0x157)],
//           0x6,
//           gl[_0x494deb(0x16c)],
//           0x0,
//         );
//     }
//   );
// })();
// let dye;
// let velocity;
// let divergence;
// let curl;
// let pressure;
// let bloom;
// const bloomFramebuffers = [];
// let sunrays;
// let sunraysTemp;
// const blurProgram = new Program(blurVertexShader, blurShader);
// const copyProgram = new Program(baseVertexShader, copyShader);
// const clearProgram = new Program(baseVertexShader, clearShader);
// const colorProgram = new Program(baseVertexShader, colorShader);
// const checkerboardProgram = new Program(baseVertexShader, checkerboardShader);
// const bloomPrefilterProgram = new Program(
//   baseVertexShader,
//   bloomPrefilterShader,
// );
// const bloomBlurProgram = new Program(baseVertexShader, bloomBlurShader);
// const bloomFinalProgram = new Program(baseVertexShader, bloomFinalShader);
// const sunraysMaskProgram = new Program(baseVertexShader, sunraysMaskShader);
// const sunraysProgram = new Program(baseVertexShader, sunraysShader);
// const splatProgram = new Program(baseVertexShader, splatShader);
// const advectionProgram = new Program(baseVertexShader, advectionShader);
// const divergenceProgram = new Program(baseVertexShader, divergenceShader);
// const curlProgram = new Program(baseVertexShader, curlShader);
// const vorticityProgram = new Program(baseVertexShader, vorticityShader);
// const pressureProgram = new Program(baseVertexShader, pressureShader);
// const gradienSubtractProgram = new Program(
//   baseVertexShader,
//   gradientSubtractShader,
// );
// const displayMaterial = new Material(baseVertexShader, displayShaderSource);
// function initFramebuffers() {
//   const _0x1e48ea = _0x5ccc2a;
//   const _0x55608c = getResolution(config.SIM_RESOLUTION);
//   const _0xd7ff0a = getResolution(config[_0x1e48ea(0x184)]);
//   const _0x3c4d4a = ext[_0x1e48ea(0x1d2)];
//   const _0x3c072b = ext[_0x1e48ea(0x138)];
//   const _0x14d969 = ext[_0x1e48ea(0x1b2)];
//   const _0x3baf81 = ext[_0x1e48ea(0x15b)];
//   const _0x563045 = ext[_0x1e48ea(0x18a)]
//     ? gl[_0x1e48ea(0x1c3)]
//     : gl[_0x1e48ea(0x1c8)];
//   gl.disable(gl[_0x1e48ea(0x13b)]);
//   if (dye == null)
//     dye = createDoubleFBO(
//       _0xd7ff0a[_0x1e48ea(0x1ca)],
//       _0xd7ff0a[_0x1e48ea(0x156)],
//       _0x3c072b[_0x1e48ea(0x154)],
//       _0x3c072b[_0x1e48ea(0x1b7)],
//       _0x3c4d4a,
//       _0x563045,
//     );
//   else
//     dye = resizeDoubleFBO(
//       dye,
//       _0xd7ff0a.width,
//       _0xd7ff0a[_0x1e48ea(0x156)],
//       _0x3c072b[_0x1e48ea(0x154)],
//       _0x3c072b.format,
//       _0x3c4d4a,
//       _0x563045,
//     );
//   if (velocity == null)
//     velocity = createDoubleFBO(
//       _0x55608c.width,
//       _0x55608c[_0x1e48ea(0x156)],
//       _0x14d969[_0x1e48ea(0x154)],
//       _0x14d969[_0x1e48ea(0x1b7)],
//       _0x3c4d4a,
//       _0x563045,
//     );
//   else
//     velocity = resizeDoubleFBO(
//       velocity,
//       _0x55608c[_0x1e48ea(0x1ca)],
//       _0x55608c.height,
//       _0x14d969[_0x1e48ea(0x154)],
//       _0x14d969.format,
//       _0x3c4d4a,
//       _0x563045,
//     );
//   (divergence = createFBO(
//     _0x55608c[_0x1e48ea(0x1ca)],
//     _0x55608c[_0x1e48ea(0x156)],
//     _0x3baf81[_0x1e48ea(0x154)],
//     _0x3baf81.format,
//     _0x3c4d4a,
//     gl[_0x1e48ea(0x1c8)],
//   )),
//     (curl = createFBO(
//       _0x55608c[_0x1e48ea(0x1ca)],
//       _0x55608c.height,
//       _0x3baf81[_0x1e48ea(0x154)],
//       _0x3baf81[_0x1e48ea(0x1b7)],
//       _0x3c4d4a,
//       gl[_0x1e48ea(0x1c8)],
//     )),
//     (pressure = createDoubleFBO(
//       _0x55608c[_0x1e48ea(0x1ca)],
//       _0x55608c[_0x1e48ea(0x156)],
//       _0x3baf81[_0x1e48ea(0x154)],
//       _0x3baf81.format,
//       _0x3c4d4a,
//       gl[_0x1e48ea(0x1c8)],
//     )),
//     initBloomFramebuffers(),
//     initSunraysFramebuffers();
// }
// function initBloomFramebuffers() {
//   const _0x4b1e06 = _0x5ccc2a;
//   const _0xdbc717 = getResolution(config[_0x4b1e06(0x1be)]);
//   const _0x59d2ce = ext[_0x4b1e06(0x1d2)];
//   const _0x1c0b0c = ext[_0x4b1e06(0x138)];
//   const _0x137759 = ext[_0x4b1e06(0x18a)]
//     ? gl[_0x4b1e06(0x1c3)]
//     : gl[_0x4b1e06(0x1c8)];
//   (bloom = createFBO(
//     _0xdbc717.width,
//     _0xdbc717[_0x4b1e06(0x156)],
//     _0x1c0b0c[_0x4b1e06(0x154)],
//     _0x1c0b0c[_0x4b1e06(0x1b7)],
//     _0x59d2ce,
//     _0x137759,
//   )),
//     (bloomFramebuffers[_0x4b1e06(0x112)] = 0x0);
//   for (let _0x45030d = 0x0; _0x45030d < config[_0x4b1e06(0x14c)]; _0x45030d++) {
//     const _0x2cf067 = _0xdbc717[_0x4b1e06(0x1ca)] >> (_0x45030d + 0x1);
//     const _0xbeeab9 = _0xdbc717[_0x4b1e06(0x156)] >> (_0x45030d + 0x1);
//     if (_0x2cf067 < 0x2 || _0xbeeab9 < 0x2) break;
//     const _0x2b698c = createFBO(
//       _0x2cf067,
//       _0xbeeab9,
//       _0x1c0b0c[_0x4b1e06(0x154)],
//       _0x1c0b0c.format,
//       _0x59d2ce,
//       _0x137759,
//     );
//     bloomFramebuffers[_0x4b1e06(0x118)](_0x2b698c);
//   }
// }
// function initSunraysFramebuffers() {
//   const _0x272bca = _0x5ccc2a;
//   const _0x43b682 = getResolution(config[_0x272bca(0x1d1)]);
//   const _0x8291d7 = ext.halfFloatTexType;
//   const _0x349984 = ext[_0x272bca(0x15b)];
//   const _0x2c24c9 = ext.supportLinearFiltering
//     ? gl[_0x272bca(0x1c3)]
//     : gl[_0x272bca(0x1c8)];
//   (sunrays = createFBO(
//     _0x43b682[_0x272bca(0x1ca)],
//     _0x43b682[_0x272bca(0x156)],
//     _0x349984[_0x272bca(0x154)],
//     _0x349984[_0x272bca(0x1b7)],
//     _0x8291d7,
//     _0x2c24c9,
//   )),
//     (sunraysTemp = createFBO(
//       _0x43b682[_0x272bca(0x1ca)],
//       _0x43b682.height,
//       _0x349984.internalFormat,
//       _0x349984[_0x272bca(0x1b7)],
//       _0x8291d7,
//       _0x2c24c9,
//     ));
// }
// function createFBO(
//   _0x385e7d,
//   _0x29c9fd,
//   _0x3ead63,
//   _0xa273bc,
//   _0x1c8f04,
//   _0x10d6e5,
// ) {
//   const _0xcc0f62 = _0x5ccc2a;
//   gl[_0xcc0f62(0x129)](gl[_0xcc0f62(0x1ab)]);
//   const _0x330e32 = gl[_0xcc0f62(0x135)]();
//   gl[_0xcc0f62(0x139)](gl.TEXTURE_2D, _0x330e32),
//     gl[_0xcc0f62(0x177)](
//       gl[_0xcc0f62(0x153)],
//       gl.TEXTURE_MIN_FILTER,
//       _0x10d6e5,
//     ),
//     gl[_0xcc0f62(0x177)](gl[_0xcc0f62(0x153)], gl[_0xcc0f62(0x171)], _0x10d6e5),
//     gl.texParameteri(
//       gl[_0xcc0f62(0x153)],
//       gl[_0xcc0f62(0x158)],
//       gl.CLAMP_TO_EDGE,
//     ),
//     gl[_0xcc0f62(0x177)](
//       gl[_0xcc0f62(0x153)],
//       gl[_0xcc0f62(0x12d)],
//       gl[_0xcc0f62(0x13e)],
//     ),
//     gl[_0xcc0f62(0x169)](
//       gl[_0xcc0f62(0x153)],
//       0x0,
//       _0x3ead63,
//       _0x385e7d,
//       _0x29c9fd,
//       0x0,
//       _0xa273bc,
//       _0x1c8f04,
//       null,
//     );
//   const _0x4e4668 = gl[_0xcc0f62(0x19d)]();
//   gl[_0xcc0f62(0x1a6)](gl[_0xcc0f62(0x15c)], _0x4e4668),
//     gl.framebufferTexture2D(
//       gl[_0xcc0f62(0x15c)],
//       gl[_0xcc0f62(0x175)],
//       gl[_0xcc0f62(0x153)],
//       _0x330e32,
//       0x0,
//     ),
//     gl[_0xcc0f62(0x127)](0x0, 0x0, _0x385e7d, _0x29c9fd),
//     gl[_0xcc0f62(0x152)](gl[_0xcc0f62(0x185)]);
//   const _0xc372b7 = 0x1 / _0x385e7d;
//   const _0x2fdddc = 0x1 / _0x29c9fd;
//   return {
//     texture: _0x330e32,
//     fbo: _0x4e4668,
//     width: _0x385e7d,
//     height: _0x29c9fd,
//     texelSizeX: _0xc372b7,
//     texelSizeY: _0x2fdddc,
//     attach(_0x573132) {
//       const _0x2fa7a2 = _0xcc0f62;
//       return (
//         gl[_0x2fa7a2(0x129)](gl.TEXTURE0 + _0x573132),
//         gl.bindTexture(gl[_0x2fa7a2(0x153)], _0x330e32),
//         _0x573132
//       );
//     },
//   };
// }
// function createDoubleFBO(
//   _0x28e470,
//   _0xd7732c,
//   _0x13056e,
//   _0x329369,
//   _0x35305b,
//   _0x45427c,
// ) {
//   const _0x48d26b = _0x5ccc2a;
//   let _0x59e9e8 = createFBO(
//     _0x28e470,
//     _0xd7732c,
//     _0x13056e,
//     _0x329369,
//     _0x35305b,
//     _0x45427c,
//   );
//   let _0x1e4b93 = createFBO(
//     _0x28e470,
//     _0xd7732c,
//     _0x13056e,
//     _0x329369,
//     _0x35305b,
//     _0x45427c,
//   );
//   return {
//     width: _0x28e470,
//     height: _0xd7732c,
//     texelSizeX: _0x59e9e8[_0x48d26b(0x188)],
//     texelSizeY: _0x59e9e8[_0x48d26b(0x176)],
//     get read() {
//       return _0x59e9e8;
//     },
//     set read(_0x2c4a0c) {
//       _0x59e9e8 = _0x2c4a0c;
//     },
//     get write() {
//       return _0x1e4b93;
//     },
//     set write(_0x4d1aca) {
//       _0x1e4b93 = _0x4d1aca;
//     },
//     swap() {
//       const _0xc603fc = _0x59e9e8;
//       (_0x59e9e8 = _0x1e4b93), (_0x1e4b93 = _0xc603fc);
//     },
//   };
// }
// function resizeFBO(
//   _0x497a8d,
//   _0x5005fd,
//   _0x670bf4,
//   _0x565bbd,
//   _0x5443f8,
//   _0x270fed,
//   _0x4414ba,
// ) {
//   const _0x548a71 = _0x5ccc2a;
//   const _0x2b2a10 = createFBO(
//     _0x5005fd,
//     _0x670bf4,
//     _0x565bbd,
//     _0x5443f8,
//     _0x270fed,
//     _0x4414ba,
//   );
//   return (
//     copyProgram[_0x548a71(0x166)](),
//     gl[_0x548a71(0x116)](
//       copyProgram[_0x548a71(0x13c)][_0x548a71(0x143)],
//       _0x497a8d.attach(0x0),
//     ),
//     blit(_0x2b2a10),
//     _0x2b2a10
//   );
// }
// function resizeDoubleFBO(
//   _0x399704,
//   _0x1d041c,
//   _0x3aa7c3,
//   _0x5e80a8,
//   _0x2f2556,
//   _0x58337f,
//   _0x376b86,
// ) {
//   const _0x5dee38 = _0x5ccc2a;
//   if (_0x399704.width == _0x1d041c && _0x399704.height == _0x3aa7c3)
//     return _0x399704;
//   return (
//     (_0x399704[_0x5dee38(0x197)] = resizeFBO(
//       _0x399704[_0x5dee38(0x197)],
//       _0x1d041c,
//       _0x3aa7c3,
//       _0x5e80a8,
//       _0x2f2556,
//       _0x58337f,
//       _0x376b86,
//     )),
//     (_0x399704.write = createFBO(
//       _0x1d041c,
//       _0x3aa7c3,
//       _0x5e80a8,
//       _0x2f2556,
//       _0x58337f,
//       _0x376b86,
//     )),
//     (_0x399704.width = _0x1d041c),
//     (_0x399704.height = _0x3aa7c3),
//     (_0x399704[_0x5dee38(0x188)] = 0x1 / _0x1d041c),
//     (_0x399704.texelSizeY = 0x1 / _0x3aa7c3),
//     _0x399704
//   );
// }
// function createTextureAsync(_0x3b8d22) {
//   const _0x25999a = _0x5ccc2a;
//   const _0x535cf8 = gl[_0x25999a(0x135)]();
//   gl[_0x25999a(0x139)](gl[_0x25999a(0x153)], _0x535cf8),
//     gl.texParameteri(gl[_0x25999a(0x153)], gl[_0x25999a(0x11d)], gl.LINEAR),
//     gl.texParameteri(gl[_0x25999a(0x153)], gl[_0x25999a(0x171)], gl.LINEAR),
//     gl.texParameteri(gl[_0x25999a(0x153)], gl[_0x25999a(0x158)], gl.REPEAT),
//     gl[_0x25999a(0x177)](
//       gl[_0x25999a(0x153)],
//       gl[_0x25999a(0x12d)],
//       gl[_0x25999a(0x14f)],
//     ),
//     gl[_0x25999a(0x169)](
//       gl.TEXTURE_2D,
//       0x0,
//       gl[_0x25999a(0x194)],
//       0x1,
//       0x1,
//       0x0,
//       gl[_0x25999a(0x194)],
//       gl[_0x25999a(0x122)],
//       new Uint8Array([0xff, 0xff, 0xff]),
//     );
//   const _0x26dc17 = {
//     texture: _0x535cf8,
//     width: 0x1,
//     height: 0x1,
//     attach(_0x5e04ab) {
//       const _0x5be53f = _0x25999a;
//       return (
//         gl[_0x5be53f(0x129)](gl[_0x5be53f(0x1ab)] + _0x5e04ab),
//         gl[_0x5be53f(0x139)](gl.TEXTURE_2D, _0x535cf8),
//         _0x5e04ab
//       );
//     },
//   };
//   const _0xa8848 = new Image();
//   return (
//     (_0xa8848[_0x25999a(0x1d8)] = () => {
//       const _0xec307e = _0x25999a;
//       (_0x26dc17[_0xec307e(0x1ca)] = _0xa8848[_0xec307e(0x1ca)]),
//         (_0x26dc17[_0xec307e(0x156)] = _0xa8848.height),
//         gl[_0xec307e(0x139)](gl[_0xec307e(0x153)], _0x535cf8),
//         gl[_0xec307e(0x169)](
//           gl.TEXTURE_2D,
//           0x0,
//           gl[_0xec307e(0x194)],
//           gl[_0xec307e(0x194)],
//           gl[_0xec307e(0x122)],
//           _0xa8848,
//         );
//     }),
//     (_0xa8848[_0x25999a(0x15e)] = _0x3b8d22),
//     _0x26dc17
//   );
// }
// function updateKeywords() {
//   const _0x591ecc = _0x5ccc2a;
//   const _0x35d3b1 = [];
//   if (config.SHADING) _0x35d3b1[_0x591ecc(0x118)]('SHADING');
//   if (config.BLOOM) _0x35d3b1[_0x591ecc(0x118)]('BLOOM');
//   if (config[_0x591ecc(0x17b)]) _0x35d3b1[_0x591ecc(0x118)](_0x591ecc(0x17b));
//   displayMaterial[_0x591ecc(0x1c9)](_0x35d3b1);
// }
// updateKeywords(),
//   requestAnimationFrame(() => {
//     const _0x48808a = _0x5ccc2a;
//     multipleSplats(parseInt(Math[_0x48808a(0x1ba)]()) + 0x5);
//   });
// let lastUpdateTime = Date.now();
// let colorUpdateTimer = 0x0;
// function update() {
//   const _0x49dd06 = calcDeltaTime();
//   const _0x239a8e = resizeCanvas();
//   if (_0x239a8e) initFramebuffers();
//   updateColors(_0x49dd06), applyInputs();
//   if (!config.PAUSED) step(_0x49dd06);
//   render(null), requestAnimationFrame(update);
// }
// update(),
//   setInterval(() => {
//     requestAnimationFrame(() => {
//       const _0xcb7ac6 = _0x3c89;
//       multipleSplats(parseInt(Math[_0xcb7ac6(0x1ba)]() * 0x1) + 0x4);
//     });
//   }, 0xfa0);
// function calcDeltaTime() {
//   const _0x2f1e15 = _0x5ccc2a;
//   const _0x628061 = Date.now();
//   let _0x24a4f1 = (_0x628061 - lastUpdateTime) / 0x3e8;
//   return (
//     (_0x24a4f1 = Math[_0x2f1e15(0x1bc)](_0x24a4f1, 0.016666)),
//     (lastUpdateTime = _0x628061),
//     _0x24a4f1
//   );
// }
// function resizeCanvas() {
//   const _0x1b6187 = _0x5ccc2a;
//   const _0xaf3414 = scaleByPixelRatio(canvas[_0x1b6187(0x148)]);
//   const _0x40403c = scaleByPixelRatio(canvas[_0x1b6187(0x150)]);
//   if (canvas[_0x1b6187(0x1ca)] != _0xaf3414 || canvas.height != _0x40403c)
//     return (
//       (canvas[_0x1b6187(0x1ca)] = _0xaf3414),
//       (canvas[_0x1b6187(0x156)] = _0x40403c),
//       !![]
//     );
//   return ![];
// }
// function updateColors(_0x28910a) {
//   const _0x414f0a = _0x5ccc2a;
//   if (!config.COLORFUL) return;
//   (colorUpdateTimer += _0x28910a * config[_0x414f0a(0x1bd)]),
//     colorUpdateTimer >= 0x1 &&
//       ((colorUpdateTimer = wrap(colorUpdateTimer, 0x0, 0x1)),
//       pointers[_0x414f0a(0x1c7)]((_0x50889c) => {
//         const _0x3c11e3 = _0x414f0a;
//         _0x50889c[_0x3c11e3(0x1b5)] = generateColor();
//       }));
// }
// function applyInputs() {
//   const _0x137361 = _0x5ccc2a;
//   if (window[_0x137361(0x10e)][_0x137361(0x112)] > 0x0)
//     multipleSplats(window[_0x137361(0x10e)][_0x137361(0x174)]());
//   pointers[_0x137361(0x1c7)]((_0x40f2ee) => {
//     const _0x2e85da = _0x137361;
//     _0x40f2ee[_0x2e85da(0x12f)] &&
//       ((_0x40f2ee[_0x2e85da(0x12f)] = ![]), splatPointer(_0x40f2ee));
//   });
// }
// function step(_0x35cec0) {
//   const _0x295111 = _0x5ccc2a;
//   gl[_0x295111(0x161)](gl[_0x295111(0x13b)]),
//     curlProgram.bind(),
//     gl[_0x295111(0x164)](
//       curlProgram.uniforms[_0x295111(0x19c)],
//       velocity[_0x295111(0x188)],
//       velocity[_0x295111(0x176)],
//     ),
//     gl[_0x295111(0x116)](
//       curlProgram[_0x295111(0x13c)][_0x295111(0x13f)],
//       velocity[_0x295111(0x197)][_0x295111(0x14d)](0x0),
//     ),
//     blit(curl),
//     vorticityProgram.bind(),
//     gl[_0x295111(0x164)](
//       vorticityProgram.uniforms[_0x295111(0x19c)],
//       velocity[_0x295111(0x188)],
//       velocity.texelSizeY,
//     ),
//     gl[_0x295111(0x116)](
//       vorticityProgram[_0x295111(0x13c)][_0x295111(0x13f)],
//       velocity.read[_0x295111(0x14d)](0x0),
//     ),
//     gl[_0x295111(0x116)](
//       vorticityProgram[_0x295111(0x13c)].uCurl,
//       curl[_0x295111(0x14d)](0x1),
//     ),
//     gl[_0x295111(0x141)](
//       vorticityProgram[_0x295111(0x13c)][_0x295111(0x172)],
//       config[_0x295111(0x1c5)],
//     ),
//     gl[_0x295111(0x141)](vorticityProgram.uniforms.dt, _0x35cec0),
//     blit(velocity[_0x295111(0x1bf)]),
//     velocity[_0x295111(0x1ad)](),
//     divergenceProgram[_0x295111(0x166)](),
//     gl[_0x295111(0x164)](
//       divergenceProgram[_0x295111(0x13c)][_0x295111(0x19c)],
//       velocity[_0x295111(0x188)],
//       velocity[_0x295111(0x176)],
//     ),
//     gl[_0x295111(0x116)](
//       divergenceProgram[_0x295111(0x13c)].uVelocity,
//       velocity[_0x295111(0x197)][_0x295111(0x14d)](0x0),
//     ),
//     blit(divergence),
//     clearProgram[_0x295111(0x166)](),
//     gl[_0x295111(0x116)](
//       clearProgram[_0x295111(0x13c)][_0x295111(0x143)],
//       pressure[_0x295111(0x197)][_0x295111(0x14d)](0x0),
//     ),
//     gl[_0x295111(0x141)](
//       clearProgram[_0x295111(0x13c)][_0x295111(0x124)],
//       config[_0x295111(0x130)],
//     ),
//     blit(pressure[_0x295111(0x1bf)]),
//     pressure.swap(),
//     pressureProgram[_0x295111(0x166)](),
//     gl.uniform2f(
//       pressureProgram[_0x295111(0x13c)].texelSize,
//       velocity[_0x295111(0x188)],
//       velocity[_0x295111(0x176)],
//     ),
//     gl[_0x295111(0x116)](
//       pressureProgram[_0x295111(0x13c)][_0x295111(0x18b)],
//       divergence[_0x295111(0x14d)](0x0),
//     );
//   for (let _0x867449 = 0x0; _0x867449 < config[_0x295111(0x11b)]; _0x867449++) {
//     gl[_0x295111(0x116)](
//       pressureProgram[_0x295111(0x13c)][_0x295111(0x19b)],
//       pressure[_0x295111(0x197)][_0x295111(0x14d)](0x1),
//     ),
//       blit(pressure[_0x295111(0x1bf)]),
//       pressure[_0x295111(0x1ad)]();
//   }
//   gradienSubtractProgram[_0x295111(0x166)](),
//     gl[_0x295111(0x164)](
//       gradienSubtractProgram[_0x295111(0x13c)][_0x295111(0x19c)],
//       velocity.texelSizeX,
//       velocity[_0x295111(0x176)],
//     ),
//     gl.uniform1i(
//       gradienSubtractProgram[_0x295111(0x13c)][_0x295111(0x19b)],
//       pressure[_0x295111(0x197)][_0x295111(0x14d)](0x0),
//     ),
//     gl.uniform1i(
//       gradienSubtractProgram[_0x295111(0x13c)][_0x295111(0x13f)],
//       velocity[_0x295111(0x197)][_0x295111(0x14d)](0x1),
//     ),
//     blit(velocity[_0x295111(0x1bf)]),
//     velocity[_0x295111(0x1ad)](),
//     advectionProgram[_0x295111(0x166)](),
//     gl[_0x295111(0x164)](
//       advectionProgram[_0x295111(0x13c)][_0x295111(0x19c)],
//       velocity[_0x295111(0x188)],
//       velocity[_0x295111(0x176)],
//     );
//   if (!ext[_0x295111(0x18a)])
//     gl.uniform2f(
//       advectionProgram[_0x295111(0x13c)][_0x295111(0x11c)],
//       velocity[_0x295111(0x188)],
//       velocity.texelSizeY,
//     );
//   const _0x4f8a59 = velocity[_0x295111(0x197)].attach(0x0);
//   gl[_0x295111(0x116)](
//     advectionProgram[_0x295111(0x13c)][_0x295111(0x13f)],
//     _0x4f8a59,
//   ),
//     gl[_0x295111(0x116)](
//       advectionProgram[_0x295111(0x13c)][_0x295111(0x12c)],
//       _0x4f8a59,
//     ),
//     gl[_0x295111(0x141)](advectionProgram.uniforms.dt, _0x35cec0),
//     gl[_0x295111(0x141)](
//       advectionProgram[_0x295111(0x13c)][_0x295111(0x11a)],
//       config.VELOCITY_DISSIPATION,
//     ),
//     blit(velocity[_0x295111(0x1bf)]),
//     velocity[_0x295111(0x1ad)]();
//   if (!ext.supportLinearFiltering)
//     gl.uniform2f(
//       advectionProgram[_0x295111(0x13c)][_0x295111(0x11c)],
//       dye[_0x295111(0x188)],
//       dye[_0x295111(0x176)],
//     );
//   gl.uniform1i(
//     advectionProgram.uniforms.uVelocity,
//     velocity[_0x295111(0x197)][_0x295111(0x14d)](0x0),
//   ),
//     gl[_0x295111(0x116)](
//       advectionProgram.uniforms[_0x295111(0x12c)],
//       dye[_0x295111(0x197)][_0x295111(0x14d)](0x1),
//     ),
//     gl[_0x295111(0x141)](
//       advectionProgram[_0x295111(0x13c)][_0x295111(0x11a)],
//       config[_0x295111(0x111)],
//     ),
//     blit(dye[_0x295111(0x1bf)]),
//     dye[_0x295111(0x1ad)]();
// }
// function render(_0x1ac266) {
//   requestAnimationFrame(() => {
//     const _0x566172 = _0x3c89;
//     drawDisplay(_0x1ac266),
//       applySunrays(dye.read, dye[_0x566172(0x1bf)], sunrays),
//       blur(sunrays, sunraysTemp, 0x1);
//   });
// }
// function drawColor(_0x21a7ca, _0x5be657) {
//   const _0x4d6fd3 = _0x5ccc2a;
//   colorProgram[_0x4d6fd3(0x166)](),
//     gl[_0x4d6fd3(0x13a)](
//       colorProgram.uniforms[_0x4d6fd3(0x1b5)],
//       _0x5be657.r,
//       _0x5be657.g,
//       _0x5be657.b,
//       0x1,
//     ),
//     blit(_0x21a7ca);
// }
// function drawCheckerboard(_0x49e45) {
//   const _0x3d61ec = _0x5ccc2a;
//   checkerboardProgram[_0x3d61ec(0x166)](),
//     gl[_0x3d61ec(0x141)](
//       checkerboardProgram[_0x3d61ec(0x13c)][_0x3d61ec(0x1b4)],
//       canvas[_0x3d61ec(0x1ca)] / canvas.height,
//     ),
//     blit(_0x49e45);
// }
// function drawDisplay(_0x3a0d94) {
//   const _0x41b7e7 = _0x5ccc2a;
//   const _0x95c4ac = _0x3a0d94 == null ? gl[_0x41b7e7(0x134)] : _0x3a0d94.width;
//   const _0xe3f9bc =
//     _0x3a0d94 == null ? gl[_0x41b7e7(0x1b0)] : _0x3a0d94[_0x41b7e7(0x156)];
//   displayMaterial[_0x41b7e7(0x166)]();
//   if (config.SHADING)
//     gl[_0x41b7e7(0x164)](
//       displayMaterial.uniforms[_0x41b7e7(0x19c)],
//       0x1 / _0x95c4ac,
//       0x1 / _0xe3f9bc,
//     );
//   gl[_0x41b7e7(0x116)](
//     displayMaterial[_0x41b7e7(0x13c)][_0x41b7e7(0x143)],
//     dye[_0x41b7e7(0x197)][_0x41b7e7(0x14d)](0x0),
//   );
//   config[_0x41b7e7(0x123)] &&
//     gl[_0x41b7e7(0x116)](
//       displayMaterial[_0x41b7e7(0x13c)].uBloom,
//       bloom[_0x41b7e7(0x14d)](0x1),
//     );
//   if (config[_0x41b7e7(0x17b)])
//     gl[_0x41b7e7(0x116)](
//       displayMaterial[_0x41b7e7(0x13c)][_0x41b7e7(0x159)],
//       sunrays[_0x41b7e7(0x14d)](0x3),
//     );
//   blit(_0x3a0d94);
// }
// function applyBloom(_0x2c538c, _0x28f671) {
//   const _0x2cff56 = _0x5ccc2a;
//   if (bloomFramebuffers.length < 0x2) return;
//   let _0x51f653 = _0x28f671;
//   gl[_0x2cff56(0x161)](gl[_0x2cff56(0x13b)]), bloomPrefilterProgram.bind();
//   const _0x5327dd =
//     config[_0x2cff56(0x170)] * config[_0x2cff56(0x14b)] + 0.0001;
//   const _0x92ed94 = config.BLOOM_THRESHOLD - _0x5327dd;
//   const _0x3c9042 = _0x5327dd * 0x2;
//   const _0x35e532 = 0.25 / _0x5327dd;
//   gl[_0x2cff56(0x119)](
//     bloomPrefilterProgram[_0x2cff56(0x13c)][_0x2cff56(0x1da)],
//     _0x92ed94,
//     _0x3c9042,
//     _0x35e532,
//   ),
//     gl[_0x2cff56(0x141)](
//       bloomPrefilterProgram.uniforms[_0x2cff56(0x12a)],
//       config.BLOOM_THRESHOLD,
//     ),
//     gl[_0x2cff56(0x116)](
//       bloomPrefilterProgram.uniforms[_0x2cff56(0x143)],
//       _0x2c538c.attach(0x0),
//     ),
//     blit(_0x51f653),
//     bloomBlurProgram[_0x2cff56(0x166)]();
//   for (
//     let _0x357dd5 = 0x0;
//     _0x357dd5 < bloomFramebuffers[_0x2cff56(0x112)];
//     _0x357dd5++
//   ) {
//     const _0x3a1ef3 = bloomFramebuffers[_0x357dd5];
//     gl[_0x2cff56(0x164)](
//       bloomBlurProgram[_0x2cff56(0x13c)][_0x2cff56(0x19c)],
//       _0x51f653[_0x2cff56(0x188)],
//       _0x51f653[_0x2cff56(0x176)],
//     ),
//       gl[_0x2cff56(0x116)](
//         bloomBlurProgram[_0x2cff56(0x13c)][_0x2cff56(0x143)],
//         _0x51f653[_0x2cff56(0x14d)](0x0),
//       ),
//       blit(_0x3a1ef3),
//       (_0x51f653 = _0x3a1ef3);
//   }
//   gl[_0x2cff56(0x1b6)](gl[_0x2cff56(0x12b)], gl[_0x2cff56(0x12b)]),
//     gl.enable(gl[_0x2cff56(0x13b)]);
//   for (
//     let _0x3bc385 = bloomFramebuffers[_0x2cff56(0x112)] - 0x2;
//     _0x3bc385 >= 0x0;
//     _0x3bc385--
//   ) {
//     const _0x3df63d = bloomFramebuffers[_0x3bc385];
//     gl[_0x2cff56(0x164)](
//       bloomBlurProgram[_0x2cff56(0x13c)].texelSize,
//       _0x51f653.texelSizeX,
//       _0x51f653[_0x2cff56(0x176)],
//     ),
//       gl[_0x2cff56(0x116)](
//         bloomBlurProgram[_0x2cff56(0x13c)].uTexture,
//         _0x51f653[_0x2cff56(0x14d)](0x0),
//       ),
//       gl.viewport(0x0, 0x0, _0x3df63d[_0x2cff56(0x1ca)], _0x3df63d.height),
//       blit(_0x3df63d),
//       (_0x51f653 = _0x3df63d);
//   }
//   gl[_0x2cff56(0x161)](gl[_0x2cff56(0x13b)]),
//     bloomFinalProgram.bind(),
//     gl[_0x2cff56(0x164)](
//       bloomFinalProgram.uniforms[_0x2cff56(0x19c)],
//       _0x51f653[_0x2cff56(0x188)],
//       _0x51f653[_0x2cff56(0x176)],
//     ),
//     gl[_0x2cff56(0x116)](
//       bloomFinalProgram[_0x2cff56(0x13c)].uTexture,
//       _0x51f653.attach(0x0),
//     ),
//     gl[_0x2cff56(0x141)](
//       bloomFinalProgram[_0x2cff56(0x13c)][_0x2cff56(0x189)],
//       config.BLOOM_INTENSITY,
//     ),
//     blit(_0x28f671);
// }
// function applySunrays(_0x1f3c94, _0x2ceaec, _0x2c74e8) {
//   const _0x333582 = _0x5ccc2a;
//   gl.disable(gl[_0x333582(0x13b)]),
//     sunraysMaskProgram.bind(),
//     gl.uniform1i(
//       sunraysMaskProgram.uniforms.uTexture,
//       _0x1f3c94[_0x333582(0x14d)](0x0),
//     ),
//     blit(_0x2ceaec),
//     sunraysProgram[_0x333582(0x166)](),
//     gl[_0x333582(0x141)](
//       sunraysProgram[_0x333582(0x13c)][_0x333582(0x10d)],
//       config[_0x333582(0x17e)],
//     ),
//     gl[_0x333582(0x116)](
//       sunraysProgram[_0x333582(0x13c)].uTexture,
//       _0x2ceaec[_0x333582(0x14d)](0x0),
//     ),
//     blit(_0x2c74e8);
// }
// function blur(_0x17f6d9, _0x2114c5, _0x258683) {
//   const _0x383396 = _0x5ccc2a;
//   blurProgram[_0x383396(0x166)]();
//   for (let _0x36e889 = 0x0; _0x36e889 < _0x258683; _0x36e889++) {
//     gl[_0x383396(0x164)](
//       blurProgram[_0x383396(0x13c)][_0x383396(0x19c)],
//       _0x17f6d9[_0x383396(0x188)],
//       0x0,
//     ),
//       gl[_0x383396(0x116)](
//         blurProgram.uniforms[_0x383396(0x143)],
//         _0x17f6d9.attach(0x0),
//       ),
//       blit(_0x2114c5),
//       gl[_0x383396(0x164)](
//         blurProgram[_0x383396(0x13c)][_0x383396(0x19c)],
//         0x0,
//         _0x17f6d9[_0x383396(0x176)],
//       ),
//       gl[_0x383396(0x116)](
//         blurProgram[_0x383396(0x13c)].uTexture,
//         _0x2114c5[_0x383396(0x14d)](0x0),
//       ),
//       blit(_0x17f6d9);
//   }
// }
// function splatPointer(_0x5159cb) {
//   const _0x2cd2d3 = _0x5ccc2a;
//   const _0x347dd9 = _0x5159cb[_0x2cd2d3(0x19e)] * config[_0x2cd2d3(0x1c4)];
//   const _0x1ff9d5 = _0x5159cb.deltaY * config[_0x2cd2d3(0x1c4)];
//   splat(
//     _0x5159cb[_0x2cd2d3(0x147)],
//     _0x5159cb[_0x2cd2d3(0x1a4)],
//     _0x347dd9,
//     _0x1ff9d5,
//     _0x5159cb[_0x2cd2d3(0x1b5)],
//   );
// }
// function multipleSplats(_0x413192) {
//   const _0x511d5d = _0x5ccc2a;
//   for (let _0x49539b = 0x0; _0x49539b < _0x413192; _0x49539b++) {
//     const _0x56a020 = generateColor();
//     (_0x56a020.r *= 0xa), (_0x56a020.g *= 0xa), (_0x56a020.b *= 0xa);
//     const _0x33698a = Math[_0x511d5d(0x1ba)]();
//     const _0x5aa390 = Math[_0x511d5d(0x1ba)]();
//     const _0x43e20d = 0x3e8 * (Math[_0x511d5d(0x1ba)]() - 0.5);
//     const _0x20e4e7 = 0x3e8 * (Math.random() - 0.5);
//     splat(_0x33698a, _0x5aa390, _0x43e20d, _0x20e4e7, _0x56a020);
//   }
// }
// function splat(_0x38a772, _0x43547b, _0x198ed1, _0x511fb7, _0x2cce82) {
//   const _0x52d52f = _0x5ccc2a;
//   splatProgram[_0x52d52f(0x166)](),
//     gl[_0x52d52f(0x116)](
//       splatProgram.uniforms.uTarget,
//       velocity[_0x52d52f(0x197)].attach(0x0),
//     ),
//     gl[_0x52d52f(0x141)](
//       splatProgram[_0x52d52f(0x13c)][_0x52d52f(0x1b4)],
//       canvas[_0x52d52f(0x1ca)] / canvas[_0x52d52f(0x156)],
//     ),
//     gl[_0x52d52f(0x164)](
//       splatProgram[_0x52d52f(0x13c)][_0x52d52f(0x1bb)],
//       _0x38a772,
//       _0x43547b,
//     ),
//     gl[_0x52d52f(0x119)](
//       splatProgram[_0x52d52f(0x13c)][_0x52d52f(0x1b5)],
//       _0x198ed1,
//       _0x511fb7,
//       0x0,
//     ),
//     gl[_0x52d52f(0x141)](
//       splatProgram[_0x52d52f(0x13c)][_0x52d52f(0x1c1)],
//       correctRadius(config[_0x52d52f(0x162)] / 0x64),
//     ),
//     blit(velocity[_0x52d52f(0x1bf)]),
//     velocity[_0x52d52f(0x1ad)](),
//     gl[_0x52d52f(0x116)](
//       splatProgram[_0x52d52f(0x13c)].uTarget,
//       dye[_0x52d52f(0x197)][_0x52d52f(0x14d)](0x0),
//     ),
//     gl[_0x52d52f(0x119)](
//       splatProgram[_0x52d52f(0x13c)][_0x52d52f(0x1b5)],
//       _0x2cce82.r,
//       _0x2cce82.g,
//       _0x2cce82.b,
//     ),
//     blit(dye[_0x52d52f(0x1bf)]),
//     dye[_0x52d52f(0x1ad)]();
// }
// function correctRadius(_0x2c3812) {
//   const _0x315db4 = _0x5ccc2a;
//   const _0x43ce69 = canvas[_0x315db4(0x1ca)] / canvas.height;
//   if (_0x43ce69 > 0x1) _0x2c3812 *= _0x43ce69;
//   return _0x2c3812;
// }
// window[_0x5ccc2a(0x113)]('mousedown', (_0x1474bc) => {
//   const _0x245cbc = _0x5ccc2a;
//   const _0x122c1d = scaleByPixelRatio(_0x1474bc[_0x245cbc(0x1c0)]);
//   const _0xa5e391 = scaleByPixelRatio(_0x1474bc.offsetY);
//   let _0x27cf38 = pointers[_0x245cbc(0x1af)](
//     (_0x1bec96) => _0x1bec96.id == -0x1,
//   );
//   if (_0x27cf38 == null) _0x27cf38 = new pointerPrototype();
//   updatePointerDownData(_0x27cf38, -0x1, _0x122c1d, _0xa5e391);
// }),
//   window[_0x5ccc2a(0x113)](_0x5ccc2a(0x1a3), (_0x2166c4) => {
//     const _0x534c48 = _0x5ccc2a;
//     const _0x3fd975 = pointers[0x0];
//     if (!_0x3fd975[_0x534c48(0x137)]) return;
//     const _0x5823c = scaleByPixelRatio(_0x2166c4[_0x534c48(0x1c0)]);
//     const _0x2125c3 = scaleByPixelRatio(_0x2166c4.offsetY);
//     updatePointerMoveData(_0x3fd975, _0x5823c, _0x2125c3);
//   }),
//   window[_0x5ccc2a(0x113)]('mouseup', () => {
//     updatePointerUpData(pointers[0x0]);
//   }),
//   window[_0x5ccc2a(0x113)](_0x5ccc2a(0x1b8), (_0x2ee3ee) => {
//     const _0x1539e3 = _0x5ccc2a;
//     _0x2ee3ee[_0x1539e3(0x1d7)]();
//     const _0x4e5a33 = _0x2ee3ee.targetTouches;
//     while (_0x4e5a33.length >= pointers[_0x1539e3(0x112)])
//       pointers.push(new pointerPrototype());
//     for (
//       let _0x217285 = 0x0;
//       _0x217285 < _0x4e5a33[_0x1539e3(0x112)];
//       _0x217285++
//     ) {
//       const _0x2a557b = scaleByPixelRatio(_0x4e5a33[_0x217285].pageX);
//       const _0x5a3633 = scaleByPixelRatio(
//         _0x4e5a33[_0x217285][_0x1539e3(0x1c6)],
//       );
//       updatePointerDownData(
//         pointers[_0x217285 + 0x1],
//         _0x4e5a33[_0x217285][_0x1539e3(0x167)],
//         _0x2a557b,
//         _0x5a3633,
//       );
//     }
//   }),
//   window[_0x5ccc2a(0x113)](
//     'touchmove',
//     (_0x347696) => {
//       const _0x21f697 = _0x5ccc2a;
//       _0x347696.preventDefault();
//       const _0x4a1f3b = _0x347696[_0x21f697(0x1aa)];
//       for (let _0x58b53f = 0x0; _0x58b53f < _0x4a1f3b.length; _0x58b53f++) {
//         const _0x281a2a = pointers[_0x58b53f + 0x1];
//         if (!_0x281a2a.down) continue;
//         const _0x9fe1cf = scaleByPixelRatio(
//           _0x4a1f3b[_0x58b53f][_0x21f697(0x179)],
//         );
//         const _0x34e16f = scaleByPixelRatio(
//           _0x4a1f3b[_0x58b53f][_0x21f697(0x1c6)],
//         );
//         updatePointerMoveData(_0x281a2a, _0x9fe1cf, _0x34e16f);
//       }
//     },
//     ![],
//   ),
//   window[_0x5ccc2a(0x113)](_0x5ccc2a(0x142), (_0x20193e) => {
//     const _0xb082dc = _0x5ccc2a;
//     const _0x162355 = _0x20193e.changedTouches;
//     for (let _0x40567a = 0x0; _0x40567a < _0x162355.length; _0x40567a++) {
//       const _0x44a807 = pointers.find(
//         (_0x2feba3) => _0x2feba3.id == _0x162355[_0x40567a][_0xb082dc(0x167)],
//       );
//       if (_0x44a807 == null) continue;
//       updatePointerUpData(_0x44a807);
//     }
//   }),
//   window.addEventListener('keydown', (_0x301bb7) => {
//     const _0x5d59be = _0x5ccc2a;
//     if (_0x301bb7[_0x5d59be(0x1d9)] === _0x5d59be(0x198))
//       config.PAUSED = !config.PAUSED;
//     if (_0x301bb7.key === '\x20')
//       window[_0x5d59be(0x10e)][_0x5d59be(0x118)](
//         parseInt(Math.random() * 0x4) + 0x5,
//       );
//   });
// function updatePointerDownData(_0x5c973e, _0x3a732c, _0x111568, _0x5cd323) {
//   const _0x74bcf9 = _0x5ccc2a;
//   (_0x5c973e.id = _0x3a732c),
//     (_0x5c973e.down = !![]),
//     (_0x5c973e[_0x74bcf9(0x12f)] = ![]),
//     (_0x5c973e.texcoordX = _0x111568 / canvas[_0x74bcf9(0x1ca)]),
//     (_0x5c973e[_0x74bcf9(0x1a4)] = 0x1 - _0x5cd323 / canvas.height),
//     (_0x5c973e[_0x74bcf9(0x16d)] = _0x5c973e[_0x74bcf9(0x147)]),
//     (_0x5c973e[_0x74bcf9(0x125)] = _0x5c973e[_0x74bcf9(0x1a4)]),
//     (_0x5c973e[_0x74bcf9(0x19e)] = 0x0),
//     (_0x5c973e.deltaY = 0x0),
//     (_0x5c973e.color = generateColor());
// }
// function updatePointerMoveData(_0xe56681, _0x3be781, _0x2257a4) {
//   const _0x33e0c3 = _0x5ccc2a;
//   (_0xe56681[_0x33e0c3(0x16d)] = _0xe56681[_0x33e0c3(0x147)]),
//     (_0xe56681[_0x33e0c3(0x125)] = _0xe56681[_0x33e0c3(0x1a4)]),
//     (_0xe56681[_0x33e0c3(0x147)] = _0x3be781 / canvas[_0x33e0c3(0x1ca)]),
//     (_0xe56681.texcoordY = 0x1 - _0x2257a4 / canvas.height),
//     (_0xe56681[_0x33e0c3(0x19e)] = correctDeltaX(
//       _0xe56681[_0x33e0c3(0x147)] - _0xe56681.prevTexcoordX,
//     )),
//     (_0xe56681.deltaY = correctDeltaY(
//       _0xe56681[_0x33e0c3(0x1a4)] - _0xe56681[_0x33e0c3(0x125)],
//     )),
//     (_0xe56681[_0x33e0c3(0x12f)] =
//       Math[_0x33e0c3(0x1cb)](_0xe56681[_0x33e0c3(0x19e)]) > 0x0 ||
//       Math.abs(_0xe56681.deltaY) > 0x0);
// }
// function updatePointerUpData(_0x516bf3) {
//   const _0x1e0823 = _0x5ccc2a;
//   _0x516bf3[_0x1e0823(0x137)] = ![];
// }
// function correctDeltaX(_0x42c1ed) {
//   const _0x32b11c = _0x5ccc2a;
//   const _0x25178d = canvas.width / canvas[_0x32b11c(0x156)];
//   if (_0x25178d < 0x1) _0x42c1ed *= _0x25178d;
//   return _0x42c1ed;
// }
// function correctDeltaY(_0xe37ad7) {
//   const _0x59adb6 = _0x5ccc2a;
//   const _0x31880c = canvas[_0x59adb6(0x1ca)] / canvas[_0x59adb6(0x156)];
//   if (_0x31880c > 0x1) _0xe37ad7 /= _0x31880c;
//   return _0xe37ad7;
// }
// function generateColor() {
//   const _0x120466 = _0x5ccc2a;
//   const _0x2199d8 = HSVtoRGB(Math[_0x120466(0x1ba)](), 0x3, 0x3e);
//   return (
//     (_0x2199d8.r *= 0.0002),
//     (_0x2199d8.g *= 0.0002),
//     (_0x2199d8.b *= 0.0002),
//     _0x2199d8
//   );
// }
// function HSVtoRGB(_0x464742, _0x2f0d5d, _0x530cb5) {
//   const _0x595ab0 = _0x5ccc2a;
//   (i = Math[_0x595ab0(0x11e)](_0x464742 * 0x6)),
//     (f = _0x464742 * 0x6 + i),
//     (p = _0x530cb5 * (0x1 * _0x2f0d5d)),
//     (q = _0x530cb5 * (0x1 - f * _0x2f0d5d)),
//     (t = _0x530cb5 * (0x1 - (0x1 - f) * _0x2f0d5d));
//   switch (i % 0x6) {
//     case 0x0:
//       (r = 0x50), (g = 0x40), (b = 0xb6);
//       break;
//     case 0x1:
//       (r = 0x3d), (g = 0xc), (b = 0xd4);
//       break;
//     case 0x2:
//       (r = 0x76), (g = 0x40), (b = 0xe9);
//       break;
//     case 0x3:
//       (r = 0xe), (g = 0x7a), (b = 0xdd);
//       break;
//     case 0x4:
//       (r = 0x6e), (g = 0x53), (b = 0xff);
//       break;
//     case 0x5:
//       (r = 0x3c), (g = 0x5a), (b = 0xeb);
//       break;
//   }
//   return { r, g, b };
// }
// function normalizeColor(_0x45f498) {
//   const _0x102436 = {
//     r: _0x45f498.r / 0xff,
//     g: _0x45f498.g / 0xff,
//     b: _0x45f498.b / 0xff,
//   };
//   return _0x102436;
// }
// function wrap(_0x543f6b, _0x59c54c, _0x24b8dc) {
//   const _0x19edfa = _0x24b8dc - _0x59c54c;
//   if (_0x19edfa == 0x0) return _0x59c54c;
//   return ((_0x543f6b - _0x59c54c) % _0x19edfa) + _0x59c54c;
// }
// function getResolution(_0x23874e) {
//   const _0x407c33 = _0x5ccc2a;
//   let _0x381e82 = gl[_0x407c33(0x134)] / gl[_0x407c33(0x1b0)];
//   if (_0x381e82 < 0x1) _0x381e82 = 0x1 / _0x381e82;
//   const _0x2b395c = Math.round(_0x23874e);
//   const _0x253a37 = Math[_0x407c33(0x192)](_0x23874e * _0x381e82);
//   if (gl[_0x407c33(0x134)] > gl[_0x407c33(0x1b0)])
//     return { width: _0x253a37, height: _0x2b395c };
//   return { width: _0x2b395c, height: _0x253a37 };
// }
// function getTextureScale(_0x1123b1, _0x440ad7, _0x1f6cc2) {
//   const _0x1ec54b = _0x5ccc2a;
//   return {
//     x: _0x440ad7 / _0x1123b1[_0x1ec54b(0x1ca)],
//     y: _0x1f6cc2 / _0x1123b1[_0x1ec54b(0x156)],
//   };
// }
// function scaleByPixelRatio(_0x130220) {
//   const _0x3c1a17 = _0x5ccc2a;
//   const _0x1ac28c = window.devicePixelRatio || 0x1;
//   return Math[_0x3c1a17(0x11e)](_0x130220 * _0x1ac28c);
// }
// function hashCode(_0x94718b) {
//   if (_0x94718b.length == 0x0) return 0x0;
//   let _0x11dee0 = 0x0;
//   for (let _0x36b12f = 0x0; _0x36b12f < _0x94718b.length; _0x36b12f++) {
//     (_0x11dee0 =
//       (_0x11dee0 << 0x5) - _0x11dee0 + _0x94718b.charCodeAt(_0x36b12f)),
//       (_0x11dee0 |= 0x0);
//   }
//   return _0x11dee0;
// }
