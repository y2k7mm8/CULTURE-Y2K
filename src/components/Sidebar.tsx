import { NavLink } from "react-router-dom";

const items = [
  "All About Us",
  "Generation",
  "Gear",
  "Books",
  "Board Game",
  "Gotta Groove CD-Rom",
  "International High",
  "Memory Keeper",
];

export default function Sidebar() {
  return (
    <aside className="left-nav hidden w-74 shrink-0 flex-col gap-4 px-4 py-6 text-white md:flex">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full bg-linear-to-br from-pink-500 to-cyan-400 p-2 text-black text-lg font-bold">
          Y2K
        </div>
        <div>
          <div className="text-sm font-bold tracking-widest">Generation</div>
          <div className="text-xs uppercase text-white/80">
            Y2k FUCKING STYLE
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        {items.map((it) => (
          <NavLink
            to="#"
            key={it}
            className="block rounded-md px-3 py-2 text-sm font-semibold text-pink-300 hover:text-white hover:bg-white/5"
          >
            {it}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-2 text-xs text-white/70">
        © {new Date().getFullYear()}
      </div>
    </aside>
  );
}
