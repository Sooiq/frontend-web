// src/components/ui/Logo.tsx
import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 120, className = "" }) => {
  return (
    <img
      src="/sooiq.svg"
      alt="Sooiq Logo"
      width={size}
      height={size}
      className={`filter drop-shadow-lg ${className}`}
      style={{ aspectRatio: "287 / 512" }}
    />
  );
};

export default Logo;
