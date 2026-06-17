import React from "react";

interface Y2KCardProps {
  title: string;
  subtitle?: string;
  image?: string;
  icon?: string;
  description?: string;
  tags?: string[];
  glowColor?: "cyan" | "pink" | "lime" | "purple";
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Y2KCard: React.FC<Y2KCardProps> = ({
  title,
  subtitle,
  image,
  icon,
  description,
  tags = [],
  glowColor = "cyan",
  interactive = true,
  onClick,
  className = "",
  children,
}) => {
  const glowClasses = {
    cyan: "shadow-glow-cyan hover:shadow-glow-cyan-lg",
    pink: "shadow-glow-pink hover:shadow-glow-pink-lg",
    lime: "shadow-glow-lime",
    purple: "shadow-glow-purple",
  };

  return (
    <div
      onClick={onClick}
      className={[
        "y2k-shell relative overflow-hidden rounded-[28px] p-6 border border-y2k-cyan/25 transition-all duration-300 group",
        interactive ? "cursor-pointer hover:-translate-y-2" : "",
        glowClasses[glowColor],
        className,
      ].join(" ")}
    >
      {/* Background glow layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-y2k-cyan/5 via-transparent to-y2k-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Icon/Image section */}
        {image && (
          <div className="mb-5 overflow-hidden rounded-[20px] border border-y2k-cyan/30 h-48 relative group/image">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}

        {icon && (
          <div className="mb-4 text-5xl transform transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        )}

        {/* Title section */}
        <div className="mb-3">
          <h3 className="window-title text-2xl text-y2k-white mb-1 leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-y2k-cyan/70 uppercase tracking-widest">
              {subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-y2k-white/70 leading-relaxed mb-4">
            {description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-full bg-y2k-cyan/10 border border-y2k-cyan/30 text-y2k-cyan/80 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Children content */}
        {children && <div>{children}</div>}
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-3 right-3 text-xl text-y2k-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        ◆
      </div>
      <div className="absolute bottom-3 left-3 text-xl text-y2k-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        ◆
      </div>

      {/* Interactive hover effect */}
      {interactive && (
        <div className="absolute inset-0 border-2 border-y2k-cyan/0 group-hover:border-y2k-cyan/30 rounded-[28px] transition-all duration-300 pointer-events-none"></div>
      )}
    </div>
  );
};

/**
 * Floating Card Variant
 */
interface Y2KFloatingCardProps extends Y2KCardProps {
  floatDelay?: number;
}

export const Y2KFloatingCard: React.FC<Y2KFloatingCardProps> = ({
  floatDelay = 0,
  ...props
}) => {
  return (
    <div
      style={{
        animation: `bubble-float 4s ease-in-out infinite`,
        animationDelay: `${floatDelay}s`,
      }}
    >
      <Y2KCard {...props} />
    </div>
  );
};

/**
 * Compact Card Variant for lists
 */
export const Y2KCompactCard: React.FC<Y2KCardProps> = (props) => (
  <Y2KCard {...props} className="p-4 rounded-[20px]" />
);
