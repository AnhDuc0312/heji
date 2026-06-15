import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'base-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-tag.component.html',
  styleUrl: './base-tag.component.scss'
})
export class BaseTagComponent {
  @Input() color: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'default' = 'default';
  @Input() glow = false;
  @Input() closable = false;

  @Output() close = new EventEmitter<void>();

  onCloseClick(event: MouseEvent) {
    event.stopPropagation();
    this.close.emit();
  }
}
