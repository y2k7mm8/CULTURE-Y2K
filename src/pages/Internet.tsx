import { useMemo, useState } from "react";
import webImg from "../assets/img/web.png";
import phoneImg from "../assets/img/phone.png";
import techImg from "../assets/img/tech.png";

const nodes = [
  { title: "Flash portal", status: "online", type: "games" },
  { title: "Guestbook alley", status: "online", type: "social" },
  { title: "Shrine sector", status: "broken", type: "fan page" },
  { title: "Web toy district", status: "online", type: "toy" },
  { title: "Avatar suburb", status: "broken", type: "community" },
  { title: "Button exchange", status: "online", type: "graphics" },
];

export default function Internet() {
  const [showBroken, setShowBroken] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("connected to the handmade web");

  const visible = useMemo(() => {
    const byState = showBroken
      ? nodes.filter((node) => node.status === "broken")
      : nodes;
    if (!query.trim()) return byState;
    return byState.filter((node) =>
      `${node.title} ${node.type}`.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, showBroken]);

  return (
    <div className="space-y-5">
      <section className="y2k-shell rounded-[32px] p-5 md:p-6">
        <div className="grid gap-5 xl:grid-cols-[1fr_0.95fr]">
          <div className="chrome-panel rounded-[28px] p-6">
            <p className="micro-label mb-3">internet sector / archive mode</p>
            <h1 className="window-title text-4xl text-white md:text-5xl">
              personal pages, web rings and{" "}
              <span className="chroma-text">lost links</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
              Your separate internet page now fits the whole project better:
              still nostalgic, but cleaner and more usable as a real archive
              interface.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="search archive node..."
                className="chrome-panel min-w-[220px] rounded-full px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button
                onClick={() => setShowBroken((prev) => !prev)}
                className="y2k-button rounded-full px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-white"
              >
                broken only: {showBroken ? "on" : "off"}
              </button>
              <button
                onClick={() => setStatus("jumped to random archive ring")}
                className="y2k-button rounded-full px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-white"
              >
                random jump
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
        <p className="micro-label mb-3">visible nodes</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((node) => (
            <article
              key={node.title}
              className="chrome-panel rounded-[24px] p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="window-title text-2xl text-white">
                  {node.title}
                </h3>
                <span
                  className={`chrome-chip rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] ${node.status === "broken" ? "text-pink-200" : "text-cyan-200"}`}
                >
                  {node.status}
                </span>
              </div>
              <p className="text-sm uppercase tracking-[0.22em] text-white/65">
                {node.type}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
