import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-design-system',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './design-system.html',
  styleUrl: './design-system.scss'
})
export class DesignSystemComponent {
  public readonly lang = inject(LanguageService);
  toastVisible = false;
  toastMessage = '';
  selectedCodeSnippet = '';

  // Custom styling playground variables
  primaryHue = 224;
  primarySat = 100;
  primaryLight = 85;
  glassBlur = 16;
  glassOpacity = 10;

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

  copyComponentCode(comp: string) {
    let code = '';
    switch (comp) {
      case 'glass':
        code = '<div class="bg-white/2 border border-white/10 backdrop-blur-xl rounded-xl p-lg shadow-2xl">\n  Glassmorphic Plate\n</div>';
        break;
      case 'btn-primary':
        code = '<button class="bg-gradient-to-r from-primary to-secondary text-on-primary px-lg py-sm rounded-lg font-label-md shadow-[0_0_20px_rgba(176,198,255,0.3)] hover:scale-[1.03] transition-all">\n  Primary Action\n</button>';
        break;
      case 'btn-secondary':
        code = '<button class="glass-plate border border-white/15 text-on-surface px-lg py-sm rounded-lg font-label-md hover:bg-white/10 transition-all">\n  Secondary Action\n</button>';
        break;
      case 'badge-ok':
        code = '<span class="glass-plate px-md py-xs rounded-full text-green-400 font-label-sm border border-green-500/20 flex items-center gap-sm">\n  <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"></span>\n  SYS_OPERATIONAL\n</span>';
        break;
      case 'input-slider':
        code = '<input type="range" class="w-full accent-primary bg-white/5 rounded-lg h-1.5 cursor-pointer"/>';
        break;
    }
    
    if (code) {
      this.selectedCodeSnippet = code;
      navigator.clipboard.writeText(code).then(() => {
        this.toastMessage = `Copied component HTML snippet to clipboard!`;
        this.toastVisible = true;
        setTimeout(() => {
          this.toastVisible = false;
        }, 2500);
      });
    }
  }

  onCardMove(e: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }

  get primaryColorHSL(): string {
    return `hsl(${this.primaryHue}, ${this.primarySat}%, ${this.primaryLight}%)`;
  }

  get glassStyle(): string {
    return `background: rgba(255, 255, 255, ${this.glassOpacity / 100}); backdrop-filter: blur(${this.glassBlur}px); border: 1px solid rgba(255, 255, 255, 0.1);`;
  }

  get generatedTailwindCode(): string {
    return `<div class="bg-white/${this.glassOpacity} backdrop-blur-[${this.glassBlur}px] border border-white/10 rounded-xl p-md shadow-2xl">\n` +
           `  <span style="color: ${this.primaryColorHSL}; font-weight: bold;">Obsidian Custom Plate</span>\n` +
           `</div>`;
  }

  copyPlaygroundCode() {
    navigator.clipboard.writeText(this.generatedTailwindCode).then(() => {
      this.toastMessage = 'Copied custom playground markup to clipboard!';
      this.toastVisible = true;
      setTimeout(() => {
        this.toastVisible = false;
      }, 2500);
    });
  }
}
