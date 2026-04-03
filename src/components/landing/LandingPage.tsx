import { useNavigate } from "react-router";
import { useGameContext } from "../../hooks/useGameContext";

const HOW_TO_PLAY = [
  ["🎴", "4 tiles are drawn each round"],
  ["🔮", "Guess Higher or Lower for the next hand"],
  ["✅", "Correct = +1 point"],
  ["🐉", "Special tiles: win +1 value, lose −1"],
  ["⚠️", "Tile hits 0 or 10 → game ends"],
  ["🔄", "3rd reshuffle → game ends"],
] as const;

export default function LandingPage() {
  const navigate = useNavigate();
  const { startGame } = useGameContext();

  return (
    <div className="text-center flex flex-col items-center justify-center gap-2 min-h-dvh">
      <div className="text-7xl animate-float drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
        🀄
      </div>

      <h1 className="font-cinzel animate-shimmer text-5xl font-black tracking-tighter leading-tight bg-linear-to-br from-yellow-300 via-amber-500 to-yellow-700 bg-clip-text text-transparent">
        Hand Betting
      </h1>

      <p className="text-sm text-stone-500 font-medium tracking-[4px] uppercase mb-5">
        Mahjong Tiles Edition
      </p>

      <div className="flex flex-col gap-3.5 w-full max-w-xs mb-4">
        <button
          onClick={() => {
            startGame();
            navigate("/game");
          }}
          className="px-8 py-4 text-lg font-bold text-stone-900 bg-linear-to-br from-yellow-300 to-amber-500 rounded-xl flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(232,168,48,0.35)] hover:scale-105 transition-transform cursor-pointer"
        >
          <span className="text-xl">⚡</span>
          New Game
        </button>

        <button
          onClick={() => {
            navigate("/leaderboard");
          }}
          className="px-8 py-3.5 text-base font-semibold text-yellow-300 bg-yellow-300/10 border border-yellow-300/25 rounded-xl flex items-center justify-center gap-2.5 hover:scale-105 hover:bg-yellow-300/15 transition-all cursor-pointer"
        >
          <span className="text-xl">🏆</span>
          Leaderboard
        </button>
      </div>

      <div className="rounded-xl p-4 px-6 mb-8 border border-white/8 bg-black/30 max-w-85 w-full text-left animate-fadeUp">
        <div className="text-[10px] text-white/40 uppercase tracking-[0.15em] mb-2.5 font-mono">
          How to play
        </div>
        {HOW_TO_PLAY.map(([icon, text], i) => (
          <div
            key={i}
            className="flex gap-2.5 items-start mb-2 last:mb-0 text-[13px] text-white/70"
          >
            <span className="text-base shrink-0">{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
