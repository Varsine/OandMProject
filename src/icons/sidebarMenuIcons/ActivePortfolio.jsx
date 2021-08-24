const ActivePortfolio = () => (
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
        d="M36.1997 25.3201C35.4932 25.3201 34.9197 24.7466 34.9197 24.0401V22.1201H29.7997V24.0401C29.7997 24.7466 29.2263 25.3201 28.5197 25.3201C27.8132 25.3201 27.2397 24.7466 27.2397 24.0401V22.1201C27.2397 20.7082 28.3879 19.5601 29.7997 19.5601H34.9197C36.3316 19.5601 37.4797 20.7082 37.4797 22.1201V24.0401C37.4797 24.7466 36.9063 25.3201 36.1997 25.3201Z"
        fill="#F1F2F2"
      />
      <path
        d="M33.2688 36.6865C33.0384 36.7761 32.7056 36.8401 32.36 36.8401C32.0144 36.8401 31.6816 36.7761 31.3744 36.6609L17 31.8737V41.6401C17 43.5857 18.5744 45.1601 20.52 45.1601H44.2C46.1456 45.1601 47.72 43.5857 47.72 41.6401V31.8737L33.2688 36.6865Z"
        fill="#F1F2F2"
      />
      <path
        d="M47.72 26.92V29.8512L32.6672 34.8688C32.5648 34.9072 32.4624 34.92 32.36 34.92C32.2576 34.92 32.1552 34.9072 32.0528 34.8688L17 29.8512V26.92C17 24.9744 18.5744 23.4 20.52 23.4H44.2C46.1456 23.4 47.72 24.9744 47.72 26.92Z"
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
export default ActivePortfolio;
