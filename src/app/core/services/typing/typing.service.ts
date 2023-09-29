import { Injectable } from '@angular/core';
import { TypingStats } from '@core/interfaces/typing/typing-stats';
import { DEFAULT_TYPING_STATS } from '@core/constants/typing';
import { TypingType } from '@core/interfaces/typing/typing-type';
import { TypingState } from '@core/interfaces/typing/typing-state';
import { Letter } from '@core/interfaces/typing/letter';
import { Word } from '@core/interfaces/typing/word';
import { generateWords } from '@core/utils/speed-test/speed-test-generator/word-generator';
import { generateLettersFromWords } from '@core/utils/speed-test/speed-test-generator/letter-generator';
import { calculateStats } from '@core/utils/typing/typing-calculator';
import { isTypedLetterValid } from '@core/utils/typing/typing-validator';

@Injectable({
  providedIn: 'root',
})
export class TypingService {
  text: string = '';
  type?: TypingType;
  state: TypingState = TypingState.WAITING;
  stats: TypingStats = DEFAULT_TYPING_STATS;
  timer?: any;
  time: number = 0;
  finishTime: number = 0;

  words: Word[] = [];
  letters: Letter[] = [];
  activeLetterIndex: number = 0;
  mistakes: Letter[] = [];
  missClicks: Letter[] = [];

  onFinish?: () => void;

  constructor() {}

  public init(text: string, type: TypingType, onFinish?: () => void, time?: number) {
    if (type === TypingType.TEXT) {
      this.finishTime = 0;
    } else {
      this.finishTime = time || 30;
    }

    this.time = 0;
    this.activeLetterIndex = 0;
    this.mistakes = [];
    this.missClicks = [];
    this.text = text;
    this.stats = { ...DEFAULT_TYPING_STATS, wpmHistory: [...DEFAULT_TYPING_STATS.wpmHistory] };
    this.type = type;
    this.state = TypingState.WAITING;
    this.onFinish = onFinish;

    this.words = generateWords(this.text);
    this.letters = generateLettersFromWords(this.words);

    document.addEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.state === TypingState.FINISHED) {
      return;
    }

    if (e.key === 'Backspace') {
      this.handleBackspace(e.ctrlKey);
      return;
    }

    if (this.state === TypingState.WAITING) {
      this.handleStart();
    }

    this.handleTypeLetter(e.key);
    this.scrollText();
    this.checkIfFinished();
  };

  scrollText() {
    const activeLetterRef = document.getElementById('letter-' + this.activeLetterIndex);
    activeLetterRef?.scrollIntoView();
    document.getElementsByClassName('no-scrollbar')[0].scrollBy(0, -50);
  }

  private tick() {
    this.time++;
    this.stats = calculateStats(
      this.activeLetterIndex,
      this.mistakes.length,
      this.time,
      this.stats.wpmHistory,
    );
    this.checkIfFinished();
  }

  private checkIfFinished() {
    if (this.state !== TypingState.RUNNING) return;
    if (
      (this.type === TypingType.TEXT && this.activeLetterIndex >= this.text.length) ||
      (this.type === TypingType.TIME && this.time >= this.finishTime)
    ) {
      this.finish();
    }
  }

  private finish() {
    this.stats = calculateStats(
      this.activeLetterIndex,
      this.mistakes.length,
      this.time,
      this.stats.wpmHistory,
    );
    clearInterval(this.timer);
    document.removeEventListener('keydown', this.handleKeyDown);

    if (this.onFinish) {
      this.onFinish();
    }
  }

  public quitTyping() {
    clearInterval(this.timer);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleTypeLetter(letter: string) {
    if (!isTypedLetterValid(letter)) {
      return;
    }

    let activeLetter: Letter = this.letters[this.activeLetterIndex];
    if (letter !== activeLetter.text) {
      this.mistakes.push(activeLetter);
      this.addMissClick(activeLetter);
    }

    this.activeLetterIndex++;
  }

  private addMissClick(letter: Letter) {
    if (this.missClicks.findIndex((l) => l.index == letter.index) !== -1) {
      return;
    }

    this.missClicks.push(letter);
  }

  private handleStart() {
    this.state = TypingState.RUNNING;
    this.timer = setInterval(() => this.tick(), 1000);
  }

  private removeMistake(index: number) {
    this.mistakes = this.mistakes.filter((mistake) => mistake.index !== index);
  }

  private handleBackspace(withCtrl: boolean = false) {
    if (this.activeLetterIndex === 0) {
      return;
    }

    if (withCtrl) {
      let newActiveLetterIndex = this.activeLetterIndex;

      // If active index is on first letter of a word, go back to previous word first.
      if (this.letters[this.activeLetterIndex - 1].text === ' ') {
        newActiveLetterIndex = this.activeLetterIndex - 2;
        this.removeMistake(this.activeLetterIndex - 1);
        this.removeMistake(this.activeLetterIndex - 2);
      }

      for (let i = newActiveLetterIndex - 1; i >= 0; i--) {
        if (this.letters[i].text === ' ') break;
        newActiveLetterIndex = i;
        this.removeMistake(i);
      }

      this.activeLetterIndex = newActiveLetterIndex;
      return;
    }

    this.activeLetterIndex--;
    const activeLetter: Letter = this.letters[this.activeLetterIndex];

    if (this.mistakes.includes(activeLetter)) {
      this.removeMistake(activeLetter.index);
    }
  }
}
