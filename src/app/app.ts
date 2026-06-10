import { Component, signal, AfterViewInit, inject, effect } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { LanguageService } from './core/services/language.service';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { ConnectModalComponent } from './shared/components/connect-modal/connect-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, NavbarComponent, ConnectModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  public readonly lang = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  protected readonly title = signal('heji');

  constructor() {
    // Dynamically update page title whenever language changes
    effect(() => {
      this.lang.currentLang();
      this.updateTitle();
    });

    // Dynamically update page title on navigation
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitle();
    });
  }

  private updateTitle() {
    const cleanUrl = this.router.url.split('?')[0].split('#')[0];
    let titleKey = 'NAV_LANDING_B';

    if (cleanUrl.includes('/landing-a')) {
      titleKey = 'NAV_LANDING_A';
    } else if (cleanUrl.includes('/landing-b')) {
      titleKey = 'NAV_LANDING_B';
    } else if (cleanUrl.includes('/sphere')) {
      titleKey = 'NAV_SPHERE';
    } else if (cleanUrl.includes('/design-system')) {
      titleKey = 'NAV_SYSTEM';
    } else if (cleanUrl.includes('/console')) {
      titleKey = 'NAV_CONSOLE';
    } else if (cleanUrl.includes('/dashboard')) {
      titleKey = 'SUB_DASHBOARD';
    } else if (cleanUrl.includes('/platform/')) {
      const parts = cleanUrl.split('/');
      const page = parts[parts.length - 1];
      titleKey = `TITLE_PLATFORM_${page.toUpperCase().replace(/-/g, '_')}`;
    } else if (cleanUrl.includes('/ecosystem/')) {
      const parts = cleanUrl.split('/');
      const page = parts[parts.length - 1];
      titleKey = `TITLE_ECOSYSTEM_${page.toUpperCase().replace(/-/g, '_')}`;
    } else if (cleanUrl.includes('/docs/')) {
      const parts = cleanUrl.split('/');
      const page = parts[parts.length - 1];
      titleKey = `TITLE_DOCS_${page.toUpperCase().replace(/-/g, '_')}`;
    } else if (cleanUrl.includes('/legal/')) {
      const parts = cleanUrl.split('/');
      const page = parts[parts.length - 1];
      titleKey = `TITLE_LEGAL_${page.toUpperCase().replace(/-/g, '_')}`;
    }

    const translatedTitle = this.lang.t(titleKey);
    this.titleService.setTitle(`Neuralis - ${translatedTitle}`);
  }



  ngAfterViewInit() {
    const loader = document.getElementById('global-loader');
    if (!loader) return;

    const hideLoader = () => {
      if (loader.classList.contains('fade-out')) return;
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.remove();
      }, 500); // Wait for the 0.5s CSS transition to finish
    };

    // Find all stylesheet links loading asynchronously (media="print" initially due to Angular's optimization)
    const pendingStylesheets = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]')
    ).filter(link => {
      const htmlLink = link as HTMLLinkElement;
      return htmlLink.media === 'print';
    }) as HTMLLinkElement[];

    if (pendingStylesheets.length > 0) {
      let loadedCount = 0;
      const onStyleLoad = () => {
        loadedCount++;
        if (loadedCount === pendingStylesheets.length) {
          setTimeout(hideLoader, 100); // 100ms buffer to ensure stylesheet has applied
        }
      };

      pendingStylesheets.forEach(link => {
        link.addEventListener('load', onStyleLoad);
        link.addEventListener('error', onStyleLoad);
      });

      // Safety fallback: Hide the loader anyway if styles fail to load after 2.5s
      setTimeout(hideLoader, 2500);
    } else {
      // Styles are already loaded (e.g. on local dev server or media="all")
      hideLoader();
    }
  }
}
