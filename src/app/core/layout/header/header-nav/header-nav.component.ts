import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit, OnDestroy {
  authSub?: Subscription;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.handleAuth();
  }

  handleAuth() {
    this.isLoggedIn = this.authService.isAuth();
    this.authSub = this.authService.isAuthObservable().subscribe({
      next: (isAuth) => {
        this.isLoggedIn = isAuth;
      },
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  handleLogout() {
    this.authService.logout();
  }
}
