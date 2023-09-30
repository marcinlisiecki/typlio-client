import { Component, OnDestroy, OnInit } from '@angular/core';
import { Word } from '@core/interfaces/typing/word';
import { Letter } from '@core/interfaces/typing/letter';
import { ActivatedRoute } from '@angular/router';
import { SpeedTestMode } from '@core/interfaces/typing/speed-test/speed-test-mode';
import { TypingService } from '@core/services/typing/typing.service';
import { TypingType } from '@core/interfaces/typing/typing-type';
import { TypingStats } from '@core/interfaces/typing/typing-stats';
import { generateText } from '@core/utils/speed-test/speed-test-generator/text-generator';
import { speedTestModeToLabel } from '@core/utils/speed-test';
import {
  modeQueryToTypingType,
  getWordCountFromModeQuery,
  getTimeFromModeQuery,
} from '@core/utils/speed-test/mode';
import { SpeedTestService } from '@core/services/speed-test/speed-test.service';
import { NewSpeedTest } from '@core/interfaces/typing/speed-test/new-speed-test';
import { SpeedTest } from '@core/interfaces/typing/speed-test/speed-test';
import { HttpErrorResponse } from '@angular/common/http';
import { extractMessage } from '@core/utils/api-errors';
import { AuthService } from '@core/services/auth/auth.service';
import { KeyboardMissClicks } from '@core/interfaces/typing/keyboard/mistakes';
import { KeyHistogram } from '@core/interfaces/typing/key-histogram';

@Component({
  selector: 'app-speed-test',
  templateUrl: './speed-test.component.html',
  styleUrls: ['./speed-test.component.scss'],
})
export class SpeedTestComponent implements OnInit, OnDestroy {
  text!: string;
  mode!: SpeedTestMode;
  modeLabel!: string;
  type!: TypingType;
  finished: boolean = false;

  saved: boolean = false;
  savingError: string | null = null;
  keyboardMissClicks: KeyboardMissClicks = {};

  constructor(
    route: ActivatedRoute,
    private typingService: TypingService,
    private speedTestService: SpeedTestService,
    private authService: AuthService,
  ) {
    this.mode = route.snapshot.params['mode'];
    this.type = modeQueryToTypingType(this.mode);
    this.modeLabel = speedTestModeToLabel[this.mode].toUpperCase();

    this.generateNewText();
  }

  ngOnInit(): void {
    const time = parseInt(this.mode.replace('TIME_', ''));
    this.typingService.init(this.text, this.type, () => this.onFinish(), time);
  }

  ngOnDestroy(): void {
    this.typingService.quitTyping();
  }

  generateNewText() {
    const wordsCount: number = getWordCountFromModeQuery(this.mode);
    this.text = generateText(wordsCount);
  }

  nextSpeedTest() {
    this.generateNewText();
    const time = getTimeFromModeQuery(this.mode);
    this.typingService.init(this.text, this.type, () => this.onFinish(), time);
    this.finished = false;
    this.savingError = null;
  }

  repeatSameSpeedTest() {
    this.typingService.init(this.text, this.type, () => this.onFinish());
    this.finished = false;
    this.savingError = null;
  }

  onFinish() {
    this.finished = true;

    if (this.authService.isAuth()) {
      this.saveSpeedTest();
    }
  }

  saveSpeedTest() {
    const newSpeedTest: NewSpeedTest = {
      cpm: this.stats.cpm,
      time: this.time,
      mode: this.mode,
      accuracy: this.stats.accuracy,
      keyErrors: this.keyErrors.length,
      wpmHistory: this.stats.wpmHistory,
      histogram: this.keyHistogram,
    };

    this.speedTestService.saveSpeedTest(newSpeedTest).subscribe({
      next: (_: SpeedTest) => {
        this.saved = true;
      },
      error: (err: HttpErrorResponse) => {
        this.savingError = extractMessage(err);
      },
    });
  }

  get keyHistogram(): KeyHistogram[] {
    return this.typingService.keyHistogram;
  }

  get stats(): TypingStats {
    return this.typingService.stats;
  }

  get time(): number {
    return this.typingService.time;
  }

  get words(): Word[] {
    return this.typingService.words;
  }

  get activeLetterIndex(): number {
    return this.typingService.activeLetterIndex;
  }

  get keyErrors(): Letter[] {
    return this.typingService.keyErrors;
  }
}
