import { SpeedTestMode } from '@core/interfaces/typing/speed-test/speed-test-mode';
import { KeyHistogram } from '@core/interfaces/typing/key-histogram';

export interface SpeedTest {
  id: number;
  mode: SpeedTestMode;
  time: number;
  cpm: number;
  mistakes: number;
  accuracy: number;
  userId: number;
  wpmHistory: number[];
  histogram: KeyHistogram[];
  createdAt: Date;
}
