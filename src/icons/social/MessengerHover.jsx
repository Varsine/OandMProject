import React from 'react';

const MessengerHover = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="39"
    height="38"
    viewBox="0 0 39 38"
    fill="none"
  >
    <g filter="url(#messenger0_b)">
      <rect
        x="0.416992"
        width="37.7192"
        height="37.7359"
        rx="18.8596"
        fill="#EAF1FA"
        fillOpacity="0.6"
      />
      <path
        d="M18.916 8.00204C13.2418 7.89016 8.54655 12.3898 8.41699 18.0635C8.4318 20.9517 9.71066 23.6886 11.9166 25.5528V28.5625C11.9166 28.8041 12.1125 29 12.3541 29C12.4361 29 12.5164 28.9769 12.5859 28.9335L15.0243 27.4103C16.2667 27.8855 17.5859 28.1278 18.916 28.1251C24.5901 28.237 29.2854 23.7373 29.4149 18.0636C29.2854 12.3898 24.5901 7.89016 18.916 8.00204Z"
        fill="#F1F2F2"
      />
      <path
        d="M25.8275 15.1759C25.6974 15.0014 25.4587 14.9492 25.2676 15.0534L20.7181 17.5338L17.8877 15.1067C17.7142 14.9579 17.4553 14.9678 17.2937 15.1295L12.0442 20.379C11.8739 20.5503 11.8747 20.8273 12.0461 20.9976C12.1831 21.1338 12.3932 21.164 12.563 21.0719L17.1126 18.5915L19.9455 21.0194C20.1191 21.1682 20.378 21.1583 20.5396 20.9967L25.7891 15.7472C25.942 15.5928 25.9585 15.3494 25.8275 15.1759Z"
        fill="url(#messenger0_linear)"
      />
      <rect
        x="0.666992"
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
        id="messenger0_b"
        x="-19.583"
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
      <linearGradient
        id="messenger0_linear"
        x1="21.9786"
        y1="15.2871"
        x2="20.1465"
        y2="22.586"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF636E" />
        <stop offset="0.134079" stopColor="#E148A8" />
        <stop offset="0.34278" stopColor="#C143FE" />
        <stop offset="0.582014" stopColor="#6E53FF" />
        <stop offset="0.821607" stopColor="#3D72FF" />
        <stop offset="1" stopColor="#0195FF" />
      </linearGradient>
    </defs>
  </svg>
);

export default MessengerHover;
