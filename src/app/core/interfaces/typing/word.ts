import { Letter } from '@core/interfaces/typing/letter';

export interface Word {
  text: string;
  letters: Letter[];
  index: number;
}
