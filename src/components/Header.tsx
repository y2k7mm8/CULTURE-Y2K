import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FrutigerAeroBubbles } from "./FrutigerAeroDecorations";
import "../styles/frutiger-aero.css";

export default function Header() {
  const { t, i18n } = useTranslation();

  const navItems = [
    { to: "/", label: t("nav.home") },
    { to: "/music", label: t("nav.music") },
    { to: "/fashion", label: t("nav.fashion") },
    { to: "/games", label: t("nav.games") },
    { to: "/internet", label: t("nav.internet") },
    { to: "/about", label: t("nav.about") },
  ];

  const languages = [
    { code: "en", name: t("common.english"), flag: "🇺🇸" },
    { code: "es", name: t("common.spanish"), flag: "🇪🇸" },
    { code: "ru", name: t("common.russian"), flag: "🇷🇺" },
  ];

  const toggleLanguage = () => {
    const currentIndex = languages.findIndex((lang) => lang.code === i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    i18n.changeLanguage(languages[nextIndex].code);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060814]/75 backdrop-blur-xl relative overflow-hidden">
      <FrutigerAeroBubbles count={5} className="opacity-30" />
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-4 lg:px-6 relative">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="micro-label mb-2">
              culture y2k / chroma archive / 1999—2009
            </p>
            <NavLink
              to="/"
              className="window-title text-3xl text-white md:text-4xl"
            >
              CULTURE <span className="chroma-text">Y2K</span>
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            <div className="frutiger-aero-glass rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-white/70">
              {t("header.tagline")}
            </div>
            <button
              onClick={toggleLanguage}
              className="frutiger-aero-button rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/88 flex items-center gap-2"
              title={t("common.language")}
            >
              {languages.find((lang) => lang.code === i18n.language)?.flag}{" "}
              {i18n.language.toUpperCase()}
            </button>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "frutiger-aero-button rounded-full px-4 py-3 text-center text-[12px] uppercase tracking-[0.24em] text-white/88",
                  isActive
                    ? "border-cyan-300/50 bg-cyan-500/10"
                    : "",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
