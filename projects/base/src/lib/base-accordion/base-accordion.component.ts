import { Component, Input, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseAccordionPanelComponent } from './base-accordion-panel.component';

@Component({
  selector: 'base-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="base-accordion"><ng-content></ng-content></div>`,
  styles: [`.base-accordion { display: flex; flex-direction: column; gap: 8px; width: 100%; }`]
})
export class BaseAccordionComponent implements AfterContentInit {
  @Input() multiple = false;

  @ContentChildren(BaseAccordionPanelComponent, { descendants: true }) 
  panels!: QueryList<BaseAccordionPanelComponent>;

  ngAfterContentInit() {
    this.updatePanels();
    this.panels.changes.subscribe(() => {
      this.updatePanels();
    });
  }

  togglePanel(selectedPanel: BaseAccordionPanelComponent) {
    if (!this.multiple) {
      this.panels.forEach(panel => {
        if (panel !== selectedPanel) {
          panel.active = false;
        }
      });
    }
  }

  private updatePanels() {
    if (this.panels) {
      this.panels.forEach(panel => {
        panel.accordion = this;
      });
    }
  }
}
