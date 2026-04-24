import React, { useState, useEffect } from "react";
import { Window } from "../../ui/Window";

export const WinampPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [visualization, setVisualization] = useState(Array(20).fill(0));

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setVisualization((prev) => prev.map(() => Math.random() * 100));
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev + 1) % 240);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <Window
      id="player-winamp"
      title="Winamp Media Player 2.91"
      icon="🎵"
      initialSize={{ width: 350, height: 250 }}
    >
      <div className="w-full bg-gradient-to-b from-gray-700 to-gray-600 p-4 font-terminator">
        <div className="text-center text-white text-xs font-bold mb-3">
          Winamp Media Player
        </div>

        <div className="bg-black mb-3 p-2 flex items-end justify-center gap-1 h-16 rounded">
          {visualization.map((height, i) => (
            <div
              key={i}
              className="bg-lime-500 w-1 transition-all duration-100"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        <div className="bg-black text-lime-500 text-center text-sm p-2 mb-3 rounded font-mono">
          {Math.floor(currentTime / 60)}:
          {String(currentTime % 60).padStart(2, "0")} / 4:00
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <button
            className="w-8 h-8 bg-gradient-to-b from-gray-500 to-gray-700 border-2 border-gray-400 text-black text-xs font-bold hover:from-gray-400 hover:to-gray-600 active:from-gray-600 active:to-gray-500"
            title="Previous"
          >
            ⏮
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 bg-gradient-to-b from-gray-500 to-gray-700 border-2 border-gray-400 text-black text-xs font-bold hover:from-gray-400 hover:to-gray-600 active:from-gray-600 active:to-gray-500"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            className="w-8 h-8 bg-gradient-to-b from-gray-500 to-gray-700 border-2 border-gray-400 text-black text-xs font-bold hover:from-gray-400 hover:to-gray-600 active:from-gray-600 active:to-gray-500"
            title="Next"
          >
            ⏭
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-white text-xs">🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-white text-xs w-8 text-right">{volume}%</span>
        </div>

        <div className="text-xs text-white p-2 bg-black/50 rounded max-h-24 overflow-y-auto">
          <div className="font-bold mb-1 text-lime-500">Now Playing:</div>
          <div className="text-lime-500">Chroma Memories - Y2K Archive</div>
          <div className="text-gray-400 text-xs">Album: Internet Nostalgia</div>
        </div>
      </div>
    </Window>
  );
};
