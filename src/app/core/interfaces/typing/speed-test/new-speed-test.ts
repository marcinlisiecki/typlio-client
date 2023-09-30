import { SpeedTestMode } from '@core/interfaces/typing/speed-test/speed-test-mode';
import { KeyHistogram } from '@core/interfaces/typing/key-histogram';

export interface NewSpeedTest {
  mode: SpeedTestMode;
  time: number;
  cpm: number;
  keyErrorsCount: number;
  accuracy: number;
  wpmHistory: number[];
  histogram: KeyHistogram[];
}
