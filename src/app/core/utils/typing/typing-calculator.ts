import { TypingStats } from '@core/interfaces/typing/typing-stats';

export const calculateCpm = (letterIndex: number, mistakesCount: number, time: number): number => {
  return Math.round(((letterIndex - mistakesCount) / time) * 60);
};

export const calculateAccuracy = (letterIndex: number, mistakesCount: number): number => {
  return parseFloat((100 - (mistakesCount / letterIndex) * 100).toFixed(2));
};

export const calculateStats = (
  letterIndex: number,
  mistakesCount: number,
  time: number,
): TypingStats => {
  return {
    cpm: calculateCpm(letterIndex, mistakesCount, time),
    accuracy: calculateAccuracy(letterIndex, mistakesCount),
  };
};
