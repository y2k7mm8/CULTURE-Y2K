import { useState, useCallback, useEffect } from "react";

export interface GameScore {
  score: number;
  highScore: number;
  level: number;
  gameOver: boolean;
  isPaused: boolean;
}

export interface GameStats {
  gamesPlayed: number;
  totalScore: number;
  bestLevel: number;
}

const STORAGE_KEY = "y2k-snake-stats";
const HIGH_SCORE_KEY = "y2k-snake-highscore";

export function useSnakeGame() {
  const [state, setState] = useState<GameScore>(() => {
    const savedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    return {
      score: 0,
      highScore: savedHighScore ? Number(savedHighScore) : 0,
      level: 1,
      gameOver: false,
      isPaused: false,
    };
  });

  const [stats, setStats] = useState<GameStats>(() => {
    const savedStats = localStorage.getItem(STORAGE_KEY);
    return savedStats
      ? JSON.parse(savedStats)
      : {
          gamesPlayed: 0,
          totalScore: 0,
          bestLevel: 1,
        };
  });

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const reset = useCallback(() => {
    setState((prev) => ({
      score: 0,
      highScore: prev.highScore,
      level: 1,
      gameOver: false,
      isPaused: false,
    }));
    setStats((prev) => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + 1,
    }));
  }, []);

  const addScore = useCallback((points: number) => {
    setState((prev) => {
      const newScore = prev.score + points;
      const newLevel = Math.floor(newScore / 50) + 1;
      const newHighScore = Math.max(prev.highScore, newScore);

      if (newHighScore > prev.highScore) {
        localStorage.setItem(HIGH_SCORE_KEY, newHighScore.toString());
      }

      setStats((prevStats) => ({
        ...prevStats,
        totalScore: prevStats.totalScore + points,
        bestLevel: Math.max(prevStats.bestLevel, newLevel),
      }));

      return {
        ...prev,
        score: newScore,
        level: newLevel,
        highScore: newHighScore,
      };
    });
  }, []);

  const endGame = useCallback(() => {
    setState((prev) => ({ ...prev, gameOver: true, isPaused: true }));
  }, []);

  const togglePause = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const getSpeed = useCallback(() => {
    // Speed increases with level (decreases interval)
    const baseSpeed = 150;
    const minSpeed = 60;
    return Math.max(minSpeed, baseSpeed - (state.level - 1) * 10);
  }, [state.level]);

  return {
    ...state,
    stats,
    reset,
    addScore,
    endGame,
    togglePause,
    getSpeed,
  };
}