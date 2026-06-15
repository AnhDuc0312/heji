import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'base-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="base-tab-content" *ngIf="active" class="animate-fade-in">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: tabFadeIn 0.3s ease-out;
    }
    @keyframes tabFadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class BaseTabComponent {
  @Input() title = '';
  @Input() disabled = false;
  @Input() icon: string | null = null;
  
  active = false;
}
