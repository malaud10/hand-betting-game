import { useGameContext } from "../../hooks/useGameContext";
import { motion } from "framer-motion";

function ActionButtons() {
  const { placeBet, isRendering } = useGameContext();

  return (
    <>
      {!isRendering && (
        <motion.div
          className="flex gap-4 w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => placeBet("higher")}
            className="flex-1 py-4 rounded-2xl bg-[#16a34a] 
                   text-white text-sm tracking-widest uppercase 
                   font-bold hover:bg-[#15803d] active:scale-95 cursor-pointer
                   transition-all flex items-center justify-center gap-2"
          >
            ▲ Higher
          </button>

          <button
            onClick={() => placeBet("lower")}
            className="flex-1 py-4 rounded-2xl bg-[#dc2626] 
                   text-white text-sm tracking-widest uppercase 
                   font-bold hover:bg-[#b91c1c] active:scale-95 cursor-pointer
                   transition-all flex items-center justify-center gap-2"
          >
            ▼ Lower
          </button>
        </motion.div>
      )}
    </>
  );
}

export default ActionButtons;
