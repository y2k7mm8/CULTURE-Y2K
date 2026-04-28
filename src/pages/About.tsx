import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const upgrades = [
    t("about.upgrades.u1"),
    t("about.upgrades.u2"),
    t("about.upgrades.u3"),
    t("about.upgrades.u4"),
    t("about.upgrades.u5"),
    t("about.upgrades.u6"),
  ];

  return (
    <div className="space-y-5">
      <section className="y2k-shell rounded-[32px] p-6">
        <p className="micro-label mb-3">{t("about.label")}</p>
        <h1 className="window-title text-4xl text-white md:text-5xl">
          {t("about.title")}{" "}
          <span className="chroma-text">{t("about.titleHighlight")}</span>
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/72">
          {t("about.description")}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {upgrades.map((item, index) => (
          <article key={item} className="chrome-panel rounded-[24px] p-5">
            <div className="window-title text-3xl text-cyan-200">
              0{index + 1}
            </div>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-white/82">
              {item}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
