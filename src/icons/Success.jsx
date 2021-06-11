const Success = ({ ...rest }) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <circle cx="50" cy="50" r="50" fill="url(#success0_linear)" />
    <path
      d="M26.3595 47.3283C25.1622 46.183 23.2632 46.225 22.1179 47.4223C20.9725 48.6195 21.0146 50.5185 22.2118 51.6639L26.3595 47.3283ZM42.7322 67.1431L40.6584 69.3109C41.8183 70.4205 43.6462 70.4205 44.8061 69.3109L42.7322 67.1431ZM80.6452 35.0252C81.8424 33.8799 81.8845 31.9808 80.7391 30.7836C79.5938 29.5864 77.6948 29.5443 76.4975 30.6896L80.6452 35.0252ZM22.2118 51.6639L40.6584 69.3109L44.8061 64.9754L26.3595 47.3283L22.2118 51.6639ZM44.8061 69.3109L80.6452 35.0252L76.4975 30.6896L40.6584 64.9754L44.8061 69.3109Z"
      fill="#F1F2F2"
    />
    <defs>
      <linearGradient
        id="success0_linear"
        x1="50"
        y1="0"
        x2="50"
        y2="100"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5040B6" />
        <stop offset="1" stopColor="#3D80D4" />
      </linearGradient>
    </defs>
  </svg>
);

export default Success;
