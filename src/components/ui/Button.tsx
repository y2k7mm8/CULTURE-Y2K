import React from "react";

interface Y2KButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  glitch?: boolean;
}

export const Y2KButton = React.forwardRef<HTMLButtonElement, Y2KButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      glitch = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    const variantClasses = {
      primary:
        "bg-cyan-400/20 hover:bg-cyan-400/30 border-cyan-300/50 text-cyan-200",
      secondary:
        "bg-purple-400/20 hover:bg-purple-400/30 border-purple-300/50 text-purple-200",
      danger:
        "bg-pink-400/20 hover:bg-pink-400/30 border-pink-300/50 text-pink-200",
      success:
        "bg-lime-400/20 hover:bg-lime-400/30 border-lime-300/50 text-lime-200",
    };

    const sizeClasses = {
      sm: "px-2 py-1 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={`
          y2k-button rounded-full border uppercase tracking-wide
          transition-all duration-200 cursor-pointer
          active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${glitch ? "animate-glitch" : ""}
          ${className}
        `}
        {...props}
      />
    );
  },
);

Y2KButton.displayName = "Y2KButton";
