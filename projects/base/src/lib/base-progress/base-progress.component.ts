import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'base-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-progress.component.html',
  styleUrl: './base-progress.component.scss'
})
export class BaseProgressComponent {
  @Input() value = 0;
  @Input() type: 'line' | 'circle' = 'line';
  @Input() strokeWidth = 6;
  @Input() status: 'success' | 'warning' | 'danger' | 'primary' = 'primary';
  @Input() showInfo = true;

  get radius(): number {
    return 50 - this.strokeWidth / 2;
  }

  get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  get strokeDashoffset(): number {
    const val = Math.min(100, Math.max(0, this.value));
    return this.circumference * (1 - val / 100);
  }
}
