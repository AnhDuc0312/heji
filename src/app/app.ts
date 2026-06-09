import { Component, signal, AfterViewInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('heji');

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
