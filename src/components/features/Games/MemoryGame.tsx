import React, { useState, useEffect, useCallback } from "react";
import { Window } from "../../ui/Window";
import { useTranslation } from "react-i18next";

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const EMOJIS = ["🎮", "🕹️", "👾", "💿", "📼", "🎵", "📟", "🎬"];

export const MemoryGame: React.FC = () => {
  const { t } = useTranslation();

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    return Number(localStorage.getItem("y2k-memory-best")) || Infinity;
  });

  // Initialize game
  const initializeGame = useCallback(() => {
    const shuffledEmojis = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, id) => ({
        id,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffledEmojis);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameOver(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Handle card click
  const handleCardClick = useCallback((id: number) => {
    if (
      gameOver ||
      flippedCards.length >= 2 ||
      flippedCards.includes(id) ||
      cards[id].isMatched ||
      cards[id].isFlipped
    ) {
      return;
    }

    setFlippedCards((prev) => [...prev, id]);
  }, [gameOver, flippedCards, cards]);

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      setMoves((prev) => prev + 1);

      if (cards[first].emoji === cards[second].emoji) {
        // Match found
        setCards((prev) => {
          const newCards = [...prev];
          newCards[first].isMatched = true;
          newCards[second].isMatched = true;
          return newCards;
        });

        setMatches((prev) => prev + 1);
        setFlippedCards([]);

        // Check for game over
        if (matches + 1 === EMOJIS.length) {
          setGameOver(true);
          if (moves + 1 < bestScore) {
            setBestScore(moves + 1);
            localStorage.setItem("y2k-memory-best", (moves + 1).toString());
          }
        }
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, matches, moves, bestScore]);

  return (
    <Window
      id="game-memory"
      title={`Memory Match - ${matches}/${EMOJIS.length}`}
      icon="🧠"
      initialSize={{ width: 420, height: 480 }}
    >
      <div className="flex flex-col items-center gap-4 p-4 bg-[#c0c0c0]">
        {/* Stats bar */}
        <div className="w-full flex justify-between items-center text-sm font-bold bg-black/30 p-2 rounded">
          <div>
            {t("common.moves")}: {moves}
          </div>
          <div>
            {t("common.bestScore")}: {bestScore === Infinity ? "-" : bestScore}
          </div>
        </div>

        {/* Game board */}
        <div className="grid grid-cols-4 gap-2">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={gameOver || card.isMatched}
              className={`w-20 h-20 rounded-lg font-bold text-4xl transition-all duration-300 ${
                card.isFlipped || card.isMatched || flippedCards.includes(card.id)
                  ? "bg-cyan-500/30 border-cyan-400 text-white"
                  : "bg-gray-500/30 border-gray-400 hover:bg-gray-500/50"
              } ${card.isMatched ? "opacity-50" : ""}`}
              style={{ border: "2px solid" }}
            >
              {(card.isFlipped || card.isMatched || flippedCards.includes(card.id))
                ? card.emoji
                : "?"}
            </button>
          ))}
        </div>

        {/* Game over screen */}
        {gameOver && (
          <div className="text-center w-full bg-green-900/50 p-4 rounded border-2 border-green-500">
            <p className="text-white font-bold text-xl mb-2">
              🎉 {t("common.youWin")}!
            </p>
            {moves === bestScore && bestScore !== Infinity && (
              <p className="text-yellow-400 font-bold text-lg mb-2 animate-pulse">
                {t("common.newHighScore")}!
              </p>
            )}
            <div className="text-white mb-3">
              <p>{t("common.moves")}: {moves}</p>
            </div>
            <button
              onClick={initializeGame}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded hover:from-green-400 hover:to-green-500 font-bold shadow-lg"
            >
              {t("common.playAgain")}
            </button>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-2">
          <button
            onClick={initializeGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            {t("common.reset")}
          </button>
        </div>
      </div>
    </Window>
  );
};