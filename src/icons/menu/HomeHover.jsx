const HomeHover = ({ ...rest }) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g filter="url(#homeHover0_b)">
      <circle cx="25" cy="25" r="25" fill="url(#homeHover0_linear)" />
      <circle
        cx="25"
        cy="25"
        r="24.75"
        stroke="url(#homeHover1_linear)"
        strokeWidth="0.5"
      />
    </g>
    <path
      d="M36.868 23.9512L24.9998 13L13.1321 23.9512C12.9649 24.1058 12.955 24.3661 13.1106 24.5327C13.2653 24.6988 13.5281 24.7082 13.6953 24.554L15.0687 23.2867V37H21.6894H28.3102H34.931V23.2863L36.3044 24.5536C36.3838 24.6272 36.4852 24.6634 36.5862 24.6634C36.6975 24.6634 36.808 24.6194 36.8891 24.5323C37.0451 24.3661 37.0352 24.1058 36.868 23.9512ZM22.517 36.1776V29.5983C22.517 28.2376 23.6306 27.1311 24.9998 27.1311C26.3691 27.1311 27.4826 28.2376 27.4826 29.5983V36.1776H22.517ZM34.1034 36.1776H28.3102V29.5983C28.3102 27.7845 26.8251 26.3087 24.9998 26.3087C23.1746 26.3087 21.6894 27.7845 21.6894 29.5983V36.1776H15.8963V22.5227L24.9998 14.1222L34.1034 22.5227V36.1776Z"
      fill="#F1F2F2"
    />
    <defs>
      <filter
        id="homeHover0_b"
        x="-50"
        y="-50"
        width="150"
        height="150"
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
        id="homeHover0_linear"
        x1="25"
        y1="0"
        x2="25"
        y2="50"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5040B6" />
        <stop offset="1" stopColor="#3D80D4" />
      </linearGradient>
      <linearGradient
        id="homeHover1_linear"
        x1="25"
        y1="0"
        x2="25"
        y2="50"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5040B6" />
        <stop offset="1" stopColor="#3D80D4" />
      </linearGradient>
    </defs>
  </svg>
);

export default HomeHover;
