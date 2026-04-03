import { motion, AnimatePresence } from "framer-motion";
import { useGameContext } from "../../hooks/useGameContext";
import { useEffect, useRef, useState } from "react";

export default function ResultMessage() {
  const { result, round, affectedTiles } = useGameContext();
  const [currentResult, setCurrentResult] = useState<"win" | "lose" | null>(
    null,
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!result) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrentResult(result);
      timerRef.current = setTimeout(() => setCurrentResult(null), 3000);
    }, 0);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [round, result]);

  return (
    <div className="h-8 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {currentResult === "win" && (
          <motion.div
            key="win"
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="text-green-400 text-sm tracking-widest uppercase font-bold flex flex-col items-center"
          >
            <span className="text-green-400 text-sm tracking-widest uppercase font-bold">
              ✓ Correct! +1{" "}
            </span>
            <div className="flex  justify-center gap-1 mt-1">
              {affectedTiles.map((t) => (
                <span
                  key={t.label}
                  className="text-green-400/70 text-xs tracking-widest"
                >
                  (+1 {t.label})
                </span>
              ))}
            </div>
          </motion.div>
        )}
        {currentResult === "lose" && (
          <motion.div
            key="lose"
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="text-red-400 text-sm tracking-widest uppercase font-bold flex flex-col items-center"
          >
            <span className="text-red-400 text-sm tracking-widest uppercase font-bold">
              ✗ Wrong!{" "}
            </span>
            <div className="flex flex-wrap justify-center items-center gap-1 mt-1">
              {affectedTiles.map((t) => (
                <span
                  key={t.label}
                  className="text-red-400/70 text-xs tracking-widest"
                >
                  (-1 {t.label})
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
