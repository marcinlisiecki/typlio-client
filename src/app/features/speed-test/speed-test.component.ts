import { Component, OnDestroy, OnInit } from '@angular/core';
import { Word } from '@core/interfaces/typing/word';
import { Letter } from '@core/interfaces/typing/letter';
import { ActivatedRoute } from '@angular/router';
import { SpeedTestMode } from '@core/interfaces/speed-test/speed-test-mode';
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

  constructor(
    route: ActivatedRoute,
    private typingService: TypingService,
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
  }

  repeatSameSpeedTest() {
    this.typingService.init(this.text, this.type, () => this.onFinish());
    this.finished = false;
  }

  onFinish() {
    this.finished = true;
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

  get mistakes(): Letter[] {
    return this.typingService.mistakes;
  }
}
