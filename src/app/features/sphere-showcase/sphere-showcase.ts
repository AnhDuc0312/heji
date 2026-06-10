import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-sphere-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sphere-showcase.html',
  styleUrl: './sphere-showcase.scss'
})
export class SphereShowcaseComponent {
  public readonly lang = inject(LanguageService);
  sphereUrl = 'assets/stitch/Futuristic Holographic Crystal Sphere (7edb3e4314be4941911b5e3c79d16bbe) - Screenshot.png';
  backgroundUrl = 'assets/stitch/Abstract Cinematic Background (949ed693e7034135ab4738012f4aef77) - Screenshot.png';
  
  focusMode: 'all' | 'sphere' | 'bg' = 'all';
  sphereTransform = '';
  glowTransform = '';

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const x = (e.clientX - window.innerWidth / 2) / 25;
    const y = (e.clientY - window.innerHeight / 2) / 25;

    this.sphereTransform = `translate(${x}px, ${y}px) rotateY(${x}deg) rotateX(${-y}deg)`;
    this.glowTransform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
  }

  toggleMode(mode: 'sphere' | 'bg') {
    if (this.focusMode === mode) {
      this.focusMode = 'all';
    } else {
      this.focusMode = mode;
    }
  }
}
