import { useCallback, useState } from "react";
import {
  addTextToSet,
  createTextSet,
  getTextSets,
  normalizeText,
  removeSet as removeSetFromSets,
  removeTextFromSet,
  saveTextSets,
} from "../utils/textSets";

export default function useTextSets() {
  const [sets, setSets] = useState(getTextSets);

  const addText = useCallback((setId: string, text: string) => {
    const clean = normalizeText(text);
    if (!clean) return;

    setSets((current) => {
      const updated = addTextToSet(current, setId, clean);
      saveTextSets(updated);
      return updated;
    });
  }, []);

  const addSet = useCallback((title: string) => {
    const clean = normalizeText(title);
    if (!clean) return null;

    const newSet = createTextSet(clean);
    setSets((current) => {
      const updated = [...current, newSet];
      saveTextSets(updated);
      return updated;
    });
    return newSet.id;
  }, []);

  const removeText = useCallback((setId: string, textIndex: number) => {
    setSets((current) => {
      const updated = removeTextFromSet(current, setId, textIndex);
      saveTextSets(updated);
      return updated;
    });
  }, []);

  const removeSet = useCallback((setId: string) => {
    setSets((current) => {
      if (current.length <= 1) return current;
      const updated = removeSetFromSets(current, setId);
      saveTextSets(updated);
      return updated;
    });
  }, []);

  return { sets, addText, addSet, removeText, removeSet };
}
