import { useEffect, useMemo, useState } from "react";
import CursorTrail from "../components/CursorTrail";

interface Entry {
  id: number;
  era: string;
  year: number;
  title: string;
  image: string;
  alt: string;
  description: string;
  tag: string;
  details: string;
}

type Artifact = Entry & { foundAt: string; note: string };

const archiveEntries: Entry[] = [
  {
    id: 1,
    era: "early",
    year: 1997,
    title: "Tamagotchi — pocket pet",
    image: "/src/assets/img/tamagotchi.png",
    alt: "Tamagotchi",
    description:
      "Handheld digital pets were both toy and ritual. Feeding, cleaning and keeping them alive required attention — and they encouraged shared obsession with small, personal devices.",
    tag: "ritual toy",
    details:
      "A tiny object with emotional persistence: it needed care, time, and routine. Digital intimacy before social media.",
  },
  {
    id: 2,
    era: "mid",
    year: 2004,
    title: "Arcade Cabinet — high-score culture",
    image: "/src/assets/img/underground/gamepad.png",
    alt: "Arcade Cabinet",
    description:
      "Whether physical or virtual, arcade-style games created short, repeatable challenges that encouraged competition and sharing of scores across pages and forums.",
    tag: "score chase",
    details:
      "High-score culture turned repetition into status. The score itself became social proof and forum currency.",
  },
  {
    id: 3,
    era: "late",
    year: 2008,
    title: "Flash Portal — browser chaos",
    image: "/src/assets/img/underground/gamepad.png",
    alt: "Flash Portal",
    description:
      "Game portals became visual overload machines: badges, preloaders, neon menus and fast loops of play that defined late browser-era culture.",
    tag: "portal energy",
    details:
      "These portals mixed clutter, velocity, personality and discovery into one ecosystem of endless clicking.",
  },
  {
    id: 4,
    era: "mid",
    year: 2005,
    title: "Mini Web Toy — experimental click loop",
    image: "/src/assets/img/underground/gamepad.png",
    alt: "Mini Web Toy",
    description:
      "Tiny browser interactions often had no real goal. They existed to surprise, loop, sparkle and be sent to friends.",
    tag: "micro fun",
    details:
      "Play did not always need progression. Sometimes the point was novelty, mood, and passing a link around.",
  },
];

const timelineItems = [
  {
    era: "early",
    label: "Late 1990s:",
    text: "Applets and early web toys appear in personal pages and hobby sites.",
  },
  {
    era: "early",
    label: "Early 2000s:",
    text: "Flash explodes with creative minigames, music players and interactive postcards.",
  },
  {
    era: "mid",
    label: "Mid 2000s:",
    text: "Shareable high-scores, small communities and handheld novelties like virtual pets.",
  },
  {
    era: "late",
    label: "Late 2000s:",
    text: "Browser standards shift, many experiments are lost or archived by enthusiasts.",
  },
];

const filters = [
  { key: "all", label: "All eras" },
  { key: "early", label: "Early" },
  { key: "mid", label: "Mid" },
  { key: "late", label: "Late" },
];

