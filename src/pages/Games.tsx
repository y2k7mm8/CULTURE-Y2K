import { useEffect, useMemo, useState } from "react";
import toysImg from "../assets/img/toys.png";
import tvImg from "../assets/img/tv.png";
import techImg from "../assets/img/tech.png";

type Toy = {
  id: number;
  title: string;
  era: "early" | "mid" | "late";
  year: number;
  tag: string;
  note: string;
};

const entries: Toy[] = [
  {
    id: 1,
    title: "Pocket pet",
    era: "early",
    year: 1999,
    tag: "ritual toy",
    note: "Tiny hardware with emotional maintenance.",
  },
  {
    id: 2,
    title: "Arcade portal",
    era: "mid",
    year: 2004,
    tag: "score chase",
    note: "Fast loops, badges and competition.",
  },
  {
    id: 3,
    title: "Flash minigame",
    era: "mid",
    year: 2005,
    tag: "browser fun",
    note: "Small, expressive, instantly shareable.",
  },
  {
    id: 4,
    title: "Web toy page",
    era: "late",
    year: 2008,
    tag: "micro novelty",
    note: "Interaction for mood rather than goals.",
  },
];

const filters = ["all", "early", "mid", "late"] as const;

export default function Games() {
  const [era, setEra] = useState<(typeof filters)[number]>("all");
  const [glitchOn, setGlitchOn] = useState(true);
  const [saved, setSaved] = useState<number[]>([]);
  const [selected, setSelected] = useState<Toy>(entries[0]);
  const [randomPulse, setRandomPulse] = useState("");

  const visible = useMemo(() => {
    if (era === "all") return entries;
    return entries.filter((entry) => entry.era === era);
  }, [era]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "g") setGlitchOn((prev) => !prev);
      if (event.key.toLowerCase() === "r") {
        const random =
          visible[Math.floor(Math.random() * visible.length)] ?? entries[0];
        setSelected(random);
        setRandomPulse(`artifact found: ${random.title.toUpperCase()}`);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible]);

  return (
    <div className="space-y-5">
      <section className="y2k-shell rounded-[32px] p-5 md:p-6">
        <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
          <div
            className={`chrome-panel rounded-[28px] p-6 ${glitchOn ? "soft-pulse" : ""}`}
          >
            <p className="micro-label mb-3">games sector / archive mode</p>
            <h1 className="window-title text-4xl text-white md:text-5xl">
              browser toys, score loops and{" "}
              <span className="chroma-text">tiny obsessions</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
              I kept the archive idea but made it cleaner: easier filtering,
              more consistent cards and stronger Y2K chrome presentation.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {filters.map((item) => (
                <button
                  key={item}
                  onClick={() => setEra(item)}
                  className={`y2k-button rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.25em] ${
                    era === item
                      ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100"
                      : "text-white/80"
                  }`}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => setGlitchOn((prev) => !prev)}
                className="y2k-button rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white/80"
              >
                glitch: {glitchOn ? "on" : "off"}
              </button>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-pink-200/70">
              keyboard: G = glitch / R = random artifact
            </p>
            {randomPulse && (
              <p className="mt-4 text-sm uppercase tracking-[0.22em] text-cyan-200">
                {randomPulse}
              </p>
            )}
          </div>

          <div className="chrome-panel rounded-[28px] p-4">
            <img
              loading="lazy"
              src={toysImg}
              alt="toys"
              className="h-72 w-full rounded-[22px] object-cover"
            />
            <div className="mt-4 flex flex-wrap gap-3">
              {[tvImg, techImg].map((img, idx) => (
                <img
                  loading="lazy"
                  key={idx}
                  src={img}
                  alt="archive visual"
                  className="h-28 flex-1 rounded-[18px] object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <div className="y2k-shell rounded-[30px] p-5">
          <div className="grid gap-4 overflow-hidden md:grid-cols-2">
            {visible.map((entry) => {
              const isSaved = saved.includes(entry.id);
              return (
                <article
                  key={entry.id}
                  className="chrome-panel rounded-[24px] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="micro-label mb-2">
                        {entry.year} / {entry.tag}
                      </p>
                      <h3 className="window-title text-2xl text-white">
                        {entry.title}
                      </h3>
                    </div>
                    <button
                      onClick={() =>
                        setSaved((prev) =>
                          prev.includes(entry.id)
                            ? prev.filter((id) => id !== entry.id)
                            : [...prev, entry.id],
                        )
                      }
                      className="y2k-button rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white"
                    >
                      {isSaved ? "saved" : "save"}
                    </button>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {entry.note}
                  </p>
                  <button
                    onClick={() => setSelected(entry)}
                    className="y2k-button mt-4 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white"
                  >
                    open detail
                  </button>
                </article>
              );
            })}
          </div>
        </div>

        <div className="y2k-shell rounded-[30px] p-5">
          <p className="micro-label mb-2">selected artifact</p>
          <h2 className="window-title text-3xl text-white">{selected.title}</h2>
          <p className="mt-3 text-sm uppercase tracking-[0.22em] text-cyan-200">
            {selected.year} · {selected.tag}
          </p>
          <p className="mt-4 text-sm leading-7 text-white/70">
            {selected.note} This panel can later expand into modal windows,
            archive logs or animated object details.
          </p>
          <div className="chrome-panel mt-5 rounded-[22px] p-4 text-sm leading-6 text-white/72">
            The new structure keeps the playful archive feeling but avoids the
            clutter that made the page harder to read.
          </div>
        </div>
      </section>
    </div>
  );
}
