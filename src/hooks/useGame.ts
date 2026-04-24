import { useState, useCallback } from "react";

export interface GameScore {
  score: number;
  level: number;
  gameOver: boolean;
}

export function useSnakeGame() {
  const [state, setState] = useState<GameScore>({
    score: 0,
    level: 1,
    gameOver: false,
  });

  const reset = useCallback(() => {
    setState({ score: 0, level: 1, gameOver: false });
  }, []);

  const addScore = useCallback((points: number) => {
    setState((prev) => ({
      ...prev,
      score: prev.score + points,
      level: Math.floor((prev.score + points) / 100) + 1,
    }));
  }, []);

  const endGame = useCallback(() => {
    setState((prev) => ({ ...prev, gameOver: true }));
  }, []);

  return {
    ...state,
    reset,
    addScore,
    endGame,
  };
}
