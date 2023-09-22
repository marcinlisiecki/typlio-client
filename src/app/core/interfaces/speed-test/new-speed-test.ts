import { SpeedTestMode } from '@core/interfaces/speed-test/speed-test-mode';

export interface NewSpeedTest {
  mode: SpeedTestMode;
  time: number;
  cpm: number;
  mistakes: number;
  accuracy: number;
  wpmHistory: number[];
}
