import { NavLink } from "react-router-dom";

type NavItem = { label: string; to: string };

const nav: NavItem[] = [
  { label: "MUSIC", to: "/music" },
  { label: "FASHION", to: "/fashion" },
  { label: "GAMES", to: "/games" },
  { label: "INTERNET", to: "/internet" },
];

export default function Header() {
  return (
    <header className="w-full">
      <div className="inset-0 -z-10 bg-[url('/src/assets/img/background.png')] bg-cover pt-10 pb-6 text-center">
        <h1 className="font-planet text-white text-4xl tracking-[0.15em] drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]">
          CULTURE Y2K
        </h1>
      </div>

      <div className="mx-auto w-[92%] max-w-6xl px-6 py-5">
        <nav className="flex items-center justify-between gap-6">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "relative w-52.5 max-w-[24%] rounded-full text-center",
                  "py-3 font-semibold tracking-widest text-white",
                  "bg-white/10 backdrop-blur-md",
                  "border border-white/20",
                  "transition-all duration-300",
                  "hover:bg-white/20 hover:shadow-[0_0_20px_rgba(120,200,255,0.4)]",
                  isActive
                    ? "bg-white/25 shadow-[0_0_35px_rgba(120,200,255,0.6)] ring-1 ring-white/40"
                    : "",
                ].join(" ")
              }
            >
              {item.label}

              <span className="pointer-events-none absolute inset-x-6 top-1 h-2 rounded-full bg-white/20 blur-md" />
              <span className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-b from-white/10 to-transparent" />
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
