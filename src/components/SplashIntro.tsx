import { useEffect, useRef, useState } from "react";
import introVideo from "../assets/music/intro.mp4";

interface SplashIntroProps {
  onComplete: () => void;
}

export function SplashIntro({ onComplete }: SplashIntroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isSkippable, setIsSkippable] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    console.log("SplashIntro mounted, video source:", introVideo);
    const video = videoRef.current;
    if (!video) {
      console.error("Video ref is null");
      return;
    }

    // Enable skip button after 2 seconds
    const skipTimeout = setTimeout(() => {
      console.log("Skip button enabled");
      setIsSkippable(true);
    }, 2000);

    // Handle video end with fade out
    const handleVideoEnd = () => {
      console.log("Video ended");
      setFadeOut(true);
      // Wait for fade transition before completing
      setTimeout(() => {
        console.log("Intro complete - transitioning to main app");
        onComplete();
      }, 300);
    };

    // Handle video error
    const handleError = (e: Event) => {
      console.error("Video playback error:", e);
      setFadeOut(true);
      setTimeout(onComplete, 300);
    };

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("error", handleError);

    // Configure video
    video.src = introVideo;
    video.muted = false; // Enable audio
    video.crossOrigin = "anonymous";
    video.volume = 0.8; // Set volume to 80%

    console.log("Video configured:", {
      src: video.src,
      muted: video.muted,
      volume: video.volume,
    });

    // Auto-play video
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => console.log("Video playing"))
        .catch((error) => {
          console.error("Video play error:", error);
          setFadeOut(true);
          setTimeout(onComplete, 300);
        });
    }

    return () => {
      clearTimeout(skipTimeout);
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("error", handleError);
    };
  }, [onComplete]);

  const handleSkip = () => {
    console.log("User skipped intro");
    setFadeOut(true);
    setTimeout(onComplete, 300);
  };

  console.log("SplashIntro render:", { isSkippable, fadeOut });

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="h-full w-full object-cover"
        crossOrigin="anonymous"
      />

      {/* Skip Button - appears after 2 seconds */}
      {isSkippable && !fadeOut && (
        <button
          onClick={handleSkip}
          className="absolute bottom-6 right-6 z-10 rounded-full border border-cyan-300/50 bg-cyan-500/20 px-6 py-2 text-sm uppercase tracking-[0.2em] text-cyan-200 transition hover:bg-cyan-500/30 hover:border-cyan-300"
        >
          Skip Intro
        </button>
      )}
    </div>
  );
}
