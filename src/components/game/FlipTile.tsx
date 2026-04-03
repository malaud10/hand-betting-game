import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Tile from "./Tile";
import { type Tile as TileType } from "../../config/tiles";
import TileBack from "./TileBack";

interface FlipTileProps {
  tile: TileType;
  delay: number;
  isLast?: boolean;
  onFlipComplete?: () => void;
}

function FlipTile({ tile, delay, isLast, onFlipComplete }: FlipTileProps) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlipped(true);
      if (isLast) onFlipComplete?.();
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, isLast, onFlipComplete]);

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{
          transformStyle: "preserve-3d",
          position: "relative",
          width: 76,
          height: 108,
        }}
      >
        {/* back */}
        <div
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            inset: 0,
          }}
        >
          <TileBack />
        </div>

        {/* front */}
        <div
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            inset: 0,
            transform: "rotateY(180deg)",
          }}
        >
          <Tile tile={tile} />
        </div>
      </motion.div>
    </div>
  );
}

export default FlipTile;
