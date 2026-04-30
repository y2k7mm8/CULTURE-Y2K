import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface Toy {
  id: number;
  titleKey: string;
  era: "early" | "mid" | "late";
  year: number;
  tagKey: string;
  noteKey: string;
}

export default function Games() {
  const { t } = useTranslation();

  const entries: Toy[] = [
    {
      id: 1,
      titleKey: "games.entries.e1",
      era: "early",
      year: 1999,
      tagKey: "games.entries.e1note",
      noteKey: "games.entries.e1note",
    },
    {
      id: 2,
      titleKey: "games.entries.e2",
      era: "mid",
      year: 2004,
      tagKey: "games.entries.e2note",
      noteKey: "games.entries.e2note",
    },
    {
      id: 3,
      titleKey: "games.entries.e3",
      era: "mid",
      year: 2005,
      tagKey: "games.entries.e3note",
      noteKey: "games.entries.e3note",
    },
    {
      id: 4,
      titleKey: "games.entries.e4",
      era: "late",
      year: 2008,
      tagKey: "games.entries.e4note",
      noteKey: "games.entries.e4note",
    },
  ];

  const filterKeys = ["all", "early", "mid", "late"] as const;

  const [era, setEra] = useState<(typeof filterKeys)[number]>("all");
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
        setRandomPulse(`artifact found: ${t(random.titleKey).toUpperCase()}`);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, t]);

  return (
    <div className="space-y-5">
      <section className="y2k-shell rounded-[32px] p-5 md:p-6">
        <div className=" gap-5 xl:grid-cols-[1fr_0.9fr]">
          <div
            className={`chrome-panel rounded-[28px] p-6 ${glitchOn ? "soft-pulse" : ""}`}
          >
            <p className="micro-label mb-3">{t("games.label")}</p>
            <h1 className="window-title text-4xl text-white md:text-5xl">
              {t("games.title")}{" "}
              <span className="chroma-text">{t("games.titleHighlight")}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
              {t("games.description")}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {filterKeys.map((item) => (
                <button
                  key={item}
                  onClick={() => setEra(item)}
                  className={`y2k-button rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.25em] ${
                    era === item
                      ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-100"
                      : "text-white/80"
                  }`}
                >
                  {t(`games.filters.${item}`)}
                </button>
              ))}
              <button
                onClick={() => setGlitchOn((prev) => !prev)}
                className="y2k-button rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white/80"
              >
                {t("games.glitch", {
                  status: glitchOn ? t("games.on") : t("games.off"),
                })}
              </button>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-pink-200/70">
              {t("games.keyboard")}
            </p>
            {randomPulse && (
              <p className="mt-4 text-sm uppercase tracking-[0.22em] text-cyan-200">
                {randomPulse}
              </p>
            )}
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
                  className="chrome-panel rounded-[24px] p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="micro-label mb-2">
                        {entry.year} / {t(entry.tagKey)}
                      </p>
                      <h3 className="window-title text-2xl text-white">
                        {t(entry.titleKey)}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {t(entry.noteKey)}
                  </p>
                  <button
                    onClick={() => setSelected(entry)}
                    className="y2k-button mt-4 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white"
                  >
                    {t("games.openDetail")}
                  </button>
                </article>
              );
            })}
          </div>
        </div>

        <div className="y2k-shell rounded-[30px] p-5">
          <p className="micro-label mb-2">{t("games.selectedArtifact")}</p>
          <h2 className="window-title text-3xl text-white">
            {t(selected.titleKey)}
          </h2>
          <p className="mt-3 text-sm uppercase tracking-[0.22em] text-cyan-200">
            {selected.year} · {t(selected.tagKey)}
          </p>
          <p className="mt-4 text-sm leading-7 text-white/70">
            {t(selected.noteKey)} This panel can later expand into modal
            windows, archive logs or animated object details.
          </p>
          <div className="chrome-panel mt-5 rounded-[22px] p-5 text-sm leading-6 text-white/72">
            The new structure keeps the playful archive feeling but avoids the
            clutter that made the page harder to read.
          </div>
        </div>
      </section>
    </div>
  );
}
