import { createContext } from "react";
import type { useGame } from "../hooks/useGame";

type GameContextType = ReturnType<typeof useGame>;
export const GameContext = createContext<GameContextType | null>(null);
