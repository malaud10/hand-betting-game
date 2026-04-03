import { useState } from "react";
import { useGameContext } from "../../hooks/useGameContext";
import ActionButtons from "./ActionButtons";
import History from "./History";
import ResultMessage from "./ResultMessage";
import SpecialValues from "./SpecialValues";
import TileHand from "./TileHand";
import { useNavigate } from "react-router";

export default function GameScreen() {
  const navigate = useNavigate();

  const [showHistory, setShowHistory] = useState(false);
  const {
    startGame,
    currentHand,
    specialValues,
    round,
    setIsRendering,
    score,
    streak,
    deckCount,
    discardCount,
    reshuffleCount,
    history,
  } = useGameContext();

  return (
    <div className="bg-game-bg min-h-dvh flex flex-col items-center justify-start gap-8  p-6">
      {/* top bar */}
      <div className="w-full flex justify-between items-center px-10">
        {/* exit */}
        <div className="flex items-center gap-3">
          {" "}
          <button
            onClick={() => {
              startGame();
              navigate("/");
            }}
            className="text-xs tracking-widest uppercase px-4 py-2 cursor-pointer
               rounded-xl border border-tile-bg/20 
               text-tile-bg/50 hover:text-tile-bg/80 transition-all"
          >
            ✖ Exit
          </button>
          {history.length > 0 && (
            <button
              onClick={() => setShowHistory((prev) => !prev)}
              className="text-xs tracking-widest uppercase px-4 py-2 cursor-pointer
               rounded-xl border border-tile-bg/20 
               text-tile-bg/50 hover:text-tile-bg/80 
               transition-all"
            >
              {showHistory ? "▲ History" : "▼ History"}
            </button>
          )}
        </div>

        {/* score + streak */}
        <div className="flex sm:gap-1 md:gap-4  md:flex-row flex-col md:items-center ">
          <div className="flex items-center gap-2">
            <span className="text-tile-bg/40 text-[10px] tracking-widest uppercase">
              Score
            </span>
            <span className="text-lg font-bold text-tile-bg">{score}</span>
          </div>
          {streak > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-tile-bg/40 text-[10px] tracking-widest uppercase">
                Streak
              </span>
              <span className="text-lg font-bold text-amber-400">
                {streak}x 🔥
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 justify-center text-xs tracking-widest uppercase">
        <div className="px-3 py-1.5 rounded-xl bg-tile-bg/5 border border-tile-bg/10 text-tile-bg/60">
          Draw <span className="text-tile-bg font-bold">{deckCount}</span>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-tile-bg/5 border border-tile-bg/10 text-tile-bg/60">
          Discard <span className="text-tile-bg font-bold">{discardCount}</span>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-tile-bg/5 border border-tile-bg/10 text-tile-bg/60">
          Reshuffles{" "}
          <span className="text-tile-bg font-bold">{reshuffleCount}/3</span>
        </div>
      </div>

      {/* special values */}
      <SpecialValues wrap />

      <div className="flex flex-col items-center gap-4  ">
        {/* current hand */}

        <TileHand
          tiles={currentHand}
          specialValues={specialValues}
          round={round}
          onRenderComplete={() => setIsRendering(false)}
        />

        {/* result message */}

        <ResultMessage />

        {/* buttons */}
        <ActionButtons />
      </div>
      {showHistory && <History />}
    </div>
  );
}
