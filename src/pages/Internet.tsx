import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import webImg from "../assets/img/web.png";
import phoneImg from "../assets/img/phone.png";
import techImg from "../assets/img/tech.png";

interface Node {
  titleKey: string;
  status: "online" | "broken";
  typeKey: string;
}

export default function Internet() {
  const { t } = useTranslation();

  const nodes: Node[] = [
    { titleKey: "internet.nodes.n1", status: "online", typeKey: "games" },
    { titleKey: "internet.nodes.n2", status: "online", typeKey: "social" },
    { titleKey: "internet.nodes.n3", status: "broken", typeKey: "fan page" },
    { titleKey: "internet.nodes.n4", status: "online", typeKey: "toy" },
    { titleKey: "internet.nodes.n5", status: "broken", typeKey: "community" },
    { titleKey: "internet.nodes.n6", status: "online", typeKey: "graphics" },
  ];

  const [showBroken, setShowBroken] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState(t("internet.connected"));

  const visible = useMemo(() => {
    const byState = showBroken
      ? nodes.filter((node) => node.status === "broken")
      : nodes;
    if (!query.trim()) return byState;
    return byState.filter((node) =>
      `${t(node.titleKey)} ${node.typeKey}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }, [query, showBroken, t]);

  return (
    <div className="space-y-5">
      <section className="y2k-shell rounded-[32px] p-5 md:p-6">
        <div className="grid gap-5 xl:grid-cols-[1fr_0.95fr]">
          <div className="chrome-panel rounded-[28px] p-6">
            <p className="micro-label mb-3">{t("internet.label")}</p>
            <h1 className="window-title text-4xl text-white md:text-5xl">
              {t("internet.title")}{" "}
              <span className="chroma-text">
                {t("internet.titleHighlight")}
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
              {t("internet.description")}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("internet.searchPlaceholder")}
                className="chrome-panel min-w-[220px] rounded-full px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button
                onClick={() => setShowBroken((prev) => !prev)}
                className="y2k-button rounded-full px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-white"
              >
                {t("internet.brokenOnly", {
                  status: showBroken ? t("games.on") : t("games.off"),
                })}
              </button>
              <button
                onClick={() => setStatus(t("internet.jumped"))}
                className="y2k-button rounded-full px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-white"
              >
                {t("internet.randomJump")}
              </button>
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-cyan-200">
              {status}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[webImg, phoneImg, techImg].map((img, idx) => (
              <img
                loading="lazy"
                key={idx}
                src={img}
                alt="internet visual"
                className={`rounded-[24px] object-cover ${idx === 0 ? "md:col-span-2 h-60" : "h-40"}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="y2k-shell rounded-[30px] p-5">
        <p className="micro-label mb-3">{t("internet.visibleNodes")}</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((node) => (
            <article
              key={node.titleKey}
              className="chrome-panel rounded-[24px] p-5"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="window-title text-2xl text-white">
                  {t(node.titleKey)}
                </h3>
                <span
                  className={`chrome-chip rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] ${node.status === "broken" ? "text-pink-200" : "text-cyan-200"}`}
                >
                  {node.status}
                </span>
              </div>
              <p className="text-sm uppercase tracking-[0.22em] text-white/65">
                {node.typeKey}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
