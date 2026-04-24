export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 bg-black/30">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-sm text-white/55 md:grid-cols-3 lg:px-6">
        <div>
          <p className="micro-label mb-2">signal</p>
          <p>CULTURE Y2K / chroma edition</p>
        </div>
        <div>
          <p className="micro-label mb-2">mode</p>
          <p>handmade archive interface with interactive sections</p>
        </div>
        <div className="md:text-right">
          <p className="micro-label mb-2">year</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
