import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_KEY_WIDTH, KEYBOARD } from '@core/constants/typing/keyboard';
import { KeyHistogram, KeyHistogramMap } from '@core/interfaces/typing/key-histogram';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  @Input() histogram?: KeyHistogram[];
  @Input() totalLetters?: number;

  histogramMap: KeyHistogramMap = {};

  ngOnInit() {
    this.generateHistogramMap();
  }

  generateHistogramMap() {
    if (!this.histogram) {
      return;
    }

    this.histogram.forEach((item) => {
      this.histogramMap[item.keyCode] = {
        hitCount: item.hitCount,
        missCount: item.missCount,
      };
    });
  }

  getHistogramIndex(code: number): number {
    if (this.histogram === undefined) {
      return -1;
    }

    return this.histogram?.findIndex((item) => item.keyCode === code);
  }

  generateColor(code: number) {
    if (this.histogram === undefined) {
      return 'rgb(15, 23, 42)';
    }

    const histogramIndex = this.getHistogramIndex(code);
    if (histogramIndex === -1 || this.histogram[histogramIndex].missCount === 0) {
      return 'rgb(15, 23, 42)';
    }

    const mistakesCount: number = this.histogram[histogramIndex].missCount;
    const totalLetterCount: number = this.histogram[histogramIndex].hitCount;

    const opacity = mistakesCount / totalLetterCount + 0.1;
    return `rgba(239, 68, 68, ${opacity})`;
  }

  protected readonly KEYBOARD = KEYBOARD;
  protected readonly DEFAULT_KEY_WIDTH = DEFAULT_KEY_WIDTH;
}
