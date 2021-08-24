const ActiveMap = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_b)">
      <circle cx="32" cy="32" r="32" fill="url(#paint0_linear)" />
      <circle
        cx="32"
        cy="32"
        r="31.75"
        stroke="url(#paint1_linear)"
        strokeWidth="0.5"
      />
    </g>
    <g clipPath="url(#clip0)">
      <path
        d="M32.36 17C26.2253 17 21.2344 21.9909 21.2344 28.1256C21.2344 35.7388 31.1907 46.9156 31.6146 47.3877C32.0128 47.8311 32.7079 47.8303 33.1054 47.3877C33.5293 46.9156 43.4856 35.7388 43.4856 28.1256C43.4855 21.9909 38.4946 17 32.36 17ZM32.36 33.7231C29.2735 33.7231 26.7625 31.2121 26.7625 28.1256C26.7625 25.039 29.2735 22.528 32.36 22.528C35.4465 22.528 37.9575 25.0391 37.9575 28.1256C37.9575 31.2121 35.4465 33.7231 32.36 33.7231Z"
        fill="#F1F2F2"
      />
    </g>
    <defs>
      <filter
        id="filter0_b"
        x="-50"
        y="-50"
        width="164"
        height="164"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation="25" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear"
        x1="32"
        y1="0"
        x2="32"
        y2="64"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5040B6" />
        <stop offset="1" stopColor="#3D80D4" />
      </linearGradient>
      <linearGradient
        id="paint1_linear"
        x1="32"
        y1="0"
        x2="32"
        y2="64"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5040B6" />
        <stop offset="1" stopColor="#3D80D4" />
      </linearGradient>
      <clipPath id="clip0">
        <rect
          width="30.72"
          height="30.72"
          fill="white"
          transform="translate(17 17)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default ActiveMap;
