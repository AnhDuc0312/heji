import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-design-system',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './design-system.html',
  styleUrl: './design-system.scss'
})
export class DesignSystemComponent {
  public readonly lang = inject(LanguageService);
  toastVisible = false;
  toastMessage = '';

  colors = [
    { name: 'background', value: '#131313' },
    { name: 'primary', value: '#b0c6ff' },
    { name: 'primary_container', value: '#568dff' },
    { name: 'secondary', value: '#ecb2ff' },
    { name: 'secondary_container', value: '#cf5cff' },
    { name: 'tertiary', value: '#00dbe9' },
    { name: 'tertiary_container', value: '#00a0aa' },
    { name: 'surface', value: '#131313' },
    { name: 'surface_bright', value: '#3a3939' },
    { name: 'surface_container', value: '#201f1f' },
    { name: 'surface_container_high', value: '#2a2a2a' },
    { name: 'surface_container_lowest', value: '#0e0e0e' },
    { name: 'outline', value: '#8c90a1' },
    { name: 'error', value: '#ffb4ab' }
  ];

  typography = [
    { token: 'display-lg', family: 'Geist', weight: '700', size: '64px', lh: '1.1' },
    { token: 'headline-lg', family: 'Geist', weight: '600', size: '40px', lh: '1.2' },
    { token: 'headline-md', family: 'Geist', weight: '600', size: '24px', lh: '1.3' },
    { token: 'body-lg', family: 'Inter', weight: '400', size: '18px', lh: '1.6' },
    { token: 'body-md', family: 'Inter', weight: '400', size: '16px', lh: '1.5' },
    { token: 'label-md', family: 'JetBrains Mono', weight: '500', size: '14px', lh: '1.4' },
    { token: 'label-sm', family: 'JetBrains Mono', weight: '500', size: '12px', lh: '1.4' }
  ];

  spacing = [
    { token: 'xs', value: '4px', pixelValue: 4 },
    { token: 'sm', value: '8px', pixelValue: 8 },
    { token: 'md', value: '16px', pixelValue: 16 },
    { token: 'lg', value: '24px', pixelValue: 24 },
    { token: 'xl', value: '40px', pixelValue: 40 },
    { token: '2xl', value: '64px', pixelValue: 64 },
    { token: '3xl', value: '104px', pixelValue: 104 },
    { token: 'gutter', value: '24px', pixelValue: 24 }
  ];

  copyToClipboard(value: string) {
    navigator.clipboard.writeText(value).then(() => {
      this.toastMessage = `Copied hex code: ${value}`;
      this.toastVisible = true;
      setTimeout(() => {
        this.toastVisible = false;
      }, 2500);
    });
  }

  onCardMove(e: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }
}
