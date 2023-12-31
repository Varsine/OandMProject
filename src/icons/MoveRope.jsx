const MoveRope = ({ ...rest }) => (
  <svg
    width="264"
    height="877"
    viewBox="0 0 264 877"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M0.802856 1.00427C1.76393 222.848 2.7699 455.054 3.78689 689.801C4.92572 952.674 6.07836 1218.73 7.19722 1477"
      stroke="black"
      strokeLinejoin="round"
    >
      <animate
        attributeName="d"
        restart="whenNotActive"
        values="M0.802856 1.00427C1.76393 222.848 2.7699 455.054 3.78689 689.801C4.92572 952.674 6.07836 1218.73 7.19722 1477;
        M213.901 0.381577C334.92 189.745 -140.146 158.225 103.657 366.446C347.46 574.666 155.405 634.804 155.405 634.804C154.378 634.605 -124.719 767.63 77.4382 877.998C279.596 988.365 -132.96 1023.4 219.202 1163.79;
        M0.802856 1.00427C1.76393 222.848 2.7699 455.054 3.78689 689.801C4.92572 952.674 6.07836 1218.73 7.19722 1477;
        M81.9006 0.382159C81.9006 204.001 23.4045 324 23.4046 416C23.4048 508 49 616 49 616C47.9726 615.801 81.9006 800 23.4047 928C-35.0912 1056 56 1088 87.2021 1163.79;
        M0.802856 1.00427C1.76393 222.848 2.7699 455.054 3.78689 689.801C4.92572 952.674 6.07836 1218.73 7.19722 1477;
        "
        dur="1.5s"
      />
      <animate
        attributeName="height"
        restart="whenNotActive"
        values="35px;77px;77px;35px;35px"
        dur="3.5s"
      />
    </path>
  </svg>
);

export default MoveRope;
