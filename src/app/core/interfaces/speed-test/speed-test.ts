import { SpeedTestMode } from '@core/interfaces/speed-test/speed-test-mode';

export interface SpeedTest {
  id: number;
  mode: SpeedTestMode;
  time: number;
  cpm: number;
  mistakes: number;
  accuracy: number;
  userId: number;
  wpmHistory: number[];
}
