import { Component, Input, Optional, Inject, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseAccordionComponent } from './base-accordion.component';

@Component({
  selector: 'base-accordion-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-accordion-panel.component.html',
  styleUrl: './base-accordion-panel.component.scss'
})
export class BaseAccordionPanelComponent {
  @Input() title = '';
  @Input() active = false;
  @Input() disabled = false;

  accordion: any = null;

  toggle() {
    if (this.disabled) return;
    this.active = !this.active;
    if (this.active && this.accordion) {
      this.accordion.togglePanel(this);
    }
  }
}
