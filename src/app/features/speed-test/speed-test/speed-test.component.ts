import { Component, OnDestroy, OnInit } from '@angular/core';
import { MOCK_SPEED_TEST_TEXT } from '@core/mock/speed-test';
import { Word } from '@core/interfaces/speed-test/word';
import { Letter } from '@core/interfaces/speed-test/letter';
import { ALLOWED_CHARACTERS } from '@core/constants/speed-test';
import { generateWords } from '@core/utils/speed-test-generator/word-generator';
import { generateLettersFromWords } from '@core/utils/speed-test-generator/letter-generator';
import { SpeedTestState } from '@core/interfaces/speed-test/speed-test-state';
import { ActivatedRoute } from '@angular/router';
import { SpeedTestMode } from '@core/interfaces/speed-test/speed-test-mode';

@Component({
  selector: 'app-speed-test',
  templateUrl: './speed-test.component.html',
  styleUrls: ['./speed-test.component.scss'],
})
export class SpeedTestComponent implements OnInit, OnDestroy {
  text!: string;
  state: SpeedTestState = SpeedTestState.WAITING;
  timer?: any;
  time: number = 0;
  cpm: number = 0;
  accuracy: number = 100;
  mode!: SpeedTestMode;

  words: Word[] = [];
  letters: Letter[] = [];

  activeLetterIndex: number = 0;
  mistakes: Letter[] = [];

  constructor(private route: ActivatedRoute) {
    this.text = MOCK_SPEED_TEST_TEXT;

    this.mode = route.snapshot.params['mode'];

    this.words = generateWords(this.text);
    this.letters = generateLettersFromWords(this.words);
  }

  ngOnInit(): void {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (this.state === SpeedTestState.FINISHED) {
      return;
    }

    if (e.key === 'Backspace') {
      this.handleBackspace(e.ctrlKey);
      return;
    }

    if (this.state === SpeedTestState.WAITING) {
      this.handleStart();
    }

    this.handleTypeLetter(e.key);
    this.checkIfFinished();
  };

  handleStart() {
    this.state = SpeedTestState.RUNNING;
    this.timer = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.time++;

    this.cpm = Math.round(((this.activeLetterIndex - this.mistakes.length) / this.time) * 60);
    this.accuracy = parseFloat(
      (100 - (this.mistakes.length / this.activeLetterIndex) * 100).toFixed(2),
    );

    this.checkIfFinished();
  }

  checkIfFinished() {
    if (this.state !== SpeedTestState.RUNNING) {
      return;
    }

    if (this.mode.includes('W') && this.activeLetterIndex >= this.text.length) {
      this.finish();
    }
  }

  finish() {
    clearInterval(this.timer);
    alert('end');
  }

  handleTypeLetter(letter: string) {
    if (!this.isTypedLetterValid(letter)) {
      return;
    }

    let activeLetter: Letter = this.letters[this.activeLetterIndex];

    if (letter !== activeLetter.text) {
      this.mistakes.push(activeLetter);
    }

    this.activeLetterIndex++;
  }

  isTypedLetterValid(letter: string): boolean {
    return ALLOWED_CHARACTERS.includes(letter.toLowerCase());
  }

  removeMistake(index: number) {
    this.mistakes = this.mistakes.filter((mistake) => mistake.index !== index);
  }

  handleBackspace(withCtrl: boolean = false) {
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
