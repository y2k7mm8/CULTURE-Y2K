import { useEffect, useRef, useState } from "react";
import introVideo from "../assets/music/intro.mp4";

interface SplashIntroProps {
  onComplete: () => void;
}

export function SplashIntro({ onComplete }: SplashIntroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      onComplete();
      return;
    }

    // Handle video end
    const handleVideoEnd = () => {
      setFadeOut(true);
      setTimeout(() => {
        onComplete();
      }, 300);
    };

    // Handle video error
    const handleError = () => {
      setFadeOut(true);
      setTimeout(onComplete, 300);
    };

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("error", handleError);

    // Set video source
    video.src = introVideo;
    video.muted = false;
    video.volume = 0.5;

    // Auto-play video
    video.play().catch(() => {
      // If video fails to play, just skip to main app
      setFadeOut(true);
      setTimeout(onComplete, 300);
    });

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("error", handleError);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Video */}
      <video
        ref={videoRef}
        playsInline
        className="h-full w-full object-cover block"
      />

      {/* Skip Button - always visible */}
      {!fadeOut && (
        <button
          onClick={() => {
            setFadeOut(true);
            setTimeout(() => onComplete(), 300);
          }}
          className="absolute bottom-6 right-6 z-10 rounded-full border border-cyan-300/50 bg-cyan-500/20 px-6 py-2 text-sm uppercase tracking-[0.2em] text-cyan-200 transition hover:bg-cyan-500/30 hover:border-cyan-300"
        >
          Skip Intro
        </button>
      )}
    </div>
  );
}
