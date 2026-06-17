import React from "react";

interface Y2KButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "neon" | "chrome" | "glass" | "holographic";
  size?: "sm" | "md" | "lg";
  glowEffect?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Y2KButton: React.FC<Y2KButtonProps> = ({
  variant = "primary",
  size = "md",
  glowEffect = true,
  fullWidth = false,
  className = "",
  children,
  ...props
}) => {
  const baseClasses =
    "relative overflow-hidden font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer user-select-none";

  const variantClasses = {
    primary:
      "y2k-button border-y2k-cyan/30 text-y2k-white/88 hover:border-y2k-cyan/60 hover:shadow-glow-cyan",
    neon: "border-2 border-y2k-cyan bg-gradient-to-r from-y2k-cyan/20 to-y2k-pink/20 text-y2k-cyan font-black hover:from-y2k-cyan/30 hover:to-y2k-pink/30 hover:shadow-glow-cyan",
    chrome: "chrome-button border-y2k-silver text-black hover:shadow-lg",
    glass:
      "glass-panel-strong border-y2k-cyan/40 text-y2k-white/90 hover:border-y2k-cyan/70 hover:shadow-glass-lg",
    holographic:
      "bg-gradient-to-r from-y2k-cyan/40 via-y2k-pink/40 to-y2k-purple/40 border border-y2k-cyan/50 text-y2k-white font-black hover:shadow-glow-cyan animate-holographic",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-xs rounded-lg",
    md: "px-5 py-3 text-sm rounded-xl",
    lg: "px-7 py-4 text-base rounded-2xl",
  };

  const finalClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  return (
    <button className={finalClasses} {...props}>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Shimmer effect for all variants */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-y2k-white/20 to-transparent translate-x-full hover:translate-x-0 transition-transform duration-500 pointer-events-none"></div>

      {/* Glow effect for neon variants */}
      {(variant === "neon" || variant === "holographic") && glowEffect && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-radial-gradient animate-pulse"></div>
        </div>
      )}
    </button>
  );
};

/**
 * Specialized button variants for Y2K design
 */

export const Y2KNeonButton: React.FC<Omit<Y2KButtonProps, "variant">> = (
  props,
) => <Y2KButton variant="neon" {...props} />;

export const Y2KChromeButton: React.FC<Omit<Y2KButtonProps, "variant">> = (
  props,
) => <Y2KButton variant="chrome" {...props} />;

export const Y2KGlassButton: React.FC<Omit<Y2KButtonProps, "variant">> = (
  props,
) => <Y2KButton variant="glass" {...props} />;

export const Y2KHolographicButton: React.FC<Omit<Y2KButtonProps, "variant">> = (
  props,
) => <Y2KButton variant="holographic" {...props} />;
