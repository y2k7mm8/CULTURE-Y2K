import React from "react";

interface RetroGamingBadgeProps {
  label: string;
  icon?: string;
  type?: "achievement" | "level" | "star" | "combo" | "status";
  color?: "cyan" | "pink" | "lime" | "purple" | "gold";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  onClick?: () => void;
}

export const RetroGamingBadge: React.FC<RetroGamingBadgeProps> = ({
  label,
  icon,
  type = "status",
  color = "cyan",
  size = "md",
  animated = true,
  onClick,
}) => {
  const colorClasses = {
    cyan: "border-y2k-cyan/60 bg-y2k-cyan/15 text-y2k-cyan shadow-glow-cyan",
    pink: "border-y2k-pink/60 bg-y2k-pink/15 text-y2k-pink shadow-glow-pink",
    lime: "border-y2k-lime/60 bg-y2k-lime/15 text-y2k-lime shadow-glow-lime",
    purple:
      "border-y2k-purple/60 bg-y2k-purple/15 text-y2k-purple shadow-glow-purple",
    gold: "border-yellow-400/60 bg-yellow-400/15 text-yellow-300 shadow-glow-lime",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
  };

  const typeEmoji = {
    achievement: "🏆",
    level: "⬆️",
    star: "⭐",
    combo: "🔥",
    status: "✨",
  };

  return (
    <div
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 border-2 rounded-lg px-3 py-2 font-bold uppercase tracking-wider cursor-pointer transition-all duration-300 relative overflow-hidden",
        colorClasses[color],
        sizeClasses[size],
        "hover:scale-105 hover:shadow-lg",
        animated ? "animate-pulse" : "",
      ].join(" ")}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full hover:translate-x-0 transition-transform duration-500 pointer-events-none"></div>

      {icon || typeEmoji[type]}
      <span className="relative z-10">{label}</span>
    </div>
  );
};

/**
 * Pixel Art Decoration - 8-bit style decorative elements
 */
interface PixelArtProps {
  type: "heart" | "star" | "diamond" | "bubble" | "flower";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

export const PixelArt: React.FC<PixelArtProps> = ({
  type,
  size = "md",
  animated = true,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  // Simple pixel art representations using Unicode and CSS
  const pixelArts = {
    heart: "❤️",
    star: "⭐",
    diamond: "💎",
    bubble: "⬤",
    flower: "✿",
  };

  return (
    <div
      className={[
        sizeClasses[size],
        "inline-flex items-center justify-center text-center",
        animated ? "animate-float" : "",
        className,
      ].join(" ")}
    >
      {pixelArts[type]}
    </div>
  );
};

/**
 * Retro Game Stats Display
 */
interface RetroGameStatsProps {
  stats: { label: string; value: string | number }[];
  title?: string;
}

export const RetroGameStats: React.FC<RetroGameStatsProps> = ({
  stats,
  title,
}) => {
  return (
    <div className="y2k-shell rounded-[20px] p-4 border border-y2k-cyan/30">
      {title && (
        <h4 className="window-title text-lg mb-3 text-y2k-cyan uppercase tracking-wider">
          {title}
        </h4>
      )}
      <div className="space-y-2">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-1 px-2 rounded border border-y2k-cyan/20 bg-y2k-cyan/5 text-sm"
          >
            <span className="text-y2k-cyan/70 uppercase tracking-wider">
              {stat.label}
            </span>
            <span className="font-bold text-y2k-cyan">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Anime/Cute Mascot Frame
 */
interface MascotFrameProps {
  emoji?: string;
  name?: string;
  description?: string;
  glowColor?: "cyan" | "pink" | "lime";
}

export const MascotFrame: React.FC<MascotFrameProps> = ({
  emoji = "✨",
  name,
  description,
  glowColor = "cyan",
}) => {
  const glowClasses = {
    cyan: "shadow-glow-cyan border-y2k-cyan/40",
    pink: "shadow-glow-pink border-y2k-pink/40",
    lime: "shadow-glow-lime border-y2k-lime/40",
  };

  return (
    <div
      className={[
        "y2k-shell rounded-[28px] p-6 border relative overflow-hidden text-center",
        glowClasses[glowColor],
      ].join(" ")}
    >
      <div className="relative z-10">
        <div className="text-6xl mb-3 animate-bounce">{emoji}</div>
        {name && (
          <h4 className="window-title text-xl mb-2 text-y2k-white">{name}</h4>
        )}
        {description && (
          <p className="text-sm text-y2k-white/70 leading-5">{description}</p>
        )}
      </div>

      {/* Cute decorative corners */}
      <div className="absolute top-2 left-2 text-2xl opacity-30">✿</div>
      <div className="absolute bottom-2 right-2 text-2xl opacity-30">✿</div>
    </div>
  );
};
