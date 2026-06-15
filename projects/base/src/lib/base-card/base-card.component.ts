import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'base-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-card.component.html',
  styleUrl: './base-card.component.scss'
})
export class BaseCardComponent {
  @Input() title: string | null = null;
  @Input() subtitle: string | null = null;
  @Input() hoverable = false;
  @Input() glowColor: 'cyan' | 'purple' | 'none' = 'none';
  @Input() bordered = true;
}
