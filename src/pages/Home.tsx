import React, { useMemo, useState, useRef, useEffect } from "react";
import CursorTrail from "../components/CursorTrail";
import Sidebar from "../components/Sidebar";

type Tile = {
  id: string;
  title: string;
  img: string;
  href?: string;
};

const clampTitle = (t: string) => t.toUpperCase();

function WindowTile({
  title,
  img,
  onClick,
  large = false,
}: {
  title: string;
  img: string;
  onClick?: () => void;
  large?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-2xl border border-white/25 bg-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(0,0,0,0.45)] active:translate-y-0"
      type="button"
    >
      <div className="flex items-center justify-between border-b border-white/20 bg-linear-to-b from-white/30 to-white/10 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-white/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/35" />
        </div>

        <div className="flex items-center gap-1">
          <span className="h-4 w-4 rounded-md border border-white/25 bg-white/20" />
          <span className="h-4 w-4 rounded-md border border-white/25 bg-white/20" />
          <span className="h-4 w-4 rounded-md border border-white/25 bg-white/20" />
        </div>
      </div>

      <div className={`relative ${large ? "h-56" : "h-40"}`}>
        <img
          src={img}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/12 to-transparent" />

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <div className="glass rounded-full px-4 py-1 text-[11px] tracking-[0.18em] text-white/95 shadow-md neon-accent">
            {clampTitle(title)}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-white/15 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}

