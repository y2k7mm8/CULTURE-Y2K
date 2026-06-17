import React, { useEffect, useRef, useState } from "react";
import { useSnakeGame } from "../../../hooks/useGame";
import { Window } from "../../ui/Window";
import { useTranslation } from "react-i18next";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

type SpecialFood = {
  position: Position;
  type: "bonus" | "speed" | "slow";
  timer: number;
  points: number;
};

export const SnakeGame: React.FC = () => {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameState = useSnakeGame();
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [specialFood, setSpecialFood] = useState<SpecialFood | null>(null);
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [nextDirection, setNextDirection] = useState<Direction>("RIGHT");
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const specialFoodRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const GRID_SIZE = 20;
  const TILE_SIZE = 20;
  const CANVAS_SIZE = 400;

  // Y2K color palette based on level
  const getLevelColors = () => {
    const level = gameState.level % 5;
    const palettes = [
      { snake: "#00ff00", head: "#00cc00", food: "#ff00ff", bg: "#0a0a0a" },
      { snake: "#00ffff", head: "#00cccc", food: "#ffff00", bg: "#0a0a1a" },
      { snake: "#ff00ff", head: "#cc00cc", food: "#00ffff", bg: "#1a0a1a" },
      { snake: "#ff6600", head: "#cc5200", food: "#00ff00", bg: "#1a100a" },
      { snake: "#ffffff", head: "#cccccc", food: "#ff0066", bg: "#1a1a1a" },
    ];
    return palettes[level];
  };

  const colors = getLevelColors();

  // Generate random position
  const getRandomPosition = (): Position => ({
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  });

  // Check collision
  const checkCollision = (
    pos: Position,
    snakeBody: Position[],
  ): boolean => {
    return snakeBody.some((seg) => seg.x === pos.x && seg.y === pos.y);
  };

  // Spawn special food
  const spawnSpecialFood = () => {
    const types: Array<"bonus" | "speed" | "slow"> = ["bonus", "speed", "slow"];
    const type = types[Math.floor(Math.random() * types.length)];
    let position;
    do {
      position = getRandomPosition();
    } while (checkCollision(position, snake) || (position.x === food.x && position.y === food.y));

    const pointsMap = { bonus: 30, speed: 20, slow: 15 };
    const timerMap = { bonus: 50, speed: 80, slow: 80 };

    setSpecialFood({
      position,
      type,
      timer: timerMap[type],
      points: pointsMap[type],
    });
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (direction !== "DOWN") setNextDirection("UP");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (direction !== "UP") setNextDirection("DOWN");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (direction !== "RIGHT") setNextDirection("LEFT");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (direction !== "LEFT") setNextDirection("RIGHT");
          break;
        case " ":
          e.preventDefault();
          if (!gameState.gameOver) gameState.togglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameState]);

  // Game loop
  useEffect(() => {
    if (gameState.gameOver || gameState.isPaused) return;

    gameLoopRef.current = setInterval(() => {
      setDirection(nextDirection);
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        let newHead: Position = { ...head };

        switch (nextDirection) {
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

        // Check collision with self
        if (prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
          gameState.endGame();
          return prevSnake;
        }

        let newSnake = [newHead, ...prevSnake];
        let ateFood = false;
        let ateSpecial = false;

        // Check regular food
        if (newHead.x === food.x && newHead.y === food.y) {
          gameState.addScore(10);
          ateFood = true;
          let newFoodPos;
          do {
            newFoodPos = getRandomPosition();
          } while (checkCollision(newFoodPos, newSnake));
          setFood(newFoodPos);

          // 30% chance to spawn special food
          if (Math.random() < 0.3 && !specialFood) {
            spawnSpecialFood();
          }
        }

        // Check special food
        if (specialFood && newHead.x === specialFood.position.x && newHead.y === specialFood.position.y) {
          gameState.addScore(specialFood.points);
          ateSpecial = true;
          setSpecialFood(null);
        }

        if (!ateFood && !ateSpecial) {
          newSnake.pop();
        }

        return newSnake;
      });
    }, gameState.getSpeed());

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [nextDirection, food, gameState, specialFood]);

  // Special food timer
  useEffect(() => {
    if (!specialFood) return;

    specialFoodRef.current = setInterval(() => {
      setSpecialFood((prev) => {
        if (!prev) return null;
        const newTimer = prev.timer - 1;
        if (newTimer <= 0) return null;
        return { ...prev, timer: newTimer };
      });
    }, 100);

    return () => {
      if (specialFoodRef.current) clearInterval(specialFoodRef.current);
    };
  }, [specialFood]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid (subtle)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * TILE_SIZE, 0);
      ctx.lineTo(i * TILE_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * TILE_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * TILE_SIZE);
      ctx.stroke();
    }

    // Draw special food
    if (specialFood) {
      const sfColors = {
        bonus: "#ffff00",
        speed: "#00ff00",
        slow: "#ff6600",
      };

      ctx.fillStyle = sfColors[specialFood.type];
      ctx.shadowColor = sfColors[specialFood.type];
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(
        specialFood.position.x * TILE_SIZE + TILE_SIZE / 2,
        specialFood.position.y * TILE_SIZE + TILE_SIZE / 2,
        TILE_SIZE / 2 - 2,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw type indicator
      ctx.fillStyle = "#000";
      ctx.font = "bold 10px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const typeSymbols = { bonus: "★", speed: "⚡", slow: "❄" };
      ctx.fillText(
        typeSymbols[specialFood.type],
        specialFood.position.x * TILE_SIZE + TILE_SIZE / 2,
        specialFood.position.y * TILE_SIZE + TILE_SIZE / 2,
      );
    }

    // Draw food
    ctx.fillStyle = colors.food;
    ctx.shadowColor = colors.food;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(
      food.x * TILE_SIZE + TILE_SIZE / 2,
      food.y * TILE_SIZE + TILE_SIZE / 2,
      TILE_SIZE / 2 - 2,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw snake
    snake.forEach((segment, index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? colors.head : colors.snake;

      // Add glow to head
      if (isHead) {
        ctx.shadowColor = colors.head;
        ctx.shadowBlur = 10;
      }

      ctx.fillRect(
        segment.x * TILE_SIZE + 1,
        segment.y * TILE_SIZE + 1,
        TILE_SIZE - 2,
        TILE_SIZE - 2,
      );
      ctx.shadowBlur = 0;

      // Draw eyes on head
      if (isHead) {
        ctx.fillStyle = "#fff";
        const eyeOffset = 4;
        const eyeSize = 3;

        let eye1X, eye1Y, eye2X, eye2Y;
        const centerX = segment.x * TILE_SIZE + TILE_SIZE / 2;
        const centerY = segment.y * TILE_SIZE + TILE_SIZE / 2;

        switch (direction) {
          case "UP":
            eye1X = centerX - eyeOffset;
            eye1Y = centerY - eyeOffset;
            eye2X = centerX + eyeOffset;
            eye2Y = centerY - eyeOffset;
            break;
          case "DOWN":
            eye1X = centerX - eyeOffset;
            eye1Y = centerY + eyeOffset;
            eye2X = centerX + eyeOffset;
            eye2Y = centerY + eyeOffset;
            break;
          case "LEFT":
            eye1X = centerX - eyeOffset;
            eye1Y = centerY - eyeOffset;
            eye2X = centerX - eyeOffset;
            eye2Y = centerY + eyeOffset;
            break;
          case "RIGHT":
            eye1X = centerX + eyeOffset;
            eye1Y = centerY - eyeOffset;
            eye2X = centerX + eyeOffset;
            eye2Y = centerY + eyeOffset;
            break;
        }

        ctx.beginPath();
        ctx.arc(eye1X, eye1Y, eyeSize, 0, Math.PI * 2);
        ctx.arc(eye2X, eye2Y, eyeSize, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw pause overlay
    if (gameState.isPaused && !gameState.gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 24px Arial";
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
      ctx.font = "14px Arial";
      ctx.fillText("Press SPACE to continue", CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 30);
    }
  }, [snake, food, colors, direction, gameState.isPaused, gameState.gameOver, specialFood]);

  return (
    <Window
      id="game-snake"
      title={`Snake - Level ${gameState.level}`}
      icon="🐍"
      initialSize={{ width: 450, height: 520 }}
    >
      <div className="flex flex-col items-center gap-4 p-4 bg-[#c0c0c0]">
        {/* Stats bar */}
        <div className="w-full flex justify-between items-center text-sm font-bold bg-black/30 p-2 rounded">
          <div>
            {t("common.score")}: {gameState.score}
          </div>
          <div>
            {t("common.highScore")}: {gameState.highScore}
          </div>
          <div>
            {t("common.level")}: {gameState.level}
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="border-4 border-black rounded shadow-lg"
          style={{ imageRendering: "pixelated", boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)" }}
        />

        {/* Game over screen */}
        {gameState.gameOver && (
          <div className="text-center w-full bg-red-900/50 p-4 rounded border-2 border-red-500">
            <p className="text-white font-bold text-xl mb-2">
              {t("common.gameOver")}
            </p>
            {gameState.score >= gameState.highScore && gameState.score > 0 && (
              <p className="text-yellow-400 font-bold text-lg mb-2 animate-pulse">
                {t("common.newHighScore")} 🎉
              </p>
            )}
            <div className="text-white mb-3">
              <p>{t("common.score")}: {gameState.score}</p>
              <p>{t("common.level")}: {gameState.level}</p>
              <p>{t("common.highScore")}: {gameState.highScore}</p>
            </div>
            <button
              onClick={gameState.reset}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded hover:from-green-400 hover:to-green-500 font-bold shadow-lg"
            >
              {t("common.playAgain")}
            </button>
          </div>
        )}

        {/* Controls info */}
        <div className="text-[10px] text-gray-700 text-center">
          <p>Arrow Keys / WASD to move · SPACE to pause</p>
          <p>★ Bonus (30pts) · ⚡ Speed (20pts) · ❄ Slow (15pts)</p>
        </div>
      </div>
    </Window>
  );
};