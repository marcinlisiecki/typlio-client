import { ALLOWED_CHARACTERS } from '@core/constants/speed-test';

export const isTypedLetterValid = (letter: string): boolean => {
  return ALLOWED_CHARACTERS.includes(letter.toLowerCase());
};
