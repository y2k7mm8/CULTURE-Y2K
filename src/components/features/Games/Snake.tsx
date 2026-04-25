import React, { useEffect, useRef, useState } from "react";
import { useSnakeGame } from "../../../hooks/useGame";
import { Window } from "../../ui/Window";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

export const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameState = useSnakeGame();
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const gameLoopRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const GRID_SIZE = 20;
  const TILE_SIZE = 20;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction]);

  useEffect(() => {
    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        let newHead: Position = { ...head };

        switch (direction) {
          case "UP":
            newHead.y = (newHead.y - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case "DOWN":
            newHead.y = (newHead.y + 1) % GRID_SIZE;
            break;
          case "LEFT":
            newHead.x = (newHead.x - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case "RIGHT":
            newHead.x = (newHead.x + 1) % GRID_SIZE;
            break;
        }

        if (
          prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
        ) {
          gameState.endGame();
          return prevSnake;
        }

        let newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          gameState.addScore(10);
          setFood({
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 100);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [direction, food, gameState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#222";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * TILE_SIZE, 0);
      ctx.lineTo(i * TILE_SIZE, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * TILE_SIZE);
      ctx.lineTo(canvas.width, i * TILE_SIZE);
      ctx.stroke();
    }

    ctx.fillStyle = "#00ff00";
    snake.forEach((segment) => {
      ctx.fillRect(
        segment.x * TILE_SIZE + 1,
        segment.y * TILE_SIZE + 1,
        TILE_SIZE - 2,
        TILE_SIZE - 2,
      );
    });

    ctx.fillStyle = "#ffff00";
    ctx.fillRect(
      snake[0].x * TILE_SIZE + 1,
      snake[0].y * TILE_SIZE + 1,
      TILE_SIZE - 2,
      TILE_SIZE - 2,
    );

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(
      food.x * TILE_SIZE + 1,
      food.y * TILE_SIZE + 1,
      TILE_SIZE - 2,
      TILE_SIZE - 2,
    );
  }, [snake, food]);

  return (
    <Window
      id="game-snake"
      title="Snake Game"
      icon="🐍"
      initialSize={{ width: 450, height: 500 }}
    >
      <div className="flex flex-col items-center gap-4 p-4 bg-[#c0c0c0]">
        <div className="text-sm font-bold">
          Score: {gameState.score} | Level: {gameState.level}
        </div>
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border-2 border-black"
          style={{ imageRendering: "pixelated" }}
        />
        {gameState.gameOver && (
          <div className="text-center">
            <p className="text-red-600 font-bold">GAME OVER!</p>
            <button
              onClick={gameState.reset}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </Window>
  );
};
