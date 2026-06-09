import { Component, HostListener, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-landing-a',
  standalone: true,
  imports: [],
  templateUrl: './landing-a.html',
  styleUrl: './landing-a.scss'
})
export class LandingAComponent {
  public readonly lang = inject(LanguageService);
  parallaxTransform = 'translateY(0px)';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrolled = window.pageYOffset;
    this.parallaxTransform = `translateY(${scrolled * 0.4}px)`;
  }

  onMouseMove(e: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }
}
