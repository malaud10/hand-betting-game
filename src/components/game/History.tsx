import { motion, AnimatePresence } from "framer-motion";
import { useGameContext } from "../../hooks/useGameContext";
import Tile from "./Tile";

export default function History() {
  const { history } = useGameContext();

  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-2xl  flex flex-col gap-3 ">
      <AnimatePresence>
        {history.map((h, i) => (
          <motion.div
            key={`hand-${history.length - i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full rounded-xl border border-tile-bg/10 bg-tile-bg/5 px-3 py-2 h-40 "
          >
            {/* header */}
            <div className="flex justify-between items-center ">
              <span className="text-tile-bg/40 text-xs tracking-widest uppercase">
                Hand #{history.length - i}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-tile-bg font-bold text-sm">
                  {h.total}
                </span>
                <div
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold
                  ${
                    h.won
                      ? "bg-green-400/20 text-green-400 border border-green-400/30"
                      : "bg-red-400/20 text-red-400 border border-red-400/30"
                  }`}
                >
                  {h.nextTotal > h.total ? "▲" : "▼"}
                  {h.won ? "✓" : "✗"}
                </div>
              </div>
            </div>

            {/* tiles */}
            <div
              className="flex gap-5 justify-center items-center "
              style={{ transform: "scale(0.6)", transformOrigin: "center" }}
            >
              {h.tiles.map((tile, j) => (
                <Tile
                  key={j}
                  tile={{
                    ...tile,
                    value:
                      tile.type === "special"
                        ? h.specialValuesSnapshot[tile.id]
                        : tile.value,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
