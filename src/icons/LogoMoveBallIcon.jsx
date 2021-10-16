const LogoMoveBallIcon = (props) => {
  return (
    <svg
      width="1920"
      height="1080"
      viewBox="0 11 1920 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="77" height="77" rx="38.5" fill="url(#paint0_linear)">
        <animateMotion
          dur="3.5s"
          restart="whenNotActive"
          path="M1 272C1 272 4.8211 252.761 62 215.5C238.666 100.373 226.284 596.012 437 604C630.136 611.321 820.466 312.263 1009.5 272C1186 234.406 1518.75 334.386 1467 604C1431.18 790.624 1266.06 866.444 1078.5 897C805.468 941.481 213.059 715.794 418.5 530.541C505 452.541 650 425.704 650 425.704L746 415.5"
        />
        <animate
          attributeName="width"
          restart="whenNotActive"
          values="35px;77px;77px;35px;35px"
          dur="3.5s"
        />
        <animate
          attributeName="height"
          restart="whenNotActive"
          values="35px;77px;77px;35px;35px"
          dur="3.5s"
        />
      </rect>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="38.5"
          y1="0"
          x2="38.5"
          y2="77"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5040B6" />
          <stop offset="1" stopColor="#3D80D4" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LogoMoveBallIcon;
