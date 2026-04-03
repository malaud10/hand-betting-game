// types
export type SuitName = "bamboo" | "character" | "dots";
export type DragonName = "red" | "green" | "white";
export type WindName = "east" | "south" | "west" | "north";
export type TileType = "number" | "special";

export interface Tile {
  id: string;
  type: TileType;
  value: number;
  emoji: string;
  kanji: string;
  label?: string;
  accentColor?: string;
  abbreviation?: string;
}

// config
const SUIT_CONFIG: Record<SuitName, { kanji: string; emoji: string }> = {
  bamboo: { kanji: "竹", emoji: "🎋" },
  character: { kanji: "萬", emoji: "🀄" },
  dots: { kanji: "筒", emoji: "⭕" },
};

const HONOR_CONFIG = {
  dragon: {
    red: {
      kanji: "中",
      emoji: "🐉",
      label: "Red Dragon",
      accentColor: "#dc2626",
      abbreviation: "DR",
    },
    green: {
      kanji: "發",
      emoji: "🐉",
      label: "Green Dragon",
      accentColor: "#16a34a",
      abbreviation: "DG",
    },
    white: {
      kanji: "白",
      emoji: "🐉",
      label: "White Dragon",
      accentColor: "#64748b",
      abbreviation: "DW",
    },
  },
  wind: {
    east: {
      kanji: "東",
      emoji: "💨",
      label: "East Wind",
      accentColor: "#7c3aed",
      abbreviation: "WE",
    },
    south: {
      kanji: "南",
      emoji: "💨",
      label: "South Wind",
      accentColor: "#0369a1",
      abbreviation: "WS",
    },
    west: {
      kanji: "西",
      emoji: "💨",
      label: "West Wind",
      accentColor: "#b45309",
      abbreviation: "WW",
    },
    north: {
      kanji: "北",
      emoji: "💨",
      label: "North Wind",
      accentColor: "#0f766e",
      abbreviation: "WN",
    },
  },
};

// build registry
export function buildTileRegistry(): Record<string, Tile> {
  const registry: Record<string, Tile> = {};

  // number tiles
  for (const [suit, config] of Object.entries(SUIT_CONFIG)) {
    for (let n = 1; n <= 9; n++) {
      const id = `${suit}_${n}`;
      registry[id] = {
        id,
        type: "number",
        value: n,
        emoji: config.emoji,
        kanji: config.kanji,
      };
    }
  }

  // honor tiles
  for (const [type, names] of Object.entries(HONOR_CONFIG)) {
    for (const [name, config] of Object.entries(names)) {
      const id = `${type}_${name}`;
      registry[id] = {
        id,
        type: "special",
        value: 5,
        emoji: config.emoji,
        kanji: config.kanji,
        label: config.label,
        accentColor: config.accentColor,
        abbreviation: config.abbreviation,
      };
    }
  }

  return registry;
}

export const TILE_REGISTRY = buildTileRegistry();
