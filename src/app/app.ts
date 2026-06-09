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
    // Hide and remove the global loader after Angular boots
    const loader = document.getElementById('global-loader');
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.remove();
      }, 500); // Wait for the 0.5s CSS transition to finish
    }
  }
}
