import { type Tile } from "../../config/tiles";

interface TileProps {
  tile: Tile;
  faceDown?: boolean;
}

const TILE_CLASS = "relative w-25 h-35 rounded-[14px] bg-tile-bg shadow-lg";

export default function Tile({ tile, faceDown = false }: TileProps) {
  if (faceDown)
    return (
      <div className={`${TILE_CLASS} flex items-center justify-center`}>
        <div
          className="w-13.5 h-19.5 rounded-lg border-2 border-tile-border 
                      flex items-center justify-center text-3xl opacity-20"
        >
          🀫
        </div>
      </div>
    );

  const isSpecial = tile.type === "special";
  const accentColor = isSpecial ? tile.accentColor : "#b45309";

  return (
    <div
      className={`${TILE_CLASS} cursor-pointer transition-transform duration-200 hover:-translate-y-2`}
    >
      {/* corners */}
      <span
        className="absolute top-2 left-2 text-[11px] font-bold"
        style={{ color: accentColor }}
      >
        {isSpecial ? tile.abbreviation : tile.value}
      </span>
      <span
        className="absolute top-2 right-2 text-[11px] font-bold"
        style={{ color: accentColor }}
      >
        {tile.kanji}
      </span>

      {/* center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pt-4 pb-4">
        <span className="text-[28px] leading-none pb-1 pt-1">{tile.emoji}</span>
        <span
          className="text-[28px] font-bold leading-none"
          style={{ color: isSpecial ? accentColor : "#2c2118" }}
        >
          {tile.value}
        </span>
      </div>

      {/* label — special only */}
      {isSpecial && (
        <span
          className="absolute bottom-2 left-1/2 -translate-x-1/2 
                         text-[8px] tracking-wide whitespace-nowrap uppercase font-medium"
          style={{ color: accentColor }}
        >
          {tile.label}
        </span>
      )}
    </div>
  );
}
