import React from "react";

interface CRTEffectProps {
  enabled: boolean;
}

export const CRTEffect: React.FC<CRTEffectProps> = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.15) 0px,
              rgba(0, 0, 0, 0.15) 1px,
              transparent 1px,
              transparent 2px
            )
          `,
          animation: "crt-flicker 0.15s infinite",
        }}
      />
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse at center,
              rgba(255, 255, 255, 0) 0%,
              rgba(0, 0, 0, 0.3) 100%
            )
          `,
        }}
      />
    </>
  );
};
