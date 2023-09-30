import { Component, Input } from '@angular/core';
import { KeyHistogram } from '@core/interfaces/typing/key-histogram';

@Component({
  selector: 'app-typos-map',
  templateUrl: './typos-map.component.html',
  styleUrls: ['./typos-map.component.scss'],
})
export class TyposMapComponent {
  @Input({ required: true }) keyHistogram!: KeyHistogram[];
}
