import { motion } from "framer-motion";
import { useGameContext } from "../../hooks/useGameContext";
import SpecialValues from "./SpecialValues";
import History from "./History";

import { useRef, useEffect } from "react";
import { useNavigate } from "react-router";

interface LeaderboardEntry {
  score: number;
  date: string;
}

export default function EndScreen() {
  const navigate = useNavigate();
  const { score, gameOverReason, startGame } = useGameContext();

  const savedRef = useRef(false);

  useEffect(() => {
    if (score === 0 || savedRef.current) return;

    savedRef.current = true;

    const existing = JSON.parse(localStorage.getItem("leaderboard") || "[]");

    existing.push({ score, date: new Date().toLocaleDateString() });

    existing.sort(
      (a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score,
    );

    localStorage.setItem("leaderboard", JSON.stringify(existing.slice(0, 5)));
  }, [score]);

  return (
    <div className="bg-game-bg min-h-dvh flex flex-col items-center justify-center gap-6 p-6">
      {/* End Screen title */}
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-amber-400 text-xl tracking-widest uppercase">
          Score Summary
        </span>
        <span className="text-tile-bg/60 text-sm text-center">
          {gameOverReason}
        </span>
      </motion.div>

      {/* final score */}
      <motion.div
        className="flex flex-col items-center gap-1"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="text-tile-bg/40 text-xs tracking-widest uppercase">
          Final Score
        </span>
        <span className="text-7xl font-bold text-amber-400">{score}</span>
      </motion.div>

      {/* buttons */}
      <motion.div
        className="flex gap-4 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <button
          onClick={() => {
            startGame();
            navigate("/game");
          }}
          className="flex-1 py-4 rounded-2xl bg-[#16a34a] 
                     text-white text-sm tracking-widest uppercase cursor-pointer
                     font-bold hover:bg-[#15803d] active:scale-95 transition-all"
        >
          Play Again
        </button>
        <button
          onClick={() => {
            startGame();
            navigate("/");
          }}
          className="flex-1 py-4 rounded-2xl border border-tile-bg/20
                     text-tile-bg/60 text-sm tracking-widest uppercase cursor-pointer
                     font-bold hover:border-tile-bg/40 hover:text-tile-bg/80 
                     active:scale-95 transition-all"
        >
          Main Menu
        </button>
      </motion.div>

      {/* special values */}
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <SpecialValues />
      </motion.div>

      {/* history */}
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <History />
      </motion.div>
    </div>
  );
}
