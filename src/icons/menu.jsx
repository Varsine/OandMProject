import React from 'react';

const menu = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_b)">
      <circle
        cx="25"
        cy="25"
        r="24.75"
        stroke="url(#paint0_linear)"
        strokeWidth="0.5"
      />
    </g>
    <path
      d="M15.9999 20.5L36.25 20.5C36.664 20.5 36.9999 20.1639 36.9999 19.75C36.9999 19.336 36.6639 19 36.25 19H15.9999C15.5859 19 15.001 19.336 15.001 19.75C15.001 20.1639 15.586 20.5 15.9999 20.5Z"
      fill="url(#paint1_linear)"
    />
    <path
      d="M36.25 24.25H13.75C13.336 24.25 13 24.586 13 25C13 25.4139 13.336 25.75 13.75 25.75H36.25C36.664 25.75 37 25.4139 37 25C37 24.586 36.664 24.25 36.25 24.25Z"
      fill="url(#paint2_linear)"
    />
    <path
      d="M36.25 29.5H21.25C20.836 29.5 20.5 29.836 20.5 30.25C20.5 30.664 20.836 31 21.25 31H36.25C36.664 31 37 30.6639 37 30.25C37 29.836 36.664 29.5 36.25 29.5Z"
      fill="url(#paint3_linear)"
    />
    <defs>
      <filter
        id="filter0_b"
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
        id="paint0_linear"
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
        id="paint1_linear"
        x1="26.0005"
        y1="19"
        x2="26.0005"
        y2="20.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5040B6" />
        <stop offset="1" stopColor="#3D80D4" />
      </linearGradient>
      <linearGradient
        id="paint2_linear"
        x1="25"
        y1="24.25"
        x2="25"
        y2="25.75"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5040B6" />
        <stop offset="1" stopColor="#3D80D4" />
      </linearGradient>
      <linearGradient
        id="paint3_linear"
        x1="28.75"
        y1="29.5"
        x2="28.75"
        y2="31"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5040B6" />
        <stop offset="1" stopColor="#3D80D4" />
      </linearGradient>
    </defs>
  </svg>
);

export default menu;
