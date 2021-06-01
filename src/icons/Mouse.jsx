const Mouse = ({ ...rest }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M19.6667 7.40002C13.7849 7.40002 9 12.183 9 18.0615V28.7391C9 34.6175 13.7849 39.4 19.6667 39.4C25.5484 39.4 30.3333 34.6177 30.3333 28.7391V18.0615C30.3333 12.183 25.5483 7.40002 19.6667 7.40002ZM29.1482 28.7391C29.1482 33.9642 24.8948 38.2149 19.6667 38.2149C14.4386 38.2149 10.1852 33.9642 10.1852 28.7391V18.0615C10.1852 12.8365 14.4386 8.58519 19.6667 8.58519C24.8948 8.58519 29.1482 12.8363 29.1482 18.0615V28.7391Z"
      fill="url(#mouse0_linear)"
    />
    <path
      d="M19.6669 10.9557C19.3396 10.9557 19.0742 11.2208 19.0742 11.5483V16.9147C19.0742 17.2423 19.3396 17.5073 19.6669 17.5073C19.9942 17.5073 20.2595 17.2423 20.2595 16.9147V11.5483C20.2594 11.2208 19.9942 10.9557 19.6669 10.9557Z"
      fill="url(#mouse1_linear)"
    />
    <path
      d="M14.3622 0.469144C14.1622 0.728183 14.2098 1.10024 14.4691 1.30045L18.7165 4.58026C18.9758 4.78047 19.3478 4.73243 19.5478 4.47339C19.7478 4.21435 19.7002 3.84229 19.4409 3.64208L15.1935 0.362278C14.9342 0.162186 14.5623 0.210104 14.3622 0.469144Z"
      fill="url(#mouse2_linear)"
    />
    <defs>
      <linearGradient
        id="mouse0_linear"
        x1="19.6667"
        y1="7.40002"
        x2="19.6667"
        y2="39.4"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1D62F0" />
        <stop offset="1" stopColor="#19D5FD" />
      </linearGradient>
      <linearGradient
        id="mouse1_linear"
        x1="19.6669"
        y1="10.9557"
        x2="19.6669"
        y2="17.5073"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1D62F0" />
        <stop offset="1" stopColor="#19D5FD" />
      </linearGradient>
      <linearGradient
        id="mouse2_linear"
        x1="14.3622"
        y1="0.469144"
        x2="19.5478"
        y2="4.47339"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1D62F0" />
        <stop offset="1" stopColor="#19D5FD" />
      </linearGradient>
    </defs>
  </svg>
);

export default Mouse;
