import { motion } from "framer-motion";
import Leaderboard from "./Leaderboard";
import { useNavigate } from "react-router";

export default function LeaderboardScreen() {
  const navigate = useNavigate();
  return (
    <div className="bg-game-bg min-h-dvh flex flex-col items-center p-6 gap-6">
      {/* top bar */}
      <div className="w-full flex justify-start">
        <button
          onClick={() => navigate("/")}
          className="text-xs tracking-widest uppercase px-4 py-2 
                     rounded-xl border border-tile-bg/20 cursor-pointer
                     text-tile-bg/50 hover:text-tile-bg/80 transition-all"
        >
          ✖ Exit
        </button>
      </div>

      {/* title */}
      <motion.div
        className="flex flex-col items-center gap-2 mt-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-amber-400 text-4xl">🏆</span>
        <span className="text-tile-bg text-2xl font-bold tracking-widest uppercase">
          Leaderboard
        </span>
        <span className="text-tile-bg/30 text-xs tracking-widest uppercase">
          Top 5 Scores
        </span>
      </motion.div>

      {/* leaderboard */}
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Leaderboard />
      </motion.div>
    </div>
  );
}
