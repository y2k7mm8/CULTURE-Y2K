import { NavLink } from "react-router-dom";

const shortcuts = [
  { label: "Enter home hub", to: "/" },
  { label: "Open soundboard", to: "/music" },
  { label: "Style scanner", to: "/fashion" },
  { label: "Toy archive", to: "/games" },
  { label: "Web archive", to: "/internet" },
  { label: "Project notes", to: "/about" },
];

export default function Sidebar() {
  return (
    <aside className="y2k-shell hidden rounded-[28px] p-4 lg:block">
      <div className="chrome-panel mb-4 rounded-[24px] p-4">
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
                "chrome-panel block rounded-[20px] px-4 py-3 text-sm uppercase tracking-[0.18em] text-white/80 transition hover:-translate-y-0.5 hover:text-white",
                isActive ? "border-cyan-300/50 bg-cyan-300/10" : "",
              ].join(" ")
            }
          >
            <div className="mb-1 text-[10px] tracking-[0.32em] text-white/40">
              0{index + 1}
            </div>
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="chrome-panel mt-4 rounded-[22px] p-4 text-sm text-white/68">
        <p className="micro-label mb-2">theme notes</p>
        chrome highlights · glass panels · floating badges · bright cyan/pink glow
      </div>
    </aside>
  );
}
