export function countWords(texts: string[]) {
  return texts.join(" ").split(" ").length;
}

export function calculateWpm(totalWords: number, seconds: number) {
  if (seconds === 0) return 0;
  return Math.round((totalWords / seconds) * 60);
}