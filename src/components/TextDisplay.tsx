type TextDisplayProps = {
  words: string[];
  currentIndex: number;
  isHidden: boolean;
};

function getWordClass(index: number, currentIndex: number) {
  if (index < currentIndex) return "word done";
  if (index === currentIndex) return "word current";
  return "word";
}

export default function TextDisplay({ words, currentIndex, isHidden }: TextDisplayProps) {
  return (
    <p className={isHidden ? "text-display hidden" : "text-display"} dir="auto">
      {words.map((word, index) => (
        <span key={index} className={getWordClass(index, currentIndex)}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}