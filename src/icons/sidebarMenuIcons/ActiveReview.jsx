const ActiveReviewIcon = () => (
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
        d="M47.6849 28.7912C47.602 28.5508 47.391 28.3772 47.1399 28.3438L37.4669 27.0615L32.9576 18.0216C32.7332 17.5688 31.9865 17.5688 31.7621 18.0216L27.2529 27.0615L17.5799 28.3438C17.3287 28.3771 17.1164 28.5508 17.0349 28.7912C16.9535 29.0317 17.0149 29.2974 17.1952 29.4778L24.289 36.5716L22.3563 46.2379C22.3069 46.4891 22.4031 46.7442 22.606 46.9004C22.8091 47.0554 23.0842 47.0807 23.31 46.9672L32.3606 42.442L41.4112 46.9672C41.506 47.014 41.6075 47.038 41.7104 47.038C41.8533 47.038 41.9976 46.9913 42.1164 46.9005C42.3181 46.7455 42.4156 46.4891 42.3662 46.238L40.4335 36.5717L47.5273 29.4779C47.7035 29.2988 47.765 29.033 47.6849 28.7912Z"
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
export default ActiveReviewIcon;
