import React from 'react';

const FbHover = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
  >
    <g filter="url(#fbhover0_b)">
      <rect
        y="0.263916"
        width="37.7359"
        height="37.7359"
        rx="18.8679"
        fill="#EAF1FA"
        fillOpacity="0.6"
      />
      <path
        d="M22.3539 19.1144H19.877V28.1884H16.1244V19.1144H14.3396V15.9254H16.1244V13.8617C16.1244 12.386 16.8254 10.0752 19.9104 10.0752L22.6901 10.0868V13.1823H20.6733C20.3424 13.1823 19.8773 13.3476 19.8773 14.0515V15.9283H22.6817L22.3539 19.1144Z"
        fill="#F1F2F2"
      />
      <rect
        x="0.25"
        y="0.513916"
        width="37.2359"
        height="37.2359"
        rx="18.6179"
        stroke="url(#fbhover0_linear)"
        strokeWidth="0.5"
      />
    </g>
    <defs>
      <filter
        id="fbhover0_b"
        x="-20"
        y="-19.7361"
        width="77.7359"
        height="77.7359"
        filterUnits="userSpaceOnUse"
        coloriterpolation-filters="sRGB"
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
        id="fbhover0_linear"
        x1="0"
        y1="37.9998"
        x2="37.7359"
        y2="0.263916"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default FbHover;
