import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-heading',
  templateUrl: './page-heading.component.html',
  styleUrls: ['./page-heading.component.scss'],
})
export class PageHeadingComponent implements OnInit {
  @Input() steps: string[] = [];
  stepsString: string = '';

  ngOnInit(): void {
    this.stepsString = this.steps.join(' > ');
  }
}
