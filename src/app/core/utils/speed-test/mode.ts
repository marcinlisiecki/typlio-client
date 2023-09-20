import { TypingType } from '@core/interfaces/typing/typing-type';

export const modeQueryToTypingType = (mode: string): TypingType => {
  return mode.includes('WORDS') ? TypingType.TEXT : TypingType.TIME;
};

export const getWordCountFromModeQuery = (mode: string): number => {
  return modeQueryToTypingType(mode) === TypingType.TEXT
    ? parseInt(mode.replace('WORDS_', ''))
    : 1000;
};

export const getTimeFromModeQuery = (mode: string): number => {
  return parseInt(mode.replace('TIME_', ''));
};
