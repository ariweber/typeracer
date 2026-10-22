import { useCallback, useState } from "react";
import { clearLeaderboard, getLeaderboard, saveScore } from "../utils/leaderboard";
import type { Score } from "../types";

export default function useLeaderboard() {
  const [scores, setScores] = useState(getLeaderboard);

  const addScore = useCallback((score: Score) => {
    setScores(saveScore(score));
  }, []);

  const clearScores = useCallback(() => {
    setScores(clearLeaderboard());
  }, []);

  return { scores, addScore, clearScores };
}