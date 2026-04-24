import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/music", label: "Music" },
  { to: "/fashion", label: "Fashion" },
  { to: "/games", label: "Games" },
  { to: "/internet", label: "Internet" },
  { to: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060814]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-4 lg:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="micro-label mb-2">culture y2k / chroma archive / 1999—2009</p>
            <NavLink to="/" className="window-title text-3xl text-white md:text-4xl">
              CULTURE <span className="chroma-text">Y2K</span>
            </NavLink>
          </div>

          <div className="chrome-panel rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-white/70">
            glossy web memories · cyber chrome layout · interactive archive
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "y2k-button rounded-full px-4 py-3 text-center text-[12px] uppercase tracking-[0.24em] text-white/88",
                  isActive ? "soft-pulse border-cyan-300/50 bg-cyan-300/10" : "",
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
