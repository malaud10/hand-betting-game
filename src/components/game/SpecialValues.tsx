import { useGameContext } from "../../hooks/useGameContext";
import { TILE_REGISTRY } from "../../config/tiles";

interface SpecialValuesProps {
  wrap?: boolean;
}

const SPECIAL_TILES = Object.values(TILE_REGISTRY).filter(
  (t) => t.type === "special",
);

export default function SpecialValues({ wrap = false }: SpecialValuesProps) {
  const { specialValues } = useGameContext();

  return (
    <div className="rounded-xl  border border-tile-bg/10 bg-tile-bg/5 p-3 w-full max-w-2xl">
      <span className=" text-tile-bg/30 text-[9px] tracking-widest uppercase mb-2 block">
        Special Values
      </span>
      <div className="flex gap-2 flex-wrap   ">
        {SPECIAL_TILES.map((tile) => (
          <div
            key={tile.id}
            className={`flex ${wrap ? "lg:flex-1" : ""} items-center gap-1 px-2 py-1 rounded-lg bg-tile-bg/5 text-[10px]`}
            style={{ border: `1px solid ${tile.accentColor}40` }}
          >
            <span style={{ color: tile.accentColor }} className="font-bold">
              {specialValues[tile.id]}
            </span>
            <span className="text-tile-bg/40">{tile.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
