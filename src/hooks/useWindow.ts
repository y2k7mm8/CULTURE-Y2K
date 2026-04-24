import { useState, useCallback, useRef } from "react";

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  position: WindowPosition;
  size: WindowSize;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export function useWindowState(
  id: string,
  defaultSize: WindowSize = { width: 400, height: 300 },
) {
  const [state, setState] = useState<WindowState>({
    id,
    position: { x: Math.random() * 100 + 50, y: Math.random() * 50 + 50 },
    size: defaultSize,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
  });

  const prevPos = useRef<WindowPosition>({ x: 0, y: 0 });

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    prevPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleDrag = useCallback((e: React.MouseEvent) => {
    const deltaX = e.clientX - prevPos.current.x;
    const deltaY = e.clientY - prevPos.current.y;

    setState((prev) => ({
      ...prev,
      position: {
        x: Math.max(
          0,
          Math.min(
            prev.position.x + deltaX,
            window.innerWidth - prev.size.width,
          ),
        ),
        y: Math.max(
          0,
          Math.min(
            prev.position.y + deltaY,
            window.innerHeight - prev.size.height,
          ),
        ),
      },
    }));

    prevPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const toggleMinimize = useCallback(() => {
    setState((prev) => ({ ...prev, isMinimized: !prev.isMinimized }));
  }, []);

  const toggleMaximize = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isMaximized: !prev.isMaximized,
      size: prev.isMaximized
        ? { width: 400, height: 300 }
        : { width: window.innerWidth * 0.9, height: window.innerHeight * 0.9 },
    }));
  }, []);

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isMinimized: true }));
  }, []);

  const focus = useCallback(() => {
    setState((prev) => ({ ...prev, zIndex: Date.now() }));
  }, []);

  return {
    ...state,
    handleDragStart,
    handleDrag,
    toggleMinimize,
    toggleMaximize,
    close,
    focus,
  };
}
