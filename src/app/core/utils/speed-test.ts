import { SpeedTestMode } from '@core/interfaces/typing/speed-test/speed-test-mode';

export const speedTestModeToLabel = {
  [SpeedTestMode.WORDS_10]: '10 Words',
  [SpeedTestMode.WORDS_50]: '50 Words',
  [SpeedTestMode.WORDS_100]: '100 Words',
  [SpeedTestMode.WORDS_200]: '200 Words',
  [SpeedTestMode.TIME_60]: '1 Minute',
  [SpeedTestMode.TIME_120]: '2 Minutes',
};
