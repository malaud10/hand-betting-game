interface LeaderboardEntry {
  score: number;
  date: string;
}

export default function Leaderboard() {
  const scores: LeaderboardEntry[] = JSON.parse(
    localStorage.getItem("leaderboard") || "[]",
  );

  if (scores.length === 0)
    return (
      <div className="text-tile-bg/30 text-xs tracking-widest uppercase text-center">
        No scores yet
      </div>
    );

  return (
    <div className="w-full max-w-sm flex flex-col gap-2">
      {scores.map((entry, i) => (
        <div
          key={i}
          className="flex justify-between items-center px-4 py-2
                     rounded-xl bg-tile-bg/5 border border-tile-bg/10"
        >
          <div className="flex items-center gap-3">
            <span
              className={`text-sm font-bold ${
                i === 0
                  ? "text-amber-400"
                  : i === 1
                    ? "text-tile-bg/60"
                    : i === 2
                      ? "text-amber-700"
                      : "text-tile-bg/30"
              }`}
            >
              #{i + 1}
            </span>
            <span className="text-tile-bg font-bold text-lg">
              {entry.score}
            </span>
          </div>
          <span className="text-tile-bg/30 text-xs">{entry.date}</span>
        </div>
      ))}
    </div>
  );
}
