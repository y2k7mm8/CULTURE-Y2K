import { useEffect } from "react";

interface FrutigerAeroBubblesProps {
  count?: number;
  className?: string;
}

export function FrutigerAeroBubbles({ count = 8, className = "" }: FrutigerAeroBubblesProps) {
  useEffect(() => {
    const bubbles = document.querySelectorAll('.frutiger-aero-bubble-anim');
    bubbles.forEach((bubble, index) => {
      const element = bubble as HTMLElement;
      element.style.left = `${Math.random() * 90}%`;
      element.style.top = `${Math.random() * 90}%`;
      element.style.animationDelay = `${index * 0.5}s`;
      element.style.width = `${20 + Math.random() * 30}px`;
      element.style.height = element.style.width;
    });
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="frutiger-aero-bubble-anim absolute rounded-full frutiger-aero-float"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(135,206,235,0.4), rgba(30,136,229,0.2))',
            boxShadow: '0 4px 12px rgba(135,206,235,0.3), inset 0 2px 4px rgba(255,255,255,0.5)',
          }}
        />
      ))}
    </div>
  );
}