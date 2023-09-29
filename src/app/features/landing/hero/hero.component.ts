import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, OnDestroy {
  authSub?: Subscription;
  isAuth: boolean = false;

  constructor(private authService: AuthService) {
    this.isAuth = authService.isAuth();
  }

  ngOnInit() {
    this.authSub = this.authService.isAuthObservable().subscribe((auth) => (this.isAuth = auth));
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }
}
