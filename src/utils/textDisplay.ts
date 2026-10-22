export function getWordClass(index: number, currentIndex: number) {
  if (index < currentIndex) return "word done";
  if (index === currentIndex) return "word current";
  return "word";
}

export function getLetterClass(letter: string, index: number, input: string) {
  if (index === input.length) return "letter next";
  if (index > input.length) return "letter";
  if (input[index] === letter) return "letter correct";
  return "letter wrong";
}