function Player() {
  const tracks = [
    {
      artist: "Britney Spears",
      title: "Baby One More Time",
      src: "../src/assets/music/Britney Spears - Baby One More Time (Remastered).mp3",
    },
    {
      artist: "Sample Artist",
      title: "Sample Track 2",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
  ];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    a.src = tracks[index].src;
    a.loop = loop;

    const onLoaded = () => setDuration(a.duration || 0);
    const onTime = () => setTime(a.currentTime || 0);
    const onEnd = () => setPlaying(false);

    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);

    if (playing) {
      a.play().catch(() => setPlaying(false));
    } else {
      a.pause();
    }

    return () => {
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, [index, playing, loop]);

  const togglePlay = () => setPlaying((p) => !p);

  const stop = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setPlaying(false);
  };

  const prev = () => {
    setIndex((i) => (i - 1 + tracks.length) % tracks.length);
    setPlaying(true);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = pct * (duration || 0);
    setTime(a.currentTime);
  };

  const pct = duration ? Math.min(100, (time / duration) * 100) : 0;

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${pct}%`;
    }
  }, [pct]);

  return (
    <>
      <audio ref={audioRef} />
      <div className="glass mx-auto mt-6 w-full max-w-220 rounded-[20px] p-0 shadow-[0_14px_45px_rgba(0,0,0,0.42)]">
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[12px] tracking-[0.22em] text-white/85">
                {tracks[index].artist}
              </div>
              <div className="text-[22px] font-semibold leading-none tracking-[0.08em] text-white">
                {tracks[index].title}
              </div>
            </div>

            <div className="flex items-end gap-1">
              <div className="h-4 w-2 rounded-sm bg-white/70" />
              <div className="h-7 w-2 rounded-sm bg-white/80" />
              <div className="h-3 w-2 rounded-sm bg-white/60" />
              <div className="h-6 w-2 rounded-sm bg-white/75" />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-6 gap-2">
            <button
              onClick={prev}
              className="y2k-btn h-9 rounded-lg border border-white/20 bg-white/8 text-white/90 shadow-sm hover:bg-white/14 active:bg-white/8"
            >
              ◀◀
            </button>

            <button
              onClick={() => {
                const a = audioRef.current;
                if (a) {
                  a.currentTime = Math.max(0, (a.currentTime || 0) - 10);
                }
              }}
              className="y2k-btn h-9 rounded-lg border border-white/20 bg-white/8 text-white/90 shadow-sm hover:bg-white/14 active:bg-white/8"
            >
              ◀ 10 s
            </button>

            <button
              onClick={togglePlay}
              className="y2k-btn h-9 rounded-lg border border-white/20 bg-white/8 text-white/90 shadow-sm hover:bg-white/14 active:bg-white/8"
            >
              {playing ? "⏸" : "▶"}
            </button>

            <button
              onClick={stop}
              className="y2k-btn h-9 rounded-lg border border-white/20 bg-white/8 text-white/90 shadow-sm hover:bg-white/14 active:bg-white/8"
            >
              ■
            </button>

            <button
              onClick={() => {
                const a = audioRef.current;
                if (a) {
                  a.currentTime = Math.min(
                    a.duration || 0,
                    (a.currentTime || 0) + 10,
                  );
                }
              }}
              className="y2k-btn h-9 rounded-lg border border-white/20 bg-white/8 text-white/90 shadow-sm hover:bg-white/14 active:bg-white/8"
            >
              10 s ▶
            </button>

            <button
              onClick={() => setLoop((l) => !l)}
              className={`y2k-btn h-9 rounded-lg border border-white/20 ${
                loop ? "bg-white/20" : "bg-white/8"
              } text-white/90 shadow-sm hover:bg-white/14 active:bg-white/8`}
            >
              ♫
            </button>
          </div>

          <div className="mt-4">
            <div
              onClick={seek}
              className="h-2 w-full cursor-pointer overflow-hidden rounded-full bg-white/15"
            >
              <div
                ref={progressRef}
                className="h-full rounded-full bg-white/70"
              />
            </div>
            <div className="mt-2 text-[12px] text-white/75">
              {Math.floor(time)} / {Math.floor(duration)}s
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ThemedWindow({
  id,
  title,
  index = 0,
  onClose,
  items = [],
}: {
  id: string;
  title: string;
  index?: number;
  onClose: () => void;
  items?: string[];
}) {
  const offset = index * 28;
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const el = rootRef.current;
    el.style.left = `${48 + offset}px`;
    el.style.top = `${48 + offset}px`;
    el.style.width = `360px`;
    el.style.zIndex = String(100 + index);
  }, [offset, index]);

  return (
    <div ref={rootRef} className="glass absolute rounded-xl p-4 shadow-xl">
      <div className="mb-2 flex items-center justify-between border-b border-white/20 pb-2">
        <div>
          <div className="text-[10px] tracking-[0.18em] text-white/80">
            {title}
          </div>
          <div className="font-semibold text-white">{id.toUpperCase()}</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="h-7 w-7 rounded bg-white/8 text-white"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="text-sm text-white/90">
        {items.length ? (
          <ul className="space-y-1">
            {items.map((it, i) => (
              <li key={i} className="rounded bg-white/5 px-2 py-1">
                {it}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-white/60">No content for this theme yet.</div>
        )}
      </div>
    </div>
  );
}

const Home: React.FC = () => {
  const tiles: Tile[] = useMemo(
    () => [
      { id: "y2k", title: "Y2K STYLE", img: "/src/assets/img/y2k.png" },
      { id: "tech", title: "TECH 2000", img: "/src/assets/img/tech.png" },
      { id: "web", title: "WEB MEMORIES", img: "/src/assets/img/web.png" },
      { id: "tv", title: "TV & MOVIES", img: "/src/assets/img/tv.png" },
      { id: "icons", title: "ICONS & STARS", img: "/src/assets/img/icons.png" },
      { id: "toys", title: "TOYS 2000", img: "/src/assets/img/toys.png" },
    ],
    [],
  );

  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [showIntro, setShowIntro] = useState(true);

  const introRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleIntroEnded = () => setShowIntro(false);

  const themeItems: Record<string, string[]> = {
    y2k: ["All About Us", "Generation", "Gear", "Books", "Board Game"],
    tech: ["Computers", "Websites", "Hardware", "Gadgets"],
    web: ["Archives", "Screenshots", "Web Rings"],
    tv: ["Shows", "Movies", "Trailers"],
    icons: ["Celebrities", "Design Icons", "Logos"],
    toys: ["Action Figures", "Collectibles", "Rarities"],
  };

  const openWindow = (id: string) => {
    setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((p) => p !== id));
  };

  const TILE_W = 260;
  const GAP = 16;
  const LARGE_H = 224;

  type Pos = { x: number; y: number; z: number; large: boolean };

  const [positions, setPositions] = useState<Record<string, Pos>>(() => {
    const map: Record<string, Pos> = {};
    tiles.forEach((t, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);

      map[t.id] = {
        x: col * (TILE_W + GAP),
        y: row * (LARGE_H + GAP),
        z: i,
        large: i < 3,
      };
    });
    return map;
  });

  const draggingRef = useRef<{
    id: string | null;
    offsetX: number;
    offsetY: number;
    pointerId: number | null;
  }>({
    id: null,
    offsetX: 0,
    offsetY: 0,
    pointerId: null,
  });

  const tileRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    Object.entries(positions).forEach(([id, pos]) => {
      const el = tileRefs.current[id];
      if (!el) return;
      el.style.position = "absolute";
      el.style.left = `${pos.x}px`;
      el.style.top = `${pos.y}px`;
      el.style.width = `${TILE_W}px`;
      el.style.zIndex = String(pos.z);
      el.style.touchAction = "none";
      el.style.cursor = "grab";
    });
  }, [positions]);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!draggingRef.current.id || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const id = draggingRef.current.id;

      const x = e.clientX - rect.left - draggingRef.current.offsetX;
      const y = e.clientY - rect.top - draggingRef.current.offsetY;

      setPositions((p) => ({
        ...p,
        [id]: { ...p[id], x: Math.max(0, x), y: Math.max(0, y) },
      }));
    };

    const handleUp = () => {
      draggingRef.current.id = null;
      draggingRef.current.pointerId = null;
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent, id: string) => {
    const node = containerRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const pos = positions[id];
    const offsetX = e.clientX - rect.left - pos.x;
    const offsetY = e.clientY - rect.top - pos.y;

    draggingRef.current = { id, offsetX, offsetY, pointerId: e.pointerId };

    setPositions((p) => {
      const maxZ = Math.max(...Object.values(p).map((v) => v.z));
      return { ...p, [id]: { ...p[id], z: maxZ + 1 } };
    });

    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden">
      {showIntro && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black">
          <video
            ref={introRef}
            className="h-full w-full object-cover"
            autoPlay
            playsInline
            muted
            onEnded={handleIntroEnded}
          >
            <source src="../src/assets/music/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div className="fixed inset-0 -z-10 bg-[url('/src/assets/img/bg.png')] bg-cover bg-center" />
      <div className="fixed inset-0 -z-10 bg-linear-to-b from-white/10 via-transparent to-black/25" />

      <div className="relative mx-auto px-4 py-10 max-w-7xl">
        <div className="flex items-start gap-6">
          <div className="w-65 shrink-0">
            <Sidebar />
          </div>

          <div className="main-panel min-w-0 flex-1 rounded-md p-6">
            <header className="mb-4">
              <h2 className="text-2xl font-bold neon-accent">All About 2000</h2>
            </header>

            <div
              ref={containerRef}
              className="relative h-180 w-full touch-none"
            >
              {tiles.map((t) => {
                const pos = positions[t.id];

                return (
                  <div
                    key={t.id}
                    ref={(el) => {
                      tileRefs.current[t.id] = el;
                    }}
                    onPointerDown={(e) => onPointerDown(e, t.id)}
                    className="absolute"
                  >
                    <WindowTile
                      title={t.title}
                      img={t.img}
                      large={pos.large}
                      onClick={() => openWindow(t.id)}
                    />
                  </div>
                );
              })}
            </div>

            <Player />

            {openWindows.map((id, i) => {
              const tile = tiles.find((tt) => tt.id === id);

              return (
                <ThemedWindow
                  key={id}
                  id={id}
                  title={tile?.title || id}
                  index={i}
                  items={themeItems[id] || []}
                  onClose={() => closeWindow(id)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <CursorTrail />
    </div>
  );
};

export default Home;
