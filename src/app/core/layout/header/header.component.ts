import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isHeaderSmall: boolean = false;

  ngOnInit(): void {
    window.addEventListener('scroll', () => this.changeHeaderState());
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', () => this.changeHeaderState());
  }

  changeHeaderState() {
    if (!this.isHeaderSmall && window.scrollY > 0) {
      this.isHeaderSmall = true;
    } else if (this.isHeaderSmall && window.scrollY === 0) {
      this.isHeaderSmall = false;
    }
  }
}
