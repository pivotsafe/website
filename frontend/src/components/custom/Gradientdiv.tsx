"use client";
import React, { ReactNode, useCallback } from "react";

const GradientPosition = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const updateMousePosition = useCallback((ev: MouseEvent) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  }, [setMousePosition]);

  React.useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [updateMousePosition]);

  return mousePosition;
};

interface GradientdivProps {
  children?: ReactNode;
  className: string;
}
const Gradientdiv: React.FC<GradientdivProps> = ({ children, className }) => {
  return (
    <div
      style={{
        backgroundImage: `radial-gradient( circle at ${
          GradientPosition().x
        }px ${GradientPosition().y}px, #fd6e1e  , #0f0f0f 20% )`,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Gradientdiv;
