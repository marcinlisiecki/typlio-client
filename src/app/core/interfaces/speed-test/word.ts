import { Letter } from '@core/interfaces/speed-test/letter';

export interface Word {
  text: string;
  letters: Letter[];
  index: number;
}
