const upgrades = [
  "new layout shell with sidebar + modular sections",
  "stronger Y2K chroma palette and chrome/glass surfaces",
  "more interactive controls across pages",
  "cleaner typography hierarchy",
  "separate internet archive page integrated into the overall style",
  "better consistency between all sectors",
];

export default function About() {
  return (
    <div className="space-y-5">
      <section className="y2k-shell rounded-[32px] p-6">
        <p className="micro-label mb-3">about / project direction</p>
        <h1 className="window-title text-4xl text-white md:text-5xl">
          what was improved in the <span className="chroma-text">site structure</span>
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/72">
          The site now behaves more like a designed digital archive instead of separate unrelated pages. Every sector still has its own character, but the system is more unified and much closer to a Y2K chroma aesthetic.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {upgrades.map((item, index) => (
          <article key={item} className="chrome-panel rounded-[24px] p-5">
            <div className="window-title text-3xl text-cyan-200">0{index + 1}</div>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/82">{item}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
