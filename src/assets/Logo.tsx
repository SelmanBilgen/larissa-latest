import React from "react";

const BereketLarissaLogo: React.FC = () => (
  <svg
    width="200"
    height="100"
    viewBox="0 0 200 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Chef's hat */}
    <path
      d="M40 40 Q30 30, 50 20 Q70 30, 60 40 Z"
      fill="#FFFFFF"
      stroke="#000000"
      strokeWidth="2"
    />
    {/* Adana kebab icon */}
    <rect
      x="120"
      y="40"
      width="40"
      height="10"
      fill="#D2691E"
      stroke="#000000"
      strokeWidth="1"
    />
    <circle cx="125" cy="35" r="3" fill="#228B22" />
    <circle cx="145" cy="35" r="3" fill="#228B22" />
    <circle cx="165" cy="35" r="3" fill="#228B22" />
    {/* Restaurant name */}
    <text x="40" y="90" fill="#8B0000" fontSize="20" fontFamily="Arial">
      Bereket Larissa
    </text>
  </svg>
);

export default BereketLarissaLogo;
