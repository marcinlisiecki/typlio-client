import { Component, Input, OnInit } from '@angular/core';
import { DEFAULT_KEY_HEIGHT, DEFAULT_KEY_WIDTH, KEYBOARD } from '@core/constants/typing/keyboard';
import { KeyboardMissClicks } from '@core/interfaces/typing/keyboard/mistakes';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {
  @Input() missClicks?: KeyboardMissClicks;
  @Input() totalLetters?: number;

  ngOnInit() {
    this.mapMissClicksToUpperCase();
  }

  mapMissClicksToUpperCase() {
    if (this.missClicks) {
      this.missClicks = Object.fromEntries(
        Object.entries(this.missClicks).map(([key, value]) => [key.toUpperCase(), value]),
      );
    }
  }

  generateColor(letter: string) {
    if (this.missClicks === undefined || !this.missClicks[letter]) {
      return 'rgb(15, 23, 42)';
    }

    const mistakesCount: number = this.missClicks[letter].miss;
    const totalLetterCount: number = this.missClicks[letter].total;

    const opacity = mistakesCount / totalLetterCount + 0.1;
    return `rgba(239, 68, 68, ${opacity})`;
  }

  protected readonly KEYBOARD = KEYBOARD;
  protected readonly DEFAULT_KEY_WIDTH = DEFAULT_KEY_WIDTH;
  protected readonly DEFAULT_KEY_HEIGHT = DEFAULT_KEY_HEIGHT;
}
