import { NavLink } from "react-router-dom";
import homeIcon from "../assets/img/frutiger-aero/home.svg";
import musicIcon from "../assets/img/frutiger-aero/music.svg";
import fashionIcon from "../assets/img/frutiger-aero/fashion.svg";
import gamesIcon from "../assets/img/frutiger-aero/games.svg";
import internetIcon from "../assets/img/frutiger-aero/internet.svg";
import aboutIcon from "../assets/img/frutiger-aero/about.svg";
import "../styles/frutiger-aero.css";

const shortcuts = [
  { label: "Enter home hub", to: "/", icon: homeIcon },
  { label: "Open soundboard", to: "/music", icon: musicIcon },
  { label: "Style scanner", to: "/fashion", icon: fashionIcon },
  { label: "Toy archive", to: "/games", icon: gamesIcon },
  { label: "Web archive", to: "/internet", icon: internetIcon },
  { label: "Project notes", to: "/about", icon: aboutIcon },
];

export default function Sidebar() {
  return (
    <aside className="y2k-shell hidden rounded-[28px] p-5 lg:block">
      <div className="frutiger-aero-glass mb-4 rounded-[24px] p-5">
        <p className="micro-label mb-2">quick launch</p>
        <div className="window-title text-xl text-white">CHROMA DECK</div>
        <p className="mt-3 text-sm leading-6 text-white/65">
          A compact navigator for all archive sectors and interactive modes.
        </p>
      </div>

      <div className="space-y-3">
        {shortcuts.map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "frutiger-aero-card flex items-center gap-3 rounded-[20px] px-4 py-3 text-sm uppercase tracking-[0.18em] text-white/80 transition hover:-translate-y-0.5 hover:text-white",
                isActive ? "border-cyan-300/50 bg-cyan-500/10" : "",
              ].join(" ")
            }
          >
            <img src={item.icon} alt={item.label} className="w-8 h-8 frutiger-aero-icon" />
            <div className="flex-1">
              <div className="mb-1 text-[10px] tracking-[0.32em] text-white/40">
                0{index + 1}
              </div>
              {item.label}
            </div>
          </NavLink>
        ))}
      </div>

      <div className="frutiger-aero-glass mt-4 rounded-[22px] p-5 text-sm text-white/68">
        <p className="micro-label mb-2">theme notes</p>
        chrome highlights · glass panels · floating badges · bright cyan/pink glow
      </div>
    </aside>
  );
}
