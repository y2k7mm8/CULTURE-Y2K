import { useEffect, useMemo, useState } from "react";
import CursorTrail from "../components/CursorTrail";

const bookmarks = [
  {
    id: 1,
    title: "flash portal",
    url: "www.flash-portal-archive.net",
    note: "minigames, intros, weird experiments",
    broken: false,
    category: "games",
  },
  {
    id: 2,
    title: "cyber pet club",
    url: "www.cyberpetclub.org",
    note: "virtual pets, diaries, fan shrines",
    broken: false,
    category: "pets",
  },
  {
    id: 3,
    title: "arcade ranking board",
    url: "www.arcade-ranking-zone.com",
    note: "scores, badges, challenge pages",
    broken: true,
    category: "scores",
  },
  {
    id: 4,
    title: "pixel chat room",
    url: "www.pixel-chat-room.net",
    note: "avatars, guestbooks, message culture",
    broken: false,
    category: "chat",
  },
  {
    id: 5,
    title: "midnight shrine",
    url: "www.midnight-shrine.cc",
    note: "fan pages, image shrines, blink graphics",
    broken: true,
    category: "fan sites",
  },
  {
    id: 6,
    title: "webtoy district",
    url: "www.webtoy-district.com",
    note: "tiny experiments, cursor toys, loaders",
    broken: false,
    category: "toys",
  },
];

const guestbookEntries = [
  {
    name: "cyberangel99",
    date: "05.04.2004",
    message: "luv this site... the layout feels like a real web shrine <3",
  },
  {
    name: "pixel_dragon",
    date: "11.08.2005",
    message: "found this through a webring, staying for the flash archive.",
  },
  {
    name: "nocturnal_modem",
    date: "19.01.2006",
    message: "pls never delete this page... handmade internet forever.",
  },
  {
    name: "guest_404",
    date: "03.06.2007",
    message: "some links are dead but the vibe is alive.",
  },
];

const webRingNodes = [
  "personal homepage sector",
  "late night html district",
  "flash museum node",
  "guestbook alley",
  "pixel avatar suburb",
  "counter archive exchange",
];

const stamps = [
  "best viewed at 1024x768",
  "html powered",
  "flash friendly",
  "no ai / all hand coded",
  "works on old browsers",
  "enter at your own risk",
];

const miniButtons = [
  "web ring",
  "guestbook",
  "html 4.01",
  "flash zone",
  "cyber pet",
  "notepad coded",
  "best viewed",
  "pixel net",
  "old links",
  "modem soul",
  "under const.",
  "archive node",
];

const downloads = [
  { name: "flash_index.zip", size: "1.4 MB", type: "archive" },
  { name: "pixel_avatars_pack.rar", size: "824 KB", type: "graphics" },
  { name: "guestbook_backup.txt", size: "12 KB", type: "text" },
  { name: "webring_map.gif", size: "210 KB", type: "image" },
];

const searchIndex = [
  "guestbook",
  "webring",
  "flash",
  "portal",
  "pets",
  "chat room",
  "pixel art",
  "counter",
  "archive",
  "broken links",
  "downloads",
  "buttons",
  "under construction",
  "web toys",
];

