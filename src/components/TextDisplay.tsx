import { memo } from "react";
import { getWordClass } from "../utils/textDisplay";
import WordLetters from "./WordLetters";

type TextDisplayProps = {
  words: string[];
  currentIndex: number;
  input: string;
  isHidden: boolean;
};

function TextDisplay({ words, currentIndex, input, isHidden }: TextDisplayProps) {
  return (
    <p className={isHidden ? "text-display hidden" : "text-display"} dir="auto">
      {words.map((word, index) => (
        <span key={index} className={getWordClass(index, currentIndex)}>
          {index === currentIndex ? <WordLetters word={word} input={input} /> : word}
        </span>
      ))}
    </p>
  );
}

export default memo(TextDisplay);