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
  currentWpmHistory: number[],
): TypingStats => {
  const cpm = calculateCpm(letterIndex, mistakesCount, time);
  const wpm = Math.round(cpm / 5);

  const newWpmHistory = currentWpmHistory;
  newWpmHistory[time - 1] = isNaN(wpm) ? newWpmHistory[time] : Math.round(cpm / 5);

  return {
    cpm,
    accuracy: calculateAccuracy(letterIndex, mistakesCount),
    wpmHistory: newWpmHistory,
  };
};
