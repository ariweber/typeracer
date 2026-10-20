export function splitWords(text: string) {
  return text.split(" ");
}

export function getCurrentWordIndex(input: string) {
  return input.split(" ").length - 1;
}

export function hasTypingError(text: string, input: string) {
  return !text.startsWith(input);
}

export function isBlockedSpace(text: string, value: string) {
  return value.endsWith(" ") && hasTypingError(text, value);
}

export function isTextComplete(text: string, value: string) {
  return value === text;
}

export function isLastText(textIndex: number, totalTexts: number) {
  return textIndex === totalTexts - 1;
}