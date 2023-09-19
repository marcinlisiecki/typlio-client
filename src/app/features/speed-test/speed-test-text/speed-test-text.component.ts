import { Component, Input } from '@angular/core';
import { Word } from '@core/interfaces/typing/word';
import { Letter } from '@core/interfaces/typing/letter';

@Component({
  selector: 'app-speed-test-text',
  templateUrl: './speed-test-text.component.html',
  styleUrls: ['./speed-test-text.component.scss'],
})
export class SpeedTestTextComponent {
  @Input() activeLetterIndex: number = 0;
  @Input() words?: Word[];
  @Input() mistakes?: Letter[];
}