export default function Games() {
  const [activeEra, setActiveEra] = useState("all");
  const [artifact, setArtifact] = useState<Artifact | null>(null);
  const [highlightId, setHighlightId] = useState<number | null>(null);

  const [glitchOn, setGlitchOn] = useState(false);
  const [scanlinesOn, setScanlinesOn] = useState(true);
  const [sortMode, setSortMode] = useState("asc");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  const filteredEntries = useMemo(() => {
    if (activeEra === "all") return archiveEntries;
    return archiveEntries.filter((entry) => entry.era === activeEra);
  }, [activeEra]);

  const visibleEntries = useMemo(() => {
    const arr = [...filteredEntries];
    arr.sort((a, b) => {
      if (sortMode === "asc") return a.year - b.year;
      if (sortMode === "desc") return b.year - a.year;
      return a.title.localeCompare(b.title);
    });
    return arr;
  }, [filteredEntries, sortMode]);

  const visibleTimeline = useMemo(() => {
    if (activeEra === "all") return timelineItems;
    return timelineItems.filter((item) => item.era === activeEra);
  }, [activeEra]);

  const triggerArchivePulse = () => {
    const pool =
      activeEra === "all"
        ? archiveEntries
        : archiveEntries.filter((entry) => entry.era === activeEra);

    if (!pool.length) return;

    const randomItem = pool[Math.floor(Math.random() * pool.length)];

    setArtifact({
      ...randomItem,
      foundAt: new Date().toLocaleTimeString(),
      note:
        randomItem.era === "early"
          ? "Recovered from a hobby page mirror."
          : randomItem.era === "mid"
            ? "Pulled from a forum-era shared folder."
            : "Found in a late archive dump before deletion.",
    });

    setHighlightId(randomItem.id);
  };

  const toggleSaved = (id: number) => {
    setSavedIds((prev: number[]) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    if (!highlightId) return;
    const timer = setTimeout(() => setHighlightId(null), 1800);
    return () => clearTimeout(timer);
  }, [highlightId]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = (e.key || "").toLowerCase();

      if (key === "g") setGlitchOn((prev) => !prev);
      if (key === "s") setScanlinesOn((prev) => !prev);
      if (key === "r") triggerArchivePulse();
      if (key === "escape") setSelectedEntry(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeEra]);

  return (
    <section className="relative overflow-hidden bg-black px-6 py-8 text-white">
      <style>{`
        @keyframes glitchShiftA {
          0% { transform: translate(0, 0); opacity: 1; }
          20% { transform: translate(-2px, 1px); opacity: 0.85; }
          40% { transform: translate(2px, -1px); opacity: 0.65; }
          60% { transform: translate(-1px, 0); opacity: 0.9; }
          80% { transform: translate(2px, 1px); opacity: 0.7; }
          100% { transform: translate(0, 0); opacity: 1; }
        }

        @keyframes glitchShiftB {
          0% { transform: translate(0, 0); opacity: 0.9; }
          25% { transform: translate(2px, 0); opacity: 0.55; }
          50% { transform: translate(-2px, 1px); opacity: 0.8; }
          75% { transform: translate(1px, -1px); opacity: 0.5; }
          100% { transform: translate(0, 0); opacity: 0.9; }
        }

        @keyframes borderFlicker {
          0% { box-shadow: 0 0 0 rgba(255,255,255,0); }
          30% { box-shadow: 0 0 18px rgba(255, 0, 200, 0.12); }
          60% { box-shadow: 0 0 24px rgba(0, 255, 200, 0.12); }
          100% { box-shadow: 0 0 0 rgba(255,255,255,0); }
        }

        @keyframes noiseMove {
          0% { transform: translateY(-10%); }
          100% { transform: translateY(10%); }
        }

        .glitch-title {
          position: relative;
          display: inline-block;
        }

        .glitch-title::before,
        .glitch-title::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .glitch-title::before {
          color: rgba(255, 0, 200, 0.85);
          transform: translate(-2px, 0);
          animation: glitchShiftA 0.22s infinite linear alternate-reverse;
          mix-blend-mode: screen;
        }

        .glitch-title::after {
          color: rgba(0, 255, 200, 0.85);
          transform: translate(2px, 0);
          animation: glitchShiftB 0.18s infinite linear alternate-reverse;
          mix-blend-mode: screen;
        }

        .glitch-card {
          animation: borderFlicker 1.6s infinite;
        }

        .scanlines::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0.045) 0px,
            rgba(255,255,255,0.045) 1px,
            transparent 2px,
            transparent 4px
          );
          opacity: 0.18;
        }

        .noise::before {
          content: "";
          position: absolute;
          inset: -20%;
          pointer-events: none;
          background:
            linear-gradient(rgba(255,255,255,0.02), rgba(255,255,255,0.01)),
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.02) 0px,
              rgba(255,255,255,0.02) 1px,
              transparent 2px,
              transparent 3px
            );
          animation: noiseMove 0.12s infinite linear alternate;
          opacity: 0.14;
        }
      `}</style>

      <div
        className={`relative mx-auto max-w-225 border border-white/10 bg-black transition-all duration-300 ${
          glitchOn ? "glitch-card" : ""
        } ${scanlinesOn ? "scanlines" : ""} ${glitchOn ? "noise" : ""}`}
      >
        <div className="border-b border-white/10 bg-[linear-gradient(90deg,rgba(0,255,200,0.06),rgba(255,0,200,0.04),rgba(0,0,0,1))] px-6 py-4">
          <p className="text-[11px] uppercase tracking-[0.35em] text-pink-300">
            culture y2k / archive / games sector / 2000-2009
          </p>
        </div>

        <div className="p-6">
          <header className="mb-8">
            <h1
              data-text="Games & Browser Toys — a short history"
              className={`mb-3 text-4xl font-black uppercase tracking-[0.12em] text-white ${
                glitchOn ? "glitch-title" : ""
              }`}
            >
              Games & Browser Toys — a short history
            </h1>

            <p className="text-[15px] leading-7 text-white/75">
              Small interactive experiments shaped early web culture. From
              handheld pets to simple browser minigames, these pieces were
              gestures of play, sharing and technical curiosity.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveEra(filter.key)}
                  className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition ${
                    activeEra === filter.key
                      ? "border-cyan-300 bg-cyan-300/10 text-cyan-200"
                      : "border-white/15 bg-white/5 text-white/60 hover:border-pink-300/40 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}

              <button
                onClick={triggerArchivePulse}
                className="rounded-full border border-pink-400/40 bg-pink-400/10 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-pink-200 transition hover:bg-pink-400/20"
              >
                Find random artifact
              </button>

              <button
                onClick={() => setGlitchOn((prev) => !prev)}
                className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition ${
                  glitchOn
                    ? "border-pink-300 bg-pink-300/10 text-pink-200"
                    : "border-white/15 bg-white/5 text-white/60"
                }`}
              >
                Glitch: {glitchOn ? "on" : "off"}
              </button>

              <button
                onClick={() => setScanlinesOn((prev) => !prev)}
                className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition ${
                  scanlinesOn
                    ? "border-cyan-300 bg-cyan-300/10 text-cyan-200"
                    : "border-white/15 bg-white/5 text-white/60"
                }`}
              >
                Scanlines: {scanlinesOn ? "on" : "off"}
              </button>

              <select
                aria-label="Sort mode"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value)}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white outline-none"
              >
                <option value="asc">Year ↑</option>
                <option value="desc">Year ↓</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>

            {artifact && (
              <div className="mt-6 rounded-md border border-cyan-300/20 bg-cyan-300/5 p-4">
                <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-cyan-200">
                  Archive Pulse / recovered object
                </p>
                <h3 className="text-lg font-bold uppercase tracking-[0.06em] text-white">
                  {artifact.title}
                </h3>
                <p className="mt-2 text-white/70">
                  <span className="text-white/90">Year:</span> {artifact.year} ·{" "}
                  <span className="text-white/90">Tag:</span> {artifact.tag}
                </p>
                <p className="mt-2 text-white/70">{artifact.note}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/40">
                  scanned at {artifact.foundAt}
                </p>
              </div>
            )}
          </header>

          <section className="mb-8">
            <h2 className="mb-3 text-2xl font-bold uppercase tracking-[0.08em] text-white">
              Timeline
            </h2>
            <ol className="space-y-4 pl-4 text-white/70">
              {visibleTimeline.map((item, index) => (
                <li key={`${item.label}-${index}`}>
                  <strong>{item.label}</strong> {item.text}
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-2xl font-bold uppercase tracking-[0.08em] text-white">
              Featured entries
            </h2>

            <div className="mb-4 text-[11px] uppercase tracking-[0.22em] text-white/35">
              keys: G = glitch / S = scanlines / R = random / ESC = close modal
            </div>

            {visibleEntries.map((entry) => {
              const isSaved = savedIds.includes(entry.id);

              return (
                <article
                  key={entry.id}
                  className={`mb-6 rounded-md border p-4 transition-all duration-300 ${
                    highlightId === entry.id
                      ? "border-cyan-300/50 bg-cyan-300/10 scale-[1.01] shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                      : "border-white/8 bg-white/3"
                  }`}
                >
                  <div className="flex gap-4">
                    <img
                      src={entry.image}
                      alt={entry.alt}
                      className="h-28 w-28 shrink-0 rounded-md object-cover"
                      draggable={false}
                    />

                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="mb-1 text-[10px] uppercase tracking-[0.28em] text-pink-300/80">
                            {entry.year} / {entry.tag}
                          </p>
                          <h3 className="text-lg font-bold uppercase tracking-[0.06em] text-white">
                            {entry.title}
                          </h3>
                        </div>

                        <button
                          onClick={() => toggleSaved(entry.id)}
                          className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] transition ${
                            isSaved
                              ? "border-pink-300 bg-pink-300/10 text-pink-200"
                              : "border-white/15 bg-white/5 text-white/60"
                          }`}
                        >
                          {isSaved ? "Saved" : "Save"}
                        </button>
                      </div>

                      <p className="mt-2 text-white/70">{entry.description}</p>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          onClick={() => setSelectedEntry(entry)}
                          className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-cyan-200 transition hover:bg-cyan-300/20"
                        >
                          Open detail
                        </button>

                        <button
                          onClick={() => {
                            setHighlightId(entry.id);
                            setArtifact({
                              ...entry,
                              foundAt: new Date().toLocaleTimeString(),
                              note: "Pinned manually from the visible archive.",
                            });
                          }}
                          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
                        >
                          Pin artifact
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="mb-6 border-t border-white/10 pt-6">
            <h2 className="mb-3 text-2xl font-bold uppercase tracking-[0.08em] text-white">
              Contribute
            </h2>
            <p className="leading-7 text-white/70">
              If you have a lost toy, a copy of a flash file, or memories of a
              tiny game, share it and we&apos;ll add notes or an emulator link
              when possible.
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.2em] text-white/35">
              <span>saved items: {savedIds.length}</span>
              <span>active era: {activeEra}</span>
              <span>sort: {sortMode}</span>
            </div>
          </section>
        </div>

        <div className="border-t border-white/10 px-6 py-4 text-center text-white/40">
          arcade / flash / handheld / browser / minigame
        </div>
      </div>

      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-6">
          <div className="w-full max-w-170 rounded-md border border-white/10 bg-[#050505] p-6 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-pink-300/80">
                  {selectedEntry.year} / {selectedEntry.tag}
                </p>
                <h3 className="text-2xl font-black uppercase tracking-[0.08em]">
                  {selectedEntry.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedEntry(null)}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/65"
              >
                Close
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-5 md:flex-row">
              <img
                src={selectedEntry.image}
                alt={selectedEntry.alt}
                className="h-48 w-full rounded-md object-cover md:w-56"
                draggable={false}
              />

              <div className="flex-1">
                <p className="leading-7 text-white/70">
                  {selectedEntry.description}
                </p>
                <p className="mt-4 leading-7 text-white/55">
                  {selectedEntry.details}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <CursorTrail />
    </section>
  );
}
