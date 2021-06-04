const Close = ({ ...rest }) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g filter="url(#close0_b)">
      <circle cx="25" cy="25" r="25" fill="url(#close0_linear)" />
    </g>
    <path
      d="M17.8313 33.2605L33.4526 17.6391C33.772 17.3197 33.7936 16.8229 33.5009 16.5302C33.2081 16.2375 32.7113 16.2591 32.392 16.5785L16.7706 32.1998C16.4512 32.5192 16.2376 33.2081 16.5303 33.5008C16.823 33.7935 17.5119 33.5798 17.8313 33.2605Z"
      fill="#F1F2F2"
    />
    <path
      d="M33.5008 32.4402L17.5909 16.5303C17.2981 16.2376 16.8229 16.2376 16.5302 16.5303C16.2375 16.823 16.2375 17.2982 16.5302 17.591L32.4402 33.5009C32.7329 33.7936 33.2081 33.7936 33.5008 33.5009C33.7935 33.2082 33.7935 32.733 33.5008 32.4402Z"
      fill="#F1F2F2"
    />
    <defs>
      <filter
        id="close0_b"
        x="-20"
        y="-20"
        width="90"
        height="90"
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
        id="close0_linear"
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

export default Close;
