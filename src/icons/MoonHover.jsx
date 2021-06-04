const MoonHover = ({ ...rest }) => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g filter="url(#moonHover0_b)">
      <rect
        width="37.7359"
        height="37.7359"
        rx="18.8679"
        fill="#EAF1FA"
        fillOpacity="0.6"
      />
      <path
        d="M19 8C12.9345 8 8 12.935 8 19C8 25.065 12.9345 30 19 30C25.0645 30 30 25.0659 30 19C30 19 23.8782 28.7608 16.5586 21.4419C11.6789 14.1229 19 8 19 8Z"
        fill="#F1F2F2"
      />
      <rect
        x="0.25"
        y="0.25"
        width="37.2359"
        height="37.2359"
        rx="18.6179"
        stroke="url(#moonHover0_linear)"
        strokeWidth="0.5"
      />
    </g>
    <defs>
      <filter
        id="moonHover0_b"
        x="-20"
        y="-20"
        width="77.7359"
        height="77.7359"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation="10" />
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
        id="moonHover0_linear"
        x1="0"
        y1="37.7359"
        x2="37.7359"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default MoonHover;
