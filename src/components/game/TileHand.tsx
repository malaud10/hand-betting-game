import { motion } from "framer-motion";
import { type Tile as TileType } from "../../config/tiles";
import FlipTile from "./FlipTile";
import { calcHandTotal } from "../../utils/deck";

interface TileHandProps {
  tiles: TileType[];
  specialValues: Record<string, number>;
  round: number;
  onRenderComplete: () => void;
}

export default function TileHand({
  tiles,
  specialValues,
  round,
  onRenderComplete,
}: TileHandProps) {
  const total = calcHandTotal(tiles, specialValues);

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-tile-bg/40 text-xs tracking-widest uppercase">
        Current Hand
      </span>

      {/* tiles with flip animation */}
      <div className="grid grid-cols-2 gap-14  md:flex md:gap-12  justify-center mt-2 mb-14">
        {tiles.map((tile, i) => (
          <FlipTile
            key={`${tile.id}_${i}_${round}`}
            tile={{
              ...tile,
              value:
                tile.type === "special" ? specialValues[tile.id] : tile.value,
            }}
            delay={i * 100}
            isLast={i === tiles.length - 1}
            onFlipComplete={onRenderComplete}
          />
        ))}
      </div>

      {/* total */}
      <motion.div
        className="flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: tiles.length * 0.3 }}
      >
        <span className="text-tile-bg/40 text-xs tracking-widest uppercase">
          Hand Total
        </span>
        <span className="text-5xl font-bold text-amber-400">{total}</span>
      </motion.div>
    </div>
  );
}
