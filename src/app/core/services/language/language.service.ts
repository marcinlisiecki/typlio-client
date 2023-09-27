import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends TranslateService {
  setLanguage(lang: string) {
    this.use(lang);
    localStorage.setItem('lang', lang);
    this.setDefaultLang(lang);
  }

  init() {
    const localStorageLang: string | null = localStorage.getItem('lang');
    if (localStorageLang === null) {
      this.setLanguage('en');
      return;
    }

    this.setLanguage(localStorageLang);
  }
}
