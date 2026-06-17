import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface MatrixRainProps {
  isActive: boolean;
  onClose: () => void;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ isActive, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const columnsRef = useRef<number[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isActive) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    columnsRef.current = Array(columns).fill(1);

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      columnsRef.current.forEach((y, index) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = index * fontSize;

        // Add some variation in color
        if (Math.random() > 0.95) {
          ctx.fillStyle = "#fff";
        } else {
          ctx.fillStyle = "#0f0";
        }

        ctx.fillText(char, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          columnsRef.current[index] = 0;
        }
        columnsRef.current[index] += 1;
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const newColumns = Math.floor(canvas.width / fontSize);
      columnsRef.current = Array(newColumns).fill(1);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isActive) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isActive, onClose]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="fixed top-4 right-4 text-green-500 font-mono text-xs bg-black/80 p-2 border border-green-500">
        Press ESC to exit
      </div>
    </div>
  );
};