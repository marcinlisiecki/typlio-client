import { Component, OnDestroy, OnInit } from '@angular/core';
import { MOCK_SPEED_TEST_TEXT } from '@core/mock/speed-test';
import { Word } from '@core/interfaces/speed-test/word';
import { Letter } from '@core/interfaces/speed-test/letter';
import { ALLOWED_CHARACTERS } from '@core/constants/speed-test';
import { generateWords } from '@core/utils/speed-test-generator/word-generator';
import { generateLettersFromWords } from '@core/utils/speed-test-generator/letter-generator';

@Component({
  selector: 'app-speed-test',
  templateUrl: './speed-test.component.html',
  styleUrls: ['./speed-test.component.scss'],
})
export class SpeedTestComponent implements OnInit, OnDestroy {
  text!: string;

  words: Word[] = [];
  letters: Letter[] = [];

  activeLetterIndex: number = 0;
  mistakes: Letter[] = [];

  constructor() {
    this.text = MOCK_SPEED_TEST_TEXT;

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
    if (e.key === 'Backspace') {
      this.handleBackspace(e.ctrlKey);
      return;
    }

    this.handleTypeLetter(e.key);
  };

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
