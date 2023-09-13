import { Word } from '@core/interfaces/speed-test/word';

export const generateWords = (text: string): Word[] => {
  let letterIndex = -1;

  return text.split(' ').map((wordText, wordIndex) => {
    if (wordIndex + 1 < text.split(' ').length) {
      wordText += ' ';
    }

    const newWord: Word = {
      index: wordIndex,
      text: wordText,
      letters: wordText.split('').map((letterText) => {
        letterIndex++;
        return {
          text: letterText,
          index: letterIndex,
        };
      }),
    };

    return newWord;
  });
};
