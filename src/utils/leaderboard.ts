import type { Score } from "../types";

const STORAGE_KEY = "typeracer-top";
const MAX_SCORES = 5;

export function getLeaderboard(): Score[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];
  return JSON.parse(saved);
}

export function saveScore(score: Score) {
  const updated = [...getLeaderboard(), score]
    .sort((a, b) => b.wpm - a.wpm)
    .slice(0, MAX_SCORES);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearLeaderboard(): Score[] {
  localStorage.removeItem(STORAGE_KEY);
  return [];
}

export function saveLeaderboard(scores: Score[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

export function rankScores(scores: Score[]) {
  return [...scores].sort((a, b) => b.wpm - a.wpm).slice(0, MAX_SCORES);
}