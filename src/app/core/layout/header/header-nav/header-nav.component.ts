import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { JwtService } from '@core/services/auth/jwt.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit, OnDestroy {
  authSub?: Subscription;
  userDropdownItems?: MenuItem[];

  isLoggedIn: boolean = false;
  username: string | null = null;
  userId: number | null = null;
  usernameFirstLetter: string | null = null;

  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  ngOnInit(): void {
    this.handleAuth();
    this.handleSetUserDropdownItems();
  }

  handleSetUserDropdownItems() {
    this.userDropdownItems = [
      {
        label: 'History',
        icon: 'pi pi-history',
        routerLink: `/users/${this.userId}/history`,
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        routerLink: `/users/${this.userId}/settings`,
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: (_) => {
          this.authService.logout();
        },
      },
    ];
  }

  handleAuth() {
    this.isLoggedIn = this.authService.isAuth();
    this.authSub = this.authService.isAuthObservable().subscribe({
      next: (isAuth) => {
        this.isLoggedIn = isAuth;
        this.setUsername();
        this.handleSetUserDropdownItems();
      },
    });

    this.setUsername();
  }

  setUsername() {
    if (this.isLoggedIn) {
      this.username = this.jwtService.getUsername();
      this.userId = this.jwtService.getId();
      this.usernameFirstLetter = this.username?.charAt(0) || null;
    } else {
      this.username = null;
      this.userId = null;
      this.usernameFirstLetter = null;
    }
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}
