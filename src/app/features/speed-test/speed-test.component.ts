import { Component, OnDestroy, OnInit } from '@angular/core';
import { MOCK_SPEED_TEST_TEXT } from '@core/mock/speed-test';
import { Word } from '@core/interfaces/typing/word';
import { Letter } from '@core/interfaces/typing/letter';
import { ActivatedRoute } from '@angular/router';
import { SpeedTestMode } from '@core/interfaces/speed-test/speed-test-mode';
import { TypingService } from '@core/services/typing/typing.service';
import { TypingType } from '@core/interfaces/typing/typing-type';
import { TypingStats } from '@core/interfaces/typing/typing-stats';
import { DEFAULT_TYPING_STATS } from '@core/constants/typing';

@Component({
  selector: 'app-speed-test',
  templateUrl: './speed-test.component.html',
  styleUrls: ['./speed-test.component.scss'],
})
export class SpeedTestComponent implements OnInit, OnDestroy {
  text!: string;
  mode!: SpeedTestMode;
  finished: boolean = false;

  constructor(
    route: ActivatedRoute,
    private typingService: TypingService,
  ) {
    this.text = MOCK_SPEED_TEST_TEXT;
    this.mode = route.snapshot.params['mode'];
    this.finished = false;
  }

  ngOnInit(): void {
    this.typingService.init(this.text, TypingType.TEXT, () => this.onFinish());
  }

  ngOnDestroy(): void {
    this.typingService.quitTyping();
  }

  nextSpeedTest() {
    // TODO: Generate new text
    this.text = MOCK_SPEED_TEST_TEXT + ' XD';
    this.typingService.init(this.text, TypingType.TEXT, () => this.onFinish());
    this.finished = false;
  }

  repeatSameSpeedTest() {
    this.typingService.init(this.text, TypingType.TEXT, () => this.onFinish());
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

  protected readonly DEFAULT_TYPING_STATS = DEFAULT_TYPING_STATS;
}
