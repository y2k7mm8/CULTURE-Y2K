import React, { useState } from "react";

interface GlitchEffectProps {
  children: React.ReactNode;
}

export const GlitchEffect: React.FC<GlitchEffectProps> = ({ children }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "g") {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return <div className={isGlitching ? "animate-glitch" : ""}>{children}</div>;
};
