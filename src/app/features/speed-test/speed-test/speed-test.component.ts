import { Component, OnDestroy, OnInit } from '@angular/core';
import { MOCK_SPEED_TEST_TEXT } from '@core/mock/speed-test';
import { Word } from '@core/interfaces/speed-test/word';
import { Letter } from '@core/interfaces/speed-test/letter';
import { ALLOWED_CHARACTERS } from '@core/constants/speed-test';

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
    this.generateWords();

    this.letters = this.letters.sort((a, b) => a.index - b.index);
  }

  ngOnInit(): void {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      const key = e.key;
      let activeLetter: Letter = this.letters[this.activeLetterIndex];

      if (key === 'Backspace') {
        this.handleBackspace();
        return;
      }

      if (!ALLOWED_CHARACTERS.includes(key.toLowerCase())) {
        return;
      }

      if (key !== activeLetter.text) {
        this.mistakes.push(activeLetter);
      }

      this.activeLetterIndex++;
    });
  }

  ngOnDestroy(): void {}

  handleBackspace() {
    if (this.activeLetterIndex === 0) {
      return;
    }

    this.activeLetterIndex--;
    const activeLetter: Letter = this.letters[this.activeLetterIndex];

    if (this.mistakes.includes(activeLetter)) {
      this.mistakes = this.mistakes.filter((mistake) => mistake.index !== activeLetter.index);
    }
  }

  generateWords() {
    this.letters = [];
    let letterIndex = -1;

    this.words = this.text.split(' ').map((wordText, wordIndex) => {
      if (wordIndex + 1 < this.text.split(' ').length) {
        wordText += ' ';
      }

      const newWord: Word = {
        index: wordIndex,
        text: wordText,
        letters: wordText.split('').map((letterText) => {
          letterIndex++;
          return {
            text: letterText,
            index: letterIndex,
          };
        }),
      };
      this.letters.push(...newWord.letters);

      return newWord;
    });
  }
}
