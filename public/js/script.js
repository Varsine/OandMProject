// ge1doot - 25 Oct 2015
// canvas pointer utility
/* eslint-disable */

'use strict';

var canvas = {
  elem: document.getElementById('canvas'),

  _resize: function () {
    this.width = this.elem.width = this.elem.offsetWidth;
    this.height = this.elem.height = this.elem.offsetHeight;
    this.resize && this.resize();
  },

  init: function () {
    var ctx = this.elem.getContext('2d');
    window.addEventListener('resize', this._resize.bind(this), false);
    this._resize();
    return ctx;
  },

  setCursor: function (type) {
    if (type !== this.cursor) {
      this.cursor = type;
      this.elem.style.cursor = type;
    }
  },

  pointer: function () {
    var pointer = {
      x: 0,
      y: 0,
      isDown: false,
    };

    pointer.move = function (e) {
      var touchMode = e.targetTouches,
        pointer;
      if (touchMode) {
        e.preventDefault();
        pointer = touchMode[0];
      } else pointer = e;
      this.x = pointer.clientX;
      this.y = pointer.clientY;
    };

    pointer.bind = function (elem, events, fn) {
      for (let i = 0, e = events.split(','); i < e.length; i++) {
        let canvasa = document.querySelectorAll(
          '.canvas__working, .header__content',
        );
        canvasa.forEach((item) => {
          item.addEventListener(e[i], fn.bind(pointer), false);
        });
      }
    };

    pointer.bind(
      document.getElementById('fullpage'),
      'mousemove,touchmove',
      function (e) {
        this.move(e);
      },
    );

    pointer.bind(
      document.getElementById('fullpage'),
      'mousedown,touchstart',
      function (e) {
        this.move(e);
        this.isDown = true;
        this.down && this.down();
      },
    );

    pointer.bind(
      document.getElementById('header'),
      'mouseup,touchend,touchcancel',
      function (e) {
        e.preventDefault();
        this.isDown = false;
        this.up && this.up();
      },
    );

    return pointer;
  },
};

// ge1doot 25 Oct 2015
// vector 2D

('use strict');

function Vector(x, y) {
  this.x = x || 0.0;
  this.y = y || 0.0;
}

Vector.prototype.set = function (x, y) {
  this.x = x;
  this.y = y;
  return this;
};

Vector.prototype.copy = function (v) {
  this.x = v.x;
  this.y = v.y;
  return this;
};

Vector.prototype.sub = function (v1, v2) {
  this.x = v1.x - v2.x;
  this.y = v1.y - v2.y;
  return this;
};

Vector.prototype.selfSub = function (v) {
  this.x -= v.x;
  this.y -= v.y;
  return this;
};

Vector.prototype.mult = function (v, f) {
  this.x = v.x * f;
  this.y = v.y * f;
  return this;
};

Vector.prototype.selfMult = function (f) {
  this.x *= f;
  this.y *= f;
  return this;
};

Vector.prototype.div = function (v, f) {
  this.x = v.x / f;
  this.y = v.y / f;
  return this;
};

Vector.prototype.selfDiv = function (f) {
  this.x /= f;
  this.y /= f;
  return this;
};

Vector.prototype.add = function (v1, v2) {
  this.x = v1.x + v2.x;
  this.y = v1.y + v2.y;
  return this;
};

Vector.prototype.selfAdd = function (v) {
  this.x += v.x;
  this.y += v.y;
  return this;
};

Vector.prototype.limit = function (maxLength) {
  var lengthSquared = this.x * this.x + this.y * this.y;
  if (lengthSquared > maxLength * maxLength && lengthSquared > 0) {
    var ratio = maxLength / Math.sqrt(lengthSquared);
    this.x *= ratio;
    this.y *= ratio;
  }
  return this;
};

Vector.prototype.dist2 = function (v) {
  return (this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y);
};

Vector.prototype.mag2 = function () {
  return this.x * this.x + this.y * this.y;
};

