import type { TextSet } from "../types";
import { defaultSets } from "../data/texts";

const STORAGE_KEY = "typeracer-sets";

export function getTextSets(): TextSet[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultSets;
    const sets = JSON.parse(saved);
    return Array.isArray(sets) && sets.length > 0 ? sets : defaultSets;
  } catch {
    return defaultSets;
  }
}

export function saveTextSets(sets: TextSet[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sets));
}

export function normalizeText(text: string) {
  return text.trim().split(/\s+/).join(" ");
}

export function createTextSet(title: string): TextSet {
  return { id: crypto.randomUUID(), title, texts: [] };
}

export function addTextToSet(sets: TextSet[], setId: string, text: string) {
  return sets.map((
    set,
  ) => (set.id === setId ? { ...set, texts: [...set.texts, text] } : set));
}

export function removeTextFromSet(
  sets: TextSet[],
  setId: string,
  textIndex: number,
) {
  return sets.map((set) =>
    set.id === setId
      ? { ...set, texts: set.texts.filter((_, index) => index !== textIndex) }
      : set
  );
}

export function removeSet(sets: TextSet[], setId: string) {
  return sets.filter((set) => set.id !== setId);
}

export function splitSentences(text: string) {
  return text
    .split(/\n+|(?<=[.!?])\s+/)
    .map((sentence) => normalizeText(sentence).replace(/\.+$/, ""))
    .filter(Boolean);
}
