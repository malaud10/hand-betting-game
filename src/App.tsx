import { Routes, Route, useNavigate } from "react-router";
import LandingPage from "./components/landing/LandingPage";
import GameScreen from "./components/game/GameScreen";
import { GameProvider } from "./context/GameContext.tsx";
import { useGameContext } from "./hooks/useGameContext";
import EndScreen from "./components/game/EndScreen";
import LeaderboardScreen from "./components/landing/LeaderboardScreen.tsx";
import { useEffect } from "react";

function AppContent() {
  const { gameOver } = useGameContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (gameOver) navigate("/end");
  }, [gameOver, navigate]);

  return (
    <div className="bg-game-bg min-h-dvh">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
        <Route path="/end" element={<EndScreen />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
