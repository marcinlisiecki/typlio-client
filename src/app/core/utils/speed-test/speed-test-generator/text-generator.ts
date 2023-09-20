import { generate } from 'random-words';

export const generateText = (wordsCount: number): string => {
  return generate(wordsCount).join(' ');
};
