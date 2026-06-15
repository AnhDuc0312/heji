import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTabComponent } from './base-tab.component';

@Component({
  selector: 'base-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-tabs.component.html',
  styleUrl: './base-tabs.component.scss'
})
export class BaseTabsComponent implements AfterContentInit {
  @Input() selectedIndex = 0;
  @Output() selectedIndexChange = new EventEmitter<number>();

  @ContentChildren(BaseTabComponent) tabs!: QueryList<BaseTabComponent>;

  ngAfterContentInit() {
    this.selectTab(this.selectedIndex);
  }

  selectTab(index: number) {
    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
    this.updateTabs();
  }

  private updateTabs() {
    if (this.tabs) {
      this.tabs.forEach((tab, idx) => {
        tab.active = idx === this.selectedIndex;
      });
    }
  }
}
