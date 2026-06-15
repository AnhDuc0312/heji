import { 
  Directive, 
  ElementRef, 
  Input, 
  HostListener, 
  OnDestroy, 
  inject 
} from '@angular/core';

@Directive({
  selector: '[baseTooltip]',
  standalone: true
})
export class BaseTooltipDirective implements OnDestroy {
  @Input('baseTooltip') content: string = '';
  @Input() tooltipPlacement: 'top' | 'bottom' | 'left' | 'right' = 'top';

  private tooltipEl: HTMLDivElement | null = null;
  private readonly el = inject(ElementRef);

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.content) return;
    this.injectStyles();
    this.createTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.removeTooltip();
  }

  ngOnDestroy() {
    this.removeTooltip();
  }

  private createTooltip() {
    this.tooltipEl = document.createElement('div');
    this.tooltipEl.className = 'base-tooltip-bubble';
    this.tooltipEl.innerText = this.content;
    
    // Position absolute initially, invisible to calculate dimensions
    this.tooltipEl.style.position = 'absolute';
    this.tooltipEl.style.visibility = 'hidden';
    
    document.body.appendChild(this.tooltipEl);

    // Calculate layout
    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipEl.getBoundingClientRect();
    
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    let top = 0;
    let left = 0;

    switch (this.tooltipPlacement) {
      case 'top':
        top = hostRect.top + scrollY - tooltipRect.height - 8;
        left = hostRect.left + scrollX + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = hostRect.bottom + scrollY + 8;
        left = hostRect.left + scrollX + (hostRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = hostRect.top + scrollY + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.left + scrollX - tooltipRect.width - 8;
        break;
      case 'right':
        top = hostRect.top + scrollY + (hostRect.height - tooltipRect.height) / 2;
        left = hostRect.right + scrollX + 8;
        break;
    }

    // Guard against layout screen bleeding
    if (left < 0) left = 4;
    
    this.tooltipEl.style.top = `${top}px`;
    this.tooltipEl.style.left = `${left}px`;
    this.tooltipEl.style.visibility = 'visible';
  }

  private removeTooltip() {
    if (this.tooltipEl && this.tooltipEl.parentNode) {
      this.tooltipEl.parentNode.removeChild(this.tooltipEl);
      this.tooltipEl = null;
    }
  }

  private injectStyles() {
    if (document.getElementById('base-tooltip-styles')) return;
    const style = document.createElement('style');
    style.id = 'base-tooltip-styles';
    style.innerHTML = `
      .base-tooltip-bubble {
        position: absolute;
        z-index: 10000;
        background-color: #0c0c0e;
        color: #e4e4e7;
        font-size: 11px;
        font-family: inherit;
        padding: 6px 10px;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
        pointer-events: none;
        max-width: 220px;
        line-height: 1.4;
        animation: tooltipFadeIn 0.15s ease-out;
      }
      @keyframes tooltipFadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
}
