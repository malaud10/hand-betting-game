import { type ReactNode } from "react";
import { useGame } from "../hooks/useGame";
import { GameContext } from "./gameContext.ts";

export function GameProvider({ children }: { children: ReactNode }) {
  const game = useGame();
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}
