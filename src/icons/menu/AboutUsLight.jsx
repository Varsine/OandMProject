const AboutUsLight = ({ ...rest }) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <g filter="url(#aboutLight0_b)">
      <circle cx="25" cy="25" r="25" fill="#EAF1FA" fillOpacity="0.6" />
      <circle
        cx="25"
        cy="25"
        r="24.75"
        stroke="url(#aboutLight0_linear)"
        strokeWidth="0.5"
      />
    </g>
    <path
      d="M29.3126 34.41L29.009 35.7808C28.0982 36.1779 27.3707 36.4801 26.829 36.6879C26.2867 36.8963 25.6565 37 24.9385 37C23.836 37 22.9784 36.7017 22.3667 36.1091C21.7551 35.5141 21.4492 34.7602 21.4492 33.8456C21.4492 33.4915 21.4714 33.1274 21.5175 32.7563C21.5641 32.3849 21.6381 31.9665 21.7393 31.4989L22.8775 27.0489C22.9788 26.6228 23.0649 26.2191 23.1338 25.8373C23.2037 25.4578 23.2374 25.1087 23.2374 24.7945C23.2374 24.2262 23.1309 23.8287 22.9188 23.6052C22.7067 23.3824 22.3021 23.2692 21.7014 23.2692C21.4071 23.2692 21.1047 23.3213 20.7964 23.4219C20.4868 23.523 20.2222 23.6207 20 23.7115L20.3044 22.3396C21.05 22.0042 21.7627 21.7171 22.4444 21.4787C23.1262 21.2398 23.7704 21.1202 24.3797 21.1202C25.4746 21.1202 26.3196 21.4125 26.9129 21.9971C27.5063 22.5822 27.8028 23.3406 27.8028 24.2752C27.8028 24.4686 27.7834 24.8093 27.7415 25.2963C27.7006 25.7844 27.6245 26.2315 27.5135 26.6383L26.3801 31.0704C26.2873 31.4264 26.2037 31.8333 26.1311 32.2913C26.0561 32.7462 26.0203 33.0938 26.0203 33.327C26.0203 33.9155 26.1391 34.3173 26.3772 34.5309C26.6171 34.7445 27.0303 34.8507 27.6173 34.8507C27.8928 34.8507 28.2063 34.7967 28.5547 34.6907C28.9021 34.5847 29.1554 34.4915 29.3126 34.41ZM29.6 15.8027C29.6 16.5749 29.3365 17.2344 28.8071 17.7767C28.2789 18.3209 27.6426 18.5932 26.8981 18.5932C26.1513 18.5932 25.5134 18.3209 24.9792 17.7767C24.4461 17.2342 24.1789 16.5749 24.1789 15.8027C24.1789 15.032 24.4461 14.3715 24.9792 13.8223C25.5124 13.274 26.1515 13 26.8981 13C27.6424 13 28.2789 13.2747 28.8071 13.8223C29.3369 14.3715 29.6 15.0322 29.6 15.8027Z"
      fill="url(#aboutLight1_linear)"
    />
    <defs>
      <filter
        id="aboutLight0_b"
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
          result="abotuUsEffect1_backgroundBlur"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="abotuUsEffect1_backgroundBlur"
          result="shape"
        />
      </filter>
      <linearGradient
        id="aboutLight0_linear"
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
        id="aboutLight1_linear"
        x1="24.8"
        y1="13"
        x2="24.8"
        y2="37"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5040B6" />
        <stop offset="1" stopColor="#3D80D4" />
      </linearGradient>
    </defs>
  </svg>
);

export default AboutUsLight;
