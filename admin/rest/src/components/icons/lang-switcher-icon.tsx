import React from 'react';
export const LangSwitcherIcon: React.FC<React.SVGAttributes<{}>> = ({
  color = 'currentColor',
  width = '14px',
  height = '10px',
  ...props
}) => (
  <svg
    width={width}
    height={height}
    fill="none"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M.6 1.845a.91.91 0 0 1 1.613-.6l4.772 5.571 4.771-5.57a.91.91 0 1 1 1.378 1.182L7.677 8.806a.91.91 0 0 1-1.385 0L.83 2.428a.91.91 0 0 1-.23-.583Z"
      fill={color}
    />
  </svg>
);
