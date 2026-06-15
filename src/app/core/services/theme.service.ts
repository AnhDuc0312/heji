import { Injectable, signal, effect } from '@angular/core';

export type ThemeType = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'heji_theme';
  
  // Default to 'dark' mode as requested
  theme = signal<ThemeType>('dark');

  constructor() {
    // Load theme from localStorage if available
    const savedTheme = localStorage.getItem(this.THEME_KEY) as ThemeType;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      this.theme.set(savedTheme);
    } else {
      // Fallback to system preference if no saved setting
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      this.theme.set(prefersLight ? 'light' : 'dark');
    }

    // Reactively apply theme to document root when theme signal changes
    effect(() => {
      const activeTheme = this.theme();
      document.documentElement.setAttribute('data-theme', activeTheme);
      localStorage.setItem(this.THEME_KEY, activeTheme);
    });
  }

  toggleTheme() {
    this.theme.update(current => current === 'dark' ? 'light' : 'dark');
  }

  setTheme(newTheme: ThemeType) {
    this.theme.set(newTheme);
  }

  isDark(): boolean {
    return this.theme() === 'dark';
  }
}
