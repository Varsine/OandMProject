const InstagramHover = () => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#instagramHover0_b)">
      <rect
        width="37.7192"
        height="37.7359"
        rx="18.8596"
        fill="#EAF1FA"
        fillOpacity="0.6"
      />
      <rect
        x="10.9"
        y="10.9"
        width="16.2"
        height="16.2"
        rx="4.1"
        stroke="#F1F2F2"
        strokeWidth="1.8"
      />
      <circle cx="19" cy="19" r="3.6" stroke="#F1F2F2" strokeWidth="1.8" />
      <circle cx="23.5001" cy="13.6" r="0.9" fill="#F1F2F2" />
      <rect
        x="0.25"
        y="0.25"
        width="37.2192"
        height="37.2359"
        rx="18.6096"
        stroke="#EAF1FA"
        strokeOpacity="0.6"
        strokeWidth="0.5"
      />
    </g>
    <defs>
      <filter
        id="instagramHover0_b"
        x="-20"
        y="-20"
        width="77.7192"
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
    </defs>
  </svg>
);

export default InstagramHover;
