import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { JwtService } from '@core/services/auth/jwt.service';
import { MenuItem } from 'primeng/api';
import { LanguageService } from '@core/services/language/language.service';
import { Language } from '@core/interfaces/common/language';
import { LANGUAGES } from '@core/constants/languages';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit, OnDestroy {
  authSub?: Subscription;
  langSub?: Subscription;

  userDropdownItems?: MenuItem[];

  isLoggedIn: boolean = false;
  username: string | null = null;
  userId: number | null = null;
  usernameFirstLetter: string | null = null;

  languages: Language[] = LANGUAGES;
  selectedLanguage: string;

  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private languageService: LanguageService,
  ) {
    this.selectedLanguage = languageService.currentLang;
  }

  ngOnInit(): void {
    this.handleAuth();

    this.langSub = this.languageService.onLangChange.subscribe((change) => {
      this.selectedLanguage = change.lang;
      this.handleSetUserDropdownItems();
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.langSub?.unsubscribe();
  }

  setLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }

  handleSetUserDropdownItems() {
    this.userDropdownItems = [
      {
        label: this.languageService.instant('user.dropdown.history'),
        icon: 'pi pi-history',
        routerLink: `/users/${this.userId}/history`,
      },
      {
        label: this.languageService.instant('user.dropdown.settings'),
        icon: 'pi pi-cog',
        routerLink: `/users/${this.userId}/settings`,
      },
      {
        separator: true,
      },
      {
        label: this.languageService.instant('user.dropdown.language'),
        icon: 'pi pi-flag',
        items: LANGUAGES.map((language) => ({
          label: this.getLanguageLabel(language),
          escape: false,
          command: () => {
            this.setLanguage(language.lang);
          },
        })),
      },
      {
        separator: true,
      },
      {
        label: this.languageService.instant('user.dropdown.logout'),
        icon: 'pi pi-sign-out',
        command: (_) => {
          this.authService.logout();
        },
      },
    ];
  }

  getLanguageLabel(language: Language): string {
    return `<div class="w-6 flex items-center gap-x-2">
              <img src="assets/images/flag/${language.lang}.png" alt="${
                language.lang
              }" class="w-full" />
              <p>${this.languageService.instant(language.label)}</p>
            </div>`;
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
}
