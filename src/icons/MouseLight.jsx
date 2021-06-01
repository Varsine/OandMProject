const MouseLight = ({ ...rest }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M19.6667 7.44421C13.7849 7.44421 9 12.2272 9 18.1057V28.7833C9 34.6617 13.7849 39.4442 19.6667 39.4442C25.5484 39.4442 30.3333 34.6619 30.3333 28.7833V18.1057C30.3333 12.2272 25.5483 7.44421 19.6667 7.44421ZM29.1482 28.7833C29.1482 34.0084 24.8948 38.259 19.6667 38.259C14.4386 38.259 10.1852 34.0084 10.1852 28.7833V18.1057C10.1852 12.8807 14.4386 8.62938 19.6667 8.62938C24.8948 8.62938 29.1482 12.8805 29.1482 18.1057V28.7833Z"
      fill="url(#mouseLight0_linear)"
    />
    <path
      d="M19.6666 10.9999C19.3394 10.9999 19.074 11.265 19.074 11.5925V16.9589C19.074 17.2865 19.3394 17.5515 19.6666 17.5515C19.9939 17.5515 20.2593 17.2865 20.2593 16.9589V11.5925C20.2592 11.265 19.9939 10.9999 19.6666 10.9999Z"
      fill="url(#mouseLight1_linear)"
    />
    <path
      d="M14.3622 0.469144C14.1622 0.728183 14.2098 1.10024 14.4691 1.30045L18.7165 4.58026C18.9758 4.78047 19.3478 4.73243 19.5478 4.47339C19.7478 4.21435 19.7002 3.84229 19.4409 3.64208L15.1935 0.362278C14.9342 0.162186 14.5623 0.210104 14.3622 0.469144Z"
      fill="url(#mouseLight2_linear)"
    />
    <defs>
      <linearGradient
        id="mouseLight0_linear"
        x1="19.6667"
        y1="7.44421"
        x2="19.6667"
        y2="39.4442"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5040B6" />
        <stop offset="1" stopColor="#3D80D4" />
      </linearGradient>
      <linearGradient
        id="mouseLight1_linear"
        x1="19.6666"
        y1="10.9999"
        x2="19.6666"
        y2="17.5515"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5040B6" />
        <stop offset="1" stopColor="#3D80D4" />
      </linearGradient>
      <linearGradient
        id="mouseLight2_linear"
        x1="14.3622"
        y1="0.469144"
        x2="19.5478"
        y2="4.47339"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5040B6" />
        <stop offset="1" stopColor="#3D80D4" />
      </linearGradient>
    </defs>
  </svg>
);

export default MouseLight;