~(function () {
  'use strict';

  // setup

  var count = 30,
    circles = [],
    ds = 1,
    dragging = false,
    colors = ['#3B80D4 ', '#4D659B ', '#5040B6'],
    maxRad,
    grd;

  const widthViewport = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0,
  );

  window.onresize = function () {
    if (widthViewport <= 575) {
      count = 15;
    }
  };

  if (widthViewport <= 575) {
    count = 15;
  }

  // Circle constructor

  function Circle() {
    this.rad = 10 + Math.random() * maxRad; // radius
    this.rad2 = this.rad * this.rad;
    this.pos = new Vector(
      canvas.width * Math.random(),
      canvas.height * Math.random(),
    ); // Location
    this.vel = new Vector(Math.random() - 0.5, Math.random() - 0.5); // Speed
    this.acc = new Vector(); // Acceleration
    this.offset = new Vector(); // Offset from mouse
    this.force = new Vector(); // force
    this.c = colors[Math.floor(Math.random() * colors.length)]; // Color
    this.locked = false;
    this.parent = null;
    this.k = 0.1; // Spring constant
    this.damp = 0.98; // Damping
  }

  // circle update

  Circle.prototype.update = function () {
    this.acc.set(0, 0);

    if (this.locked && this.parent === null) {
      // Move the particle's coordinates to the mouse's position, minus its original offset
      this.acc.sub(this.force.sub(pointer, this.offset), this.pos).limit(1);
      this.vel.selfAdd(this.acc).limit(3); // Apply acceleration
      this.pos.sub(pointer, this.offset);
    } else if (
      this.locked &&
      this.parent !== null &&
      this.pos.dist2(this.parent.pos) >= this.parent.rad2
    ) {
      // Move the particle's coordinates to the parent's position, minus its original offset
      this.force.sub(this.pos, this.parent.pos).selfMult(-this.k);
      this.acc.div(this.force, this.rad * 0.5); // Set acceleration
      this.vel.mult(this.force.add(this.vel, this.acc), this.damp).limit(14); // Set velocity
      this.pos.selfAdd(this.vel); // Updated position
    } else {
      this.vel.selfAdd(this.acc.limit(1)); // Apply acceleration
      if (this.vel.mag2() > 0.5 * 0.5) {
        this.vel.selfMult(0.99); // Velocity damping
      }
      this.pos.selfAdd(this.vel); // Move circle
    }

    var dm = this.rad * 1; // Cache diameter
    // Wrap around canvas edges
    if (this.pos.x < -dm) this.pos.x = canvas.width + dm;
    if (this.pos.x > canvas.width + dm) this.pos.x = -dm;
    if (this.pos.y < -dm) this.pos.y = canvas.height + dm;
    if (this.pos.y > canvas.height + dm) this.pos.y = -dm;
  };

  // circle render

  Circle.prototype.render = function () {
    ctx.beginPath();

    if (this.pos.dist2(pointer) < this.rad2) {
      ctx.fillStyle = '#3B80D4';
      ctx.globalAlpha = 0.35;
      pointer.over = true;
    } else {
      ctx.fillStyle = this.c;
      ctx.globalAlpha = 0.35;
    }

    ctx.arc(this.pos.x, this.pos.y, this.rad, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = '#777777';
    ctx.globalAlpha = 0.35;

    // Loop through all circles
    for (var j = 0; j < count; j++) {
      var that = circles[j];
      // If the circles are close
      if (this.pos.dist2(that.pos) < this.rad2 * 1.44) {
        // Stroke a line from current circle to adjacent circle
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(that.pos.x, that.pos.y);
        ctx.stroke();
        // Attach it to parent
        if (this.locked && !that.locked) {
          that.locked = true;
          that.parent = this;
        }
      } else if (that.parent != null && that.parent === this) {
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(that.pos.x, that.pos.y); // Link to parent
        ctx.stroke();
      }
    }
    ctx.fillStyle = '#fff';
    ctx.fillRect(this.pos.x - ds, this.pos.y - ds, ds * 2, ds * 2); // Draw dot in center of circle
  };

  // main draw loop

  function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    pointer.over = false;

    // looping through circle array

    for (var i = 0; i < count; i++) {
      circles[i].update();
      circles[i].render();
    }

    // cursor

    if (dragging) {
      canvas.setCursor('move');
    } else {
      if (pointer.over) canvas.setCursor('pointer');
      else canvas.setCursor('default');
    }

    // vignette

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // create canvas context and pointer

  var ctx = canvas.init();

  // canvas resize event function

  canvas.resize = function () {
    // radius
    maxRad = Math.round(Math.sqrt(Math.min(this.width, this.height)) * 5);
    // vignette
    var outerRadius = 0;
    var innerRadius = 0;
    grd = ctx.createRadialGradient(
      this.width / 2,
      this.height / 2,
      innerRadius,
      this.width / 2,
      this.height / 2,
      outerRadius,
    );
    grd.addColorStop(0, 'rgba(0,0,0,0)');
    grd.addColorStop(1, 'rgba(0,0,0,1)');
  };

  canvas.resize();

  // pointer

  var pointer = canvas.pointer();

  // pointer down event

  pointer.down = function () {
    // Look for a circle the mouse is in, then lock that circle to the mouse
    for (var i = 0; i < count; i++) {
      // If the circles are close...
      if (circles[i].pos.dist2(this) < circles[i].rad2) {
        circles[i].locked = true;
        circles[i].offset.sub(this, circles[i].pos);
        dragging = true; // Break out of the loop because we found our circle
        break;
      }
    }
  };

  // pointer up event

  pointer.up = function () {
    // User is no-longer dragging
    for (var i = 0; i < count; i++) {
      circles[i].offset.set(0, 0);
      circles[i].locked = false;
      circles[i].parent = null; // Clear parent
    }
    dragging = false;
  };

  // create circles

  for (var i = 0; i < count; i++) {
    circles[i] = new Circle();
  }

  // start

  draw();
})();

