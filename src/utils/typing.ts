export function splitWords(text: string) {
  return text.split(" ");
}

export function hasTypingError(text: string, input: string) {
  return !text.startsWith(input);
}

export function isBlockedSpace(word: string, value: string) {
  return value.endsWith(" ") && value !== word + " ";
}


export function isLastIndex(index: number, total: number) {
  return index === total - 1;
}

export function isWordDone(word: string, value: string, isLast: boolean) {
  if (value === word + " ") return true;
  return isLast && value === word;
}