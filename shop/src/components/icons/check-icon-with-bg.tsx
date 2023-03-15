const CheckIconWithBg: React.FC<React.SVGAttributes<{}>> = ({
  width = 20,
  height = 20,
  ...props
}) => {
  return (
    // <svg
    //   width={width}
    //   height={height}
    //   viewBox="0 0 24 24"
    //   fill="none"
    //   stroke="currentColor"
    //   {...props}
    // >
    //   <path
    //     d="M20 6L9 17L4 12"
    //     strokeWidth="2"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    // </svg>
    <svg
      width={width}
      height={height}
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0Zm5.589 7.368L9.198 13.71a.983.983 0 0 1-1.378.025l-3.384-3.082a1.016 1.016 0 0 1-.075-1.404.992.992 0 0 1 1.403-.05l2.682 2.456L14.16 5.94a.999.999 0 0 1 1.429 0 .999.999 0 0 1 0 1.428Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CheckIconWithBg;
