import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  public isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadThemeFromStorage();
    }
  }

  get isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }

  toggleDarkMode(): void {
    const newMode = !this.isDarkMode;
    this.setDarkMode(newMode);
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkModeSubject.next(isDark);
    if (isPlatformBrowser(this.platformId)) {
      this.saveThemeToStorage(isDark);
      this.applyThemeToDocument(isDark);
    }
  }

  private applyThemeToDocument(isDark: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      const htmlElement = document.documentElement;
      if (isDark) {
        htmlElement.classList.add('dark-mode');
      } else {
        htmlElement.classList.remove('dark-mode');
      }
    }
  }

  private saveThemeToStorage(isDark: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('darkMode', isDark.toString());
    }
  }

  private loadThemeFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('darkMode');
      if (savedTheme !== null) {
        const isDark = savedTheme === 'true';
        this.setDarkMode(isDark);
      } else {
        this.setDarkMode(this.getSystemPreference());
      }
    }
  }

  private getSystemPreference(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
