import { Component, Input, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'base-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-dropdown.component.html',
  styleUrl: './base-dropdown.component.scss'
})
export class BaseDropdownComponent {
  @Input() trigger: 'click' | 'hover' = 'click';
  @Input() placement: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' = 'bottom-left';

  isOpen = false;

  constructor(private el: ElementRef) {}

  toggle() {
    if (this.trigger === 'click') {
      this.isOpen = !this.isOpen;
    }
  }

  open() {
    if (this.trigger === 'hover') {
      this.isOpen = true;
    }
  }

  close() {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
