import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import tvImg from "../assets/img/tv.png";
import techImg from "../assets/img/tech.png";
import introVideo from "../assets/music/intro.mp4";

interface Track {
  artistKey: string;
  titleKey: string;
  mood: string;
  year: number;
}

export default function Music() {
  const { t } = useTranslation();

  const tracks: Track[] = [
    {
      artistKey: "Britney mode",
      titleKey: "Gloss + drama",
      mood: "pop",
      year: 2000,
    },
    {
      artistKey: "Club circuit",
      titleKey: "Chrome night",
      mood: "dance",
      year: 2004,
    },
    {
      artistKey: "Teen signal",
      titleKey: "Emo static",
      mood: "emo",
      year: 2006,
    },
    { artistKey: "Street loop", titleKey: "R&B blur", mood: "rnb", year: 2003 },
  ];

  const moodKeys = ["all", "pop", "dance", "emo", "rnb"];

  const [mood, setMood] = useState("all");
  const [playingPreview, setPlayingPreview] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const filtered = useMemo(() => {
    if (mood === "all") return tracks;
    return tracks.filter((track) => track.mood === mood);
  }, [mood]);

  // Derive the selected track from the filtered list and the selected index
  const validIndex = Math.max(0, Math.min(selectedIndex, filtered.length - 1));
  const selectedTrack = filtered[validIndex] ?? tracks[0];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (playingPreview) {
      // assign src lazily to avoid fetching heavy video until needed
      if (!video.src) {
        video.src = introVideo;
        video.crossOrigin = "anonymous";
        video.load();
      }
      // Small delay to ensure video is loaded before playing
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Video play error:", error);
          setPlayingPreview(false);
        });
      }
    } else {
      video.pause();
      // optionally release video resource when not playing
      try {
        // detach src to allow browser to free memory
        video.removeAttribute("src");
        // load empty state
        // @ts-ignore
        video.load?.();
      } catch {
        // ignore
      }
    }
  }, [playingPreview]);

  return (
    <div className="space-y-5">
      <section className="y2k-shell rounded-[32px] p-5 md:p-6">
        <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="chrome-panel rounded-[28px] p-6">
              <p className="micro-label mb-3">{t("music.label")}</p>
              <h1 className="window-title text-4xl text-white md:text-5xl">
                {t("music.title")}{" "}
                <span className="chroma-text">{t("music.titleHighlight")}</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/70">
                {t("music.description")}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {moodKeys.map((item) => (
                  <button
                    key={item}
                    onClick={() => setMood(item)}
                    className={`y2k-button rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.24em] ${
                      mood === item
                        ? "border-pink-300/50 bg-pink-300/10 text-pink-100"
                        : "text-white/78"
                    }`}
                  >
                    {t(`music.moods.${item}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((track, idx) => (
                <button
                  key={track.titleKey}
                  onClick={() => setSelectedIndex(idx)}
                  className={`chrome-panel rounded-[24px] p-5 text-left transition hover:-translate-y-0.5 ${
                    selectedTrack.titleKey === track.titleKey
                      ? "border-cyan-300/50"
                      : ""
                  }`}
                >
                  <p className="micro-label mb-2">{track.year}</p>
                  <h3 className="window-title text-2xl text-white">
                    {track.titleKey}
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.22em] text-cyan-200">
                    {track.artistKey}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/66">
                    {t("music.curated")}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="chrome-panel rounded-[28px] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="micro-label mb-2">{t("music.mediaPreview")}</p>
                  <h2 className="window-title text-2xl text-white">
                    {t("music.chromePlayer")}
                  </h2>
                </div>
                <button
                  onClick={() => setPlayingPreview((prev) => !prev)}
                  className="y2k-button rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white"
                >
                  {playingPreview
                    ? t("music.pausePreview")
                    : t("music.playPreview")}
                </button>
              </div>
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="none"
                className="h-72 w-full rounded-[22px] object-cover bg-black/50"
                style={{ display: "block" }}
              />
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <img
                  loading="lazy"
                  src={tvImg}
                  alt="music collage"
                  className="h-40 w-full rounded-[20px] object-cover"
                />
                <img
                  loading="lazy"
                  src={techImg}
                  alt="tech collage"
                  className="h-40 w-full rounded-[20px] object-cover"
                />
              </div>
            </div>

            <div className="chrome-panel rounded-[26px] p-5">
              <p className="micro-label mb-2">{t("music.selectedNote")}</p>
              <h3 className="window-title text-3xl text-white">
                {selectedTrack.titleKey}
              </h3>
              <p className="mt-3 text-sm uppercase tracking-[0.22em] text-pink-200">
                {selectedTrack.artistKey}
              </p>
              <p className="mt-4 text-sm leading-7 text-white/70">
                {t("music.about")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
