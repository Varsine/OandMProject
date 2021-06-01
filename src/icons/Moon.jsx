import React from 'react';

const Moon = ({ ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    {...rest}
  >
    <path
      d="M32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16Z"
      fill="url(#moon_linear)"
    />
    <path
      d="M16 8C11.5887 8 8 11.5891 8 16C8 20.4109 11.5887 24 16 24C20.4106 24 24 20.4116 24 16C24 16 19.5478 23.0988 14.2244 17.7759C10.6755 12.4531 16 8 16 8Z"
      fill="#F1F2F2"
    />
    <defs>
      <linearGradient
        id="moon_linear"
        x1="16"
        y1="0"
        x2="16"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#205184" />
        <stop offset="1" stopColor="#091E35" />
      </linearGradient>
    </defs>
  </svg>
);

export default Moon;