if (window.Pieces) {
  setTimeout(() => {
    const menuItems = Array.from(
      document.querySelectorAll('.menuuu > .menu__item'),
    );

    const piecesObj = new Pieces(
      document.querySelector('.slideShow > .pieces'),
      {
        pieces: { rows: 14, columns: 12 },
        delay: [0, 40],
        hasTilt: true,
        tilt: {
          maxRotationX: -1,
          maxRotationY: -1,
          maxTranslationX: -5,
          maxTranslationY: -2,
        },
      },
    );

    let isAnimating = false;

    const openImage = (ev, item, pos) => {
      if (isAnimating) {
        return false;
      }
      isAnimating = true;
      let imgsrc = item.dataset.image;
      if (item.dataset.nightimage) {
        imgsrc = item.dataset.nightimage;
      }
      piecesObj.animate({
        duration: 200,
        easing: 'easeOutQuad',
        delay: (t, i, l) => {
          // return 1500;
          return parseInt(t.dataset.row) * parseInt(t.dataset.delay);
        },
        translateX: (t, i) => {
          return anime.random(-50, 50) + 'px';
        },
        translateY: (t, i) => {
          return anime.random(-800, -200) + 'px';
        },
        rotateZ: (t, i) => {
          return anime.random(-45, 45) + 'deg';
        },
        opacity: 0,
        complete: () => {
          piecesObj.setImage(imgsrc);

          piecesObj.animate({
            duration: 700,
            easing: [0.3, 1, 0.3, 1],
            delay: (t, i, l) => {
              return parseInt(t.dataset.row) * parseInt(t.dataset.delay);
            },
            translateX: 0,
            translateY: () => {
              return [anime.random(200, 800) + 'px', '0px'];
            },
            rotateZ: 0,
            opacity: {
              value: 1,
              duration: 700,
              easing: 'linear',
            },
            complete: () => {
              isAnimating = false;
            },
          });
        },
      });
    };

    document
      .querySelector('.left__menu__mode')
      .addEventListener('click', (ev) => {
        openImage(ev, document.querySelector('.slideShow > .pieces'), 0);
      }),
      menuItems.forEach((item, pos) =>
        item.addEventListener('click', (ev) => openImage(ev, item, pos)),
      );
  }, 1000);
}
