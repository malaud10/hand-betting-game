import { TILE_REGISTRY, type Tile } from "../config/tiles";

const COPIES = 2;

// create a full deck with copies
export function createDeck(): Tile[] {
  const deck: Tile[] = [];

  for (const tile of Object.values(TILE_REGISTRY)) {
    for (let i = 0; i < COPIES; i++) {
      deck.push({ ...tile });
    }
  }

  return shuffle(deck);
}

// fisher-yates shuffle
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// draw n tiles from top of deck
export function drawTiles(
  deck: Tile[],
  count: number,
): {
  drawn: Tile[];
  remaining: Tile[];
} {
  return {
    drawn: deck.slice(0, count),
    remaining: deck.slice(count),
  };
}

// reshuffle discard + fresh deck together
export function reshuffle(discard: Tile[]): Tile[] {
  return shuffle([...createDeck(), ...discard]);
}

// total value of a hand
export function calcHandTotal(
  hand: Tile[],
  specialValues: Record<string, number>,
): number {
  return hand.reduce((sum, tile) => {
    const val = tile.type === "number" ? tile.value : specialValues[tile.id];
    return sum + val;
  }, 0);
}
