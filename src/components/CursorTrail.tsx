import React, { useEffect } from "react";

const CursorTrail: React.FC = () => {
  useEffect(() => {
    const cursorSrc = new URL("../assets/img/cursor.png", import.meta.url).href;
    const selectionSrcCandidate = new URL(
      "../assets/img/selection-cursor.png",
      import.meta.url,
    ).href;
    const selectionFallback = new URL(
      "../assets/img/cursor2.png",
      import.meta.url,
    ).href;

    console.debug("CursorTrail: resolved paths", {
      cursorSrc,
      selectionSrcCandidate,
      selectionFallback,
    });

    const img = document.createElement("img");
    img.src = cursorSrc;
    img.className = "custom-cursor";
    img.style.position = "fixed";
    img.style.left = "0px";
    img.style.top = "0px";
    img.style.transform = "translate(-50%,-50%)";
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

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const loop = () => {
      curX += (mouseX - curX) * 0.3;
      curY += (mouseY - curY) * 0.3;
      img.style.left = `${curX}px`;
      img.style.top = `${curY}px`;
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    rafId = requestAnimationFrame(loop);

    const onSelectionChange = () => {
      try {
        const sel = document.getSelection();
        if (sel && sel.toString().length > 0) {
          img.src = selectionSrcCandidate;
        } else {
          img.src = cursorSrc;
        }
      } catch (err) {
        // ignore
      }
    };

    document.addEventListener("selectionchange", onSelectionChange);

    const onImgError = (ev: any) => {
      console.warn("CursorTrail: failed to load image:", img.src, ev);
      try {
        if (img.src === selectionSrcCandidate) {
          img.src = selectionFallback;
        } else if (img.src === selectionFallback) {
          img.src = cursorSrc;
        } else {
          img.src = cursorSrc;
        }
      } catch (e) {
        // ignore
      }
    };
    img.addEventListener("error", onImgError as any);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("selectionchange", onSelectionChange);
      cancelAnimationFrame(rafId);
      img.removeEventListener("error", onImgError as any);
      img.remove();
      document.body.style.cursor = prevCursor || "";
      styleEl.remove();
    };
  }, []);

  return null;
};

export default CursorTrail;
