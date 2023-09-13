import { Word } from '@core/interfaces/speed-test/word';
import { Letter } from '@core/interfaces/speed-test/letter';

export const generateLettersFromWords = (words: Word[]): Letter[] => {
  let index = -1;
  let letters: Letter[] = [];

  words.forEach((word) => {
    index++;
    letters.push(...word.letters);
  });

  letters = letters.sort((a, b) => a.index - b.index);
  return letters;
};
