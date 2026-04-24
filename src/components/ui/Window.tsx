import React, { useRef, useState } from "react";
import { useWindowState } from "../../hooks/useWindow";

interface WindowProps {
  id: string;
  title: string;
  icon?: string;
  onClose?: () => void;
  initialSize?: { width: number; height: number };
  children: React.ReactNode;
  isResizable?: boolean;
  isDraggable?: boolean;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  onClose,
  initialSize = { width: 400, height: 300 },
  children,
  isResizable = true,
  isDraggable = true,
}) => {
  const windowState = useWindowState(id, initialSize);
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isDraggable && (e.target as HTMLElement).closest(".window-title-bar")) {
      setIsDragging(true);
      windowState.handleDragStart(e);
      windowState.focus();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      windowState.handleDrag(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (windowState.isMinimized) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      className="fixed bg-gradient-to-b from-[#000080] to-[#1084d7] border-2 shadow-lg"
      style={{
        left: `${windowState.position.x}px`,
        top: `${windowState.position.y}px`,
        width: `${windowState.size.width}px`,
        height: `${windowState.size.height}px`,
        zIndex: windowState.zIndex,
        borderColor: "#dfdfdf",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="window-title-bar flex items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d7] px-2 py-1 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-1">
          {icon && <span className="text-white text-sm">{icon}</span>}
          <span className="text-white text-sm font-bold">{title}</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={windowState.toggleMinimize}
            className="w-6 h-5 bg-gradient-to-b from-[#dfdfdf] to-[#808080] border border-white/50 text-black text-xs hover:bg-gradient-to-b hover:from-[#e8e8e8] hover:to-[#808080]"
            title="Minimize"
          >
            _
          </button>
          <button
            onClick={windowState.toggleMaximize}
            className="w-6 h-5 bg-gradient-to-b from-[#dfdfdf] to-[#808080] border border-white/50 text-black text-xs hover:bg-gradient-to-b hover:from-[#e8e8e8] hover:to-[#808080]"
            title="Maximize"
          >
            □
          </button>
          <button
            onClick={onClose || windowState.close}
            className="w-6 h-5 bg-gradient-to-b from-[#dfdfdf] to-[#808080] border border-white/50 text-black text-xs hover:bg-gradient-to-b hover:from-[#e8e8e8] hover:to-[#808080]"
            title="Close"
          >
            ×
          </button>
        </div>
      </div>

      <div
        className="bg-[#c0c0c0] overflow-auto"
        style={{ height: `calc(100% - 22px)` }}
      >
        {children}
      </div>
    </div>
  );
};
