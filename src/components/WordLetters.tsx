import { getLetterClass } from "../utils/textDisplay";

type WordLettersProps = {
  word: string;
  input: string;
};

export default function WordLetters({ word, input }: WordLettersProps) {
  return word.split("").map((letter, index) => (
    <span key={index} className={getLetterClass(letter, index, input)}>
      {letter}
    </span>
  ));
}