export default function Internet() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [blinkOn, setBlinkOn] = useState(true);
  const [currentStamp, setCurrentStamp] = useState(0);
  const [statusText, setStatusText] = useState("CONNECTED TO WEB ARCHIVE NODE");
  const [ringIndex, setRingIndex] = useState(0);
  const [selectedBookmark, setSelectedBookmark] = useState(bookmarks[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(
    "type a keyword and search the archive...",
  );
  const [dialStatus, setDialStatus] = useState("CONNECTED 56K");
  const [siteOfMoment, setSiteOfMoment] = useState(bookmarks[1]);
  const [showBrokenOnly, setShowBrokenOnly] = useState(false);

  useEffect(() => {
    const visits =
      Number(localStorage.getItem("internet-visitor-count") || "24817") + 1;
    localStorage.setItem("internet-visitor-count", String(visits));
    setVisitorCount(visits);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkOn((prev) => !prev);
    }, 650);

    const stampInterval = setInterval(() => {
      setCurrentStamp((prev) => (prev + 1) % stamps.length);
    }, 2200);

    const siteInterval = setInterval(() => {
      const random = bookmarks[Math.floor(Math.random() * bookmarks.length)];
      setSiteOfMoment(random);
    }, 4200);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(stampInterval);
      clearInterval(siteInterval);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "1") setStatusText("ENTERING PERSONAL HOMEPAGE ZONE");
      if (key === "2") setStatusText("LOADING MESSAGE BOARDS + WEB RINGS");
      if (key === "3") setStatusText("SCANNING LOST FLASH FILES");
      if (key === "4") setStatusText("OPENING INTERNET MUSEUM DIRECTORY");
      if (key === "5") setDialStatus("MODEM HANDSHAKE DETECTED");
      if (key === "6") setDialStatus("CONNECTION STABLE / LOW BANDWIDTH");
      if (key === "7") setDialStatus("PACKET LOSS... RECOVERING");
      if (key === "r") jumpRandomBookmark();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const brokenCount = useMemo(
    () => bookmarks.filter((item) => item.broken).length,
    [],
  );

  const visibleBookmarks = useMemo(() => {
    if (showBrokenOnly) return bookmarks.filter((item) => item.broken);
    return bookmarks;
  }, [showBrokenOnly]);

  const runSearch = () => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) {
      setSearchResult("empty query... no records loaded.");
      return;
    }

    const bookmarkMatch = bookmarks.find(
      (item) =>
        item.title.toLowerCase().includes(normalized) ||
        item.note.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized),
    );

    const indexMatch = searchIndex.find((item) => item.includes(normalized));

    if (bookmarkMatch) {
      setSelectedBookmark(bookmarkMatch);
      setSearchResult(
        `match found in archived directory: ${bookmarkMatch.title} / ${bookmarkMatch.category}`,
      );
      return;
    }

    if (indexMatch) {
      setSearchResult(`partial hit in text index: ${indexMatch}`);
      return;
    }

    setSearchResult("404 archive search: no stored result.");
  };

  const nextRing = () => {
    setRingIndex((prev) => (prev + 1) % webRingNodes.length);
  };

  const prevRing = () => {
    setRingIndex(
      (prev) => (prev - 1 + webRingNodes.length) % webRingNodes.length,
    );
  };

  const jumpRandomBookmark = () => {
    const random = bookmarks[Math.floor(Math.random() * bookmarks.length)];
    setSelectedBookmark(random);
    setStatusText(`JUMPED TO RANDOM NODE: ${random.title.toUpperCase()}`);
  };

  return (
    <section className="min-h-screen bg-[#0b0f19] px-4 py-8 text-black">
      <style>{`
        @keyframes screenFlicker {
          0% { opacity: 0.985; }
          50% { opacity: 1; }
          100% { opacity: 0.975; }
        }

        @keyframes textJitter {
          0% { transform: translateX(0px); }
          25% { transform: translateX(0.45px); }
          50% { transform: translateX(-0.45px); }
          75% { transform: translateX(0.25px); }
          100% { transform: translateX(0px); }
        }

        @keyframes marqueeMove {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        @keyframes blinkAnim {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0.18; }
        }

        @keyframes buttonGlow {
          0% { background: #d9d2bf; }
          50% { background: #fff6cf; }
          100% { background: #d9d2bf; }
        }

        .internet-shell {
          position: relative;
          animation: screenFlicker 0.16s linear infinite;
          box-shadow:
            0 0 0 2px #000,
            0 0 0 6px #c7c2b5,
            0 0 40px rgba(0, 0, 0, 0.45);
        }

        .internet-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.045) 0px,
            rgba(0, 0, 0, 0.045) 1px,
            transparent 2px,
            transparent 4px
          );
          opacity: 0.35;
        }

        .archive-title {
          animation: textJitter 0.11s linear infinite;
          text-shadow: 1px 0 red, -1px 0 blue;
        }

        .marquee-track {
          white-space: nowrap;
          display: inline-block;
          animation: marqueeMove 15s linear infinite;
          padding-left: 100%;
        }

        .stamp {
          display: inline-block;
          border: 1px solid #000;
          background: linear-gradient(to bottom, #fff6c7, #eadb98);
          padding: 4px 8px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
        }

        .blinkText {
          animation: blinkAnim 1s steps(2, start) infinite;
        }

        .mini-button {
          border: 1px solid #000;
          background: #d9d2bf;
          padding: 5px 8px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          animation: buttonGlow 2.4s infinite;
        }

        .pixel-link:hover {
          background: #fff7c2;
          color: #000;
        }
      `}</style>

      <div className="internet-shell mx-auto max-w-280 overflow-hidden border border-black bg-[#efe8d6] font-[Courier_New]">
        <div className="border-b-2 border-black bg-[#d4cdbd] px-4 py-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] uppercase tracking-[0.2em]">
            <span>internet archive zone / personal web / 1998-2008</span>
            <span>visitor count: {visitorCount}</span>
          </div>
        </div>

        <div className="border-b border-black bg-[#fff4bf] px-4 py-2 text-[12px] uppercase tracking-[0.18em]">
          <div className="overflow-hidden">
            <div className="marquee-track">
              welcome to the internet museum / old pages / web rings /
              guestbooks / flash portals / pixel culture / broken links /
              forever online / handmade internet / static html energy
            </div>
          </div>
        </div>

        <div className="grid gap-0 md:grid-cols-[250px_1fr_280px]">
          <aside className="border-r border-black bg-[#e4dcc9] p-4">
            <div className="mb-5 border border-black bg-[#f8f1de] p-3">
              <p className="mb-2 text-xs uppercase tracking-[0.2em]">
                navigation
              </p>
              <ul className="space-y-2 text-[14px]">
                <li className="pixel-link cursor-pointer px-1 py-1">» home</li>
                <li className="pixel-link cursor-pointer px-1 py-1">
                  » web rings
                </li>
                <li className="pixel-link cursor-pointer px-1 py-1">
                  » flash archive
                </li>
                <li className="pixel-link cursor-pointer px-1 py-1">
                  » guestbook
                </li>
                <li className="pixel-link cursor-pointer px-1 py-1">
                  » internet toys
                </li>
                <li className="pixel-link cursor-pointer px-1 py-1">
                  » image shrine
                </li>
                <li className="pixel-link cursor-pointer px-1 py-1">
                  » link cemetery
                </li>
                <li className="pixel-link cursor-pointer px-1 py-1">
                  » downloads
                </li>
              </ul>
            </div>

            <div className="mb-5 border border-black bg-[#f8f1de] p-3">
              <p className="mb-2 text-xs uppercase tracking-[0.2em]">status</p>
              <p className="text-[13px] leading-6">{statusText}</p>
              <p
                className={`mt-2 text-[12px] uppercase tracking-[0.2em] ${blinkOn ? "blinkText" : ""}`}
              >
                live signal detected
              </p>
            </div>

            <div className="mb-5 border border-black bg-[#f8f1de] p-3">
              <p className="mb-2 text-xs uppercase tracking-[0.2em]">dial-up</p>
              <p className="text-[13px] leading-6">{dialStatus}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-black/60">
                keys: 5 / 6 / 7
              </p>
            </div>

            <div className="mb-5 border border-black bg-[#f8f1de] p-3">
              <p className="mb-2 text-xs uppercase tracking-[0.2em]">stamp</p>
              <div className="stamp">{stamps[currentStamp]}</div>
            </div>

            <div className="border border-black bg-[#f8f1de] p-3">
              <p className="mb-3 text-xs uppercase tracking-[0.2em]">
                webring node
              </p>
              <p className="text-[14px] leading-6">{webRingNodes[ringIndex]}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={prevRing}
                  className="border border-black bg-[#efe7d3] px-2 py-1 text-[11px] uppercase"
                >
                  prev
                </button>
                <button
                  onClick={nextRing}
                  className="border border-black bg-[#efe7d3] px-2 py-1 text-[11px] uppercase"
                >
                  next
                </button>
              </div>
            </div>
          </aside>

          <main className="p-5">
            <div className="mb-5 border-2 border-black bg-[#fbf7ea] p-4">
              <h1 className="archive-title mb-3 text-4xl font-black uppercase tracking-[0.12em]">
                internet
              </h1>
              <p className="text-[15px] leading-7">
                A separate page dedicated to old web culture: archives, fake
                portals, personal homepages, web rings, visitor counters, weird
                link collections, and the feeling of exploring an internet that
                felt handmade.
              </p>
            </div>

            <div className="mb-5 grid gap-4 md:grid-cols-2">
              <div className="border border-black bg-[#f8f1de] p-4">
                <h2 className="mb-3 text-xl font-bold uppercase tracking-[0.08em]">
                  archived snapshot
                </h2>
                <p className="text-[14px] leading-7">
                  This page simulates a preserved internet artifact. It mixes
                  directory aesthetics, old-school navigation, system fonts,
                  counters, blinking labels and boxed layouts inspired by
                  pre-social web design.
                </p>
              </div>

              <div className="border border-black bg-[#f8f1de] p-4">
                <h2 className="mb-3 text-xl font-bold uppercase tracking-[0.08em]">
                  keyboard nodes
                </h2>
                <p className="text-[14px] leading-7">
                  Press <strong>1</strong>, <strong>2</strong>,{" "}
                  <strong>3</strong>, <strong>4</strong> to switch archive
                  statuses. Press <strong>R</strong> to jump to a random saved
                  node.
                </p>
              </div>
            </div>

            <div className="mb-5 border border-black bg-[#f8f1de] p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold uppercase tracking-[0.08em]">
                  archive search
                </h2>
                <button
                  onClick={jumpRandomBookmark}
                  className="border border-black bg-[#efe7d3] px-3 py-2 text-[11px] uppercase tracking-[0.18em]"
                >
                  random page
                </button>
              </div>

              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="search the archive..."
                  className="flex-1 border border-black bg-[#fffdf7] px-3 py-2 text-[14px] outline-none"
                />
                <button
                  onClick={runSearch}
                  className="border border-black bg-[#efe7d3] px-4 py-2 text-[12px] uppercase tracking-[0.2em]"
                >
                  search
                </button>
              </div>

              <div className="mt-3 border border-black bg-[#fffdf7] px-3 py-3 text-[13px] leading-6">
                {searchResult}
              </div>
            </div>

            <div className="mb-5 border border-black bg-[#f8f1de] p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold uppercase tracking-[0.08em]">
                  bookmarked zones
                </h2>

                <label className="flex items-center gap-2 text-[12px] uppercase tracking-[0.18em]">
                  <input
                    type="checkbox"
                    checked={showBrokenOnly}
                    onChange={() => setShowBrokenOnly((prev) => !prev)}
                  />
                  broken only
                </label>
              </div>

              <div className="space-y-3">
                {visibleBookmarks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedBookmark(item)}
                    className={`block w-full border px-3 py-3 text-left ${
                      item.broken
                        ? "border-black bg-[#f2d7d7]"
                        : "border-black bg-[#fffdf7]"
                    }`}
                  >
                    <p className="text-[12px] uppercase tracking-[0.18em] text-black/60">
                      saved location / {item.category}
                    </p>
                    <h3 className="mt-1 text-lg font-bold uppercase">
                      {item.title}
                    </h3>
                    <p
                      className={`mt-1 text-[14px] underline ${item.broken ? "text-red-700" : "text-blue-700"}`}
                    >
                      {item.url}
                    </p>
                    <p className="mt-2 text-[14px] leading-6">{item.note}</p>
                    {item.broken && (
                      <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-red-700">
                        link status: broken / archived only
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5 grid gap-4 md:grid-cols-2">
              <div className="border border-black bg-[#f8f1de] p-4">
                <h2 className="mb-3 text-xl font-bold uppercase tracking-[0.08em]">
                  selected node
                </h2>
                <div className="border border-black bg-[#fffdf7] p-3">
                  <p className="text-[12px] uppercase tracking-[0.18em] text-black/60">
                    active directory item
                  </p>
                  <h3 className="mt-1 text-xl font-bold uppercase">
                    {selectedBookmark.title}
                  </h3>
                  <p className="mt-1 text-[14px] text-blue-700 underline">
                    {selectedBookmark.url}
                  </p>
                  <p className="mt-3 text-[14px] leading-7">
                    {selectedBookmark.note}
                  </p>
                  <p className="mt-3 text-[12px] uppercase tracking-[0.18em]">
                    category: {selectedBookmark.category}
                  </p>
                </div>
              </div>

              <div className="border border-black bg-[#f8f1de] p-4">
                <h2 className="mb-3 text-xl font-bold uppercase tracking-[0.08em]">
                  site of the moment
                </h2>
                <div className="border border-black bg-[#fff7c7] p-3">
                  <p className="text-[12px] uppercase tracking-[0.18em] text-black/60">
                    rotating recommendation
                  </p>
                  <h3 className="mt-1 text-xl font-bold uppercase">
                    {siteOfMoment.title}
                  </h3>
                  <p className="mt-1 text-[14px] underline text-blue-700">
                    {siteOfMoment.url}
                  </p>
                  <p className="mt-2 text-[14px] leading-6">
                    {siteOfMoment.note}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-5 border border-black bg-[#f8f1de] p-4">
              <h2 className="mb-3 text-xl font-bold uppercase tracking-[0.08em]">
                guestbook
              </h2>

              <div className="space-y-3">
                {guestbookEntries.map((entry, index) => (
                  <div
                    key={`${entry.name}-${index}`}
                    className="border border-black bg-[#fffdf7] p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[13px] font-bold uppercase">
                        {entry.name}
                      </p>
                      <p className="text-[12px] uppercase tracking-[0.16em] text-black/55">
                        {entry.date}
                      </p>
                    </div>
                    <p className="mt-2 text-[14px] leading-6">
                      {entry.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5 border border-black bg-[#f8f1de] p-4">
              <h2 className="mb-3 text-xl font-bold uppercase tracking-[0.08em]">
                88x31 buttons wall
              </h2>
              <div className="flex flex-wrap gap-2">
                {miniButtons.map((item, index) => (
                  <div key={`${item}-${index}`} className="mini-button">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5 border border-black bg-[#f8f1de] p-4">
              <h2 className="mb-3 text-xl font-bold uppercase tracking-[0.08em]">
                downloads
              </h2>
              <div className="space-y-2">
                {downloads.map((file) => (
                  <div
                    key={file.name}
                    className="flex flex-wrap items-center justify-between gap-3 border border-black bg-[#fffdf7] px-3 py-3"
                  >
                    <div>
                      <p className="text-[14px] font-bold">{file.name}</p>
                      <p className="text-[12px] uppercase tracking-[0.16em] text-black/60">
                        {file.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px]">{file.size}</p>
                      <p className="text-[12px] uppercase tracking-[0.16em] text-blue-700 underline">
                        download
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5 border border-black bg-[#fff4bf] p-4 text-center">
              <p className="text-[12px] uppercase tracking-[0.25em]">
                [ guestbook stable ] [ archive signal active ] [ broken links:{" "}
                {brokenCount} ] [ mirror online ]
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="border border-black bg-[#f8f1de] p-3 text-center text-[12px] uppercase tracking-[0.2em]">
                web rings
              </div>
              <div className="border border-black bg-[#f8f1de] p-3 text-center text-[12px] uppercase tracking-[0.2em]">
                counters
              </div>
              <div className="border border-black bg-[#f8f1de] p-3 text-center text-[12px] uppercase tracking-[0.2em]">
                guestbooks
              </div>
              <div className="border border-black bg-[#f8f1de] p-3 text-center text-[12px] uppercase tracking-[0.2em]">
                link cemetery
              </div>
            </div>
          </main>

          <aside className="border-l border-black bg-[#e4dcc9] p-4">
            <div className="mb-5 border border-black bg-[#f8f1de] p-3">
              <p className="mb-2 text-xs uppercase tracking-[0.2em]">
                system panel
              </p>
              <div className="space-y-2 text-[13px]">
                <p>mirror status: online</p>
                <p>packet integrity: 92%</p>
                <p>html mood: unstable</p>
                <p>gif density: high</p>
              </div>
            </div>

            <div className="mb-5 border border-black bg-[#f8f1de] p-3">
              <p className="mb-2 text-xs uppercase tracking-[0.2em]">
                broken links detector
              </p>
              <div className="space-y-2 text-[13px]">
                {bookmarks
                  .filter((item) => item.broken)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="border border-black bg-[#fff1f1] px-2 py-2"
                    >
                      <p className="font-bold uppercase">{item.title}</p>
                      <p className="mt-1 text-[12px] text-red-700">
                        404 / archived trace only
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="mb-5 border border-black bg-[#f8f1de] p-3">
              <p className="mb-2 text-xs uppercase tracking-[0.2em]">
                web ring controls
              </p>
              <div className="space-y-2 text-[13px]">
                <button
                  onClick={prevRing}
                  className="block w-full border border-black bg-[#efe7d3] px-3 py-2 text-left uppercase"
                >
                  previous node
                </button>
                <button
                  onClick={nextRing}
                  className="block w-full border border-black bg-[#efe7d3] px-3 py-2 text-left uppercase"
                >
                  next node
                </button>
                <button
                  onClick={jumpRandomBookmark}
                  className="block w-full border border-black bg-[#efe7d3] px-3 py-2 text-left uppercase"
                >
                  random jump
                </button>
              </div>
            </div>

            <div className="border border-black bg-[#f8f1de] p-3">
              <p className="mb-2 text-xs uppercase tracking-[0.2em]">help</p>
              <div className="space-y-2 text-[13px] leading-6">
                <p>1-4 = status nodes</p>
                <p>5-7 = modem states</p>
                <p>R = random page</p>
                <p>search = archive lookup</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="border-t-2 border-black bg-[#d4cdbd] px-4 py-3 text-center text-[12px] uppercase tracking-[0.2em]">
          internet / archive / personal pages / flash / old web / handmade
          culture / guestbooks / broken links / html spirit
        </div>
      </div>

      <CursorTrail />
    </section>
  );
}
