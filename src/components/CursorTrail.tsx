import React, { useEffect } from "react";

const CursorTrail: React.FC = () => {
  useEffect(() => {
    // Disable custom cursor on touch/coarse pointer devices to avoid jank
    if (
      typeof window !== "undefined" &&
      (window.matchMedia?.("(pointer: coarse)")?.matches ||
        "ontouchstart" in window)
    ) {
      return;
    }
    const cursorSrc = new URL("../assets/img/cursor.png", import.meta.url).href;
    const selectionSrcCandidate = new URL(
      "../assets/img/selection-cursor.png",
      import.meta.url,
    ).href;
    const selectionFallback = new URL(
      "../assets/img/cursor2.png",
      import.meta.url,
    ).href;

    // Debug logging removed for production performance

    const img = document.createElement("img");
    img.src = cursorSrc;
    img.className = "custom-cursor";
    img.style.position = "fixed";
    img.style.left = "0px";
    img.style.top = "0px";
    img.style.transform = "translate3d(0px,0px,0) translate(-50%,-50%)";
    img.style.willChange = "transform";
    img.style.pointerEvents = "none";
    img.style.zIndex = "99999";
    img.style.width = "39px";
    img.setAttribute("alt", "cursor");

    document.body.appendChild(img);
    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    // Inject global style to hide native cursors on most elements (except inputs)
    const styleEl = document.createElement("style");
    styleEl.id = "custom-cursor-hide-style";
    styleEl.textContent =
      '*:not(input):not(textarea):not([contenteditable="true"]) { cursor: none !important; }';
    document.head.appendChild(styleEl);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    let rafId = 0;
    let animating = false;
    let lastUpdate = 0;
    const UPDATE_THRESHOLD = 1; // Only update if moved at least 1px
    const FRAME_RATE_MS = 16; // ~60fps, but we throttle below

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!animating) {
        animating = true;
        img.style.display = "block";
        rafId = requestAnimationFrame(loop);
      }
      lastMove = Date.now();
    };

    let lastMove = Date.now();

    const loop = () => {
      // if idle for 2s, stop animating to save CPU
      if (Date.now() - lastMove > 2000) {
        animating = false;
        img.style.display = "none";
        cancelAnimationFrame(rafId);
        return;
      }

      const now = Date.now();
      const dx = mouseX - curX;
      const dy = mouseY - curY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only update DOM if cursor has moved enough or enough time has passed
      if (distance > UPDATE_THRESHOLD || now - lastUpdate > FRAME_RATE_MS) {
        curX += dx * 0.3;
        curY += dy * 0.3;
        img.style.transform = `translate3d(${curX}px,${curY}px,0) translate(-50%,-50%)`;
        lastUpdate = now;
      }

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    // start hidden until first movement
    img.style.display = "none";

    const onSelectionChange = () => {
      try {
        const sel = document.getSelection();
        if (sel && sel.toString().length > 0) {
          img.src = selectionSrcCandidate;
        } else {
          img.src = cursorSrc;
        }
      } catch {
        // ignore
      }
    };

    document.addEventListener("selectionchange", onSelectionChange);

    const onImgError = (ev: Event) => {
      if (import.meta.env.DEV) {
        console.warn("CursorTrail: failed to load image:", img.src, ev);
      }
      try {
        if (img.src === selectionSrcCandidate) {
          img.src = selectionFallback;
        } else {
          img.src = cursorSrc;
        }
      } catch {
        // ignore
      }
    };
    img.addEventListener("error", onImgError);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("selectionchange", onSelectionChange);
      cancelAnimationFrame(rafId);
      img.removeEventListener("error", onImgError);
      img.remove();
      document.body.style.cursor = prevCursor || "";
      styleEl.remove();
    };
  }, []);

  return null;
};

export default CursorTrail;
