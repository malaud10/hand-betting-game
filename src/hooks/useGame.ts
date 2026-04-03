import { useState, useCallback } from "react";
import type { Tile } from "../config/tiles";
import { createDeck, drawTiles, reshuffle, calcHandTotal } from "../utils/deck";

// ─── Constants ───────────────────────────────────────────────
const TILES_PER_HAND = 4;
const MAX_RESHUFFLES = 3;
const SPECIAL_MIN = 0;
const SPECIAL_MAX = 10;

// ─── Types ───────────────────────────────────────────────────
export interface HandHistory {
  tiles: Tile[];
  total: number;
  nextTotal: number;
  won: boolean;
  specialValuesSnapshot: Record<string, number>;
}

interface AffectedTile {
  label: string;
  change: number;
}

interface GameState {
  deck: Tile[];
  discard: Tile[];
  currentHand: Tile[];
  specialValues: Record<string, number>;
  history: HandHistory[];
  score: number;
  streak: number;
  reshuffleCount: number;
  round: number;
  result: "win" | "lose" | null;
  affectedTiles: AffectedTile[];
  isRendering: boolean;
  gameOver: boolean;
  gameOverReason: string;
}

// ─── Helpers ─────────────────────────────────────────────────
function initSpecialValues(): Record<string, number> {
  const ids = [
    "dragon_red",
    "dragon_green",
    "dragon_white",
    "wind_east",
    "wind_south",
    "wind_west",
    "wind_north",
  ];
  return Object.fromEntries(ids.map((id) => [id, 5]));
}

function initState(): GameState {
  const deck = createDeck();
  const { drawn, remaining } = drawTiles(deck, TILES_PER_HAND);
  return {
    deck: remaining,
    discard: [],
    currentHand: drawn,
    specialValues: initSpecialValues(),
    history: [],
    score: 0,
    streak: 0,
    reshuffleCount: 0,
    round: 1,
    result: null,
    affectedTiles: [],
    isRendering: true,
    gameOver: false,
    gameOverReason: "",
  };
}

function updateSpecialValues(
  hand: Tile[],
  specialValues: Record<string, number>,
  won: boolean,
): {
  newSpecialValues: Record<string, number>;
  gameOver: boolean;
  gameOverReason: string;
  affected: AffectedTile[];
} {
  const newSpecialValues = { ...specialValues };
  let gameOver = false;
  let gameOverReason = "";
  const affected: AffectedTile[] = [];

  hand.forEach((tile) => {
    if (tile.type !== "special") return;
    const change = won ? 1 : -1;
    newSpecialValues[tile.id] += change;
    affected.push({ label: tile.label!, change });

    if (
      newSpecialValues[tile.id] <= SPECIAL_MIN ||
      newSpecialValues[tile.id] >= SPECIAL_MAX
    ) {
      gameOver = true;
      gameOverReason = `${tile.label} reached ${newSpecialValues[tile.id]}`;
    }
  });

  return { newSpecialValues, gameOver, gameOverReason, affected };
}

// ─── Hook ─────────────────────────────────────────────────────
export function useGame() {
  const [state, setState] = useState<GameState>(initState);

  const startGame = useCallback(() => setState(initState()), []);

  const setIsRendering = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, isRendering: value }));
  }, []);

  const placeBet = useCallback((direction: "higher" | "lower") => {
    setState((prev) => {
      if (prev.gameOver) return prev;

      const { deck, discard, specialValues } = prev;
      let { reshuffleCount } = prev;

      // draw next hand
      const { drawn: nextHand, remaining: newDeck } = drawTiles(
        deck,
        TILES_PER_HAND,
      );
      let finalDeck = newDeck;
      let finalDiscard = [...discard, ...prev.currentHand];

      // reshuffle after drawing if needed
      if (finalDeck.length < TILES_PER_HAND) {
        if (reshuffleCount >= MAX_RESHUFFLES) {
          return {
            ...prev,
            gameOver: true,
            gameOverReason: `Draw pile ran out ${MAX_RESHUFFLES} times`,
          };
        }
        finalDeck = reshuffle(finalDiscard);
        finalDiscard = [];
        reshuffleCount += 1;
      }

      // calculate result
      const currentTotal = calcHandTotal(prev.currentHand, specialValues);
      const nextTotal = calcHandTotal(nextHand, specialValues);
      const won =
        direction === "higher"
          ? nextTotal > currentTotal
          : nextTotal < currentTotal;

      // update special values
      const { newSpecialValues, gameOver, gameOverReason, affected } =
        updateSpecialValues(prev.currentHand, specialValues, won);

      return {
        ...prev,
        deck: finalDeck,
        discard: finalDiscard,
        currentHand: nextHand,
        specialValues: newSpecialValues,
        history: [
          {
            tiles: prev.currentHand,
            total: currentTotal,
            nextTotal,
            won,
            specialValuesSnapshot: { ...specialValues },
          },
          ...prev.history,
        ],
        score: won ? prev.score + 1 : prev.score,
        streak: won ? prev.streak + 1 : 0,
        reshuffleCount,
        round: prev.round + 1,
        result: won ? "win" : "lose",
        affectedTiles: affected,
        isRendering: true,
        gameOver,
        gameOverReason,
      };
    });
  }, []);

  return {
    ...state,
    startGame,
    placeBet,
    setIsRendering,
    deckCount: state.deck.length,
    discardCount: state.discard.length,
  };
}
