import { Component, Input, Optional, Inject, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseRadioGroupComponent } from './base-radio-group.component';

@Component({
  selector: 'base-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-radio.component.html',
  styleUrl: './base-radio.component.scss'
})
export class BaseRadioComponent {
  @Input() value: any = null;
  @Input() label: string | null = null;
  @Input() disabled = false;

  name = '';
  checked = false;

  constructor(
    @Optional() @Inject(forwardRef(() => BaseRadioGroupComponent)) 
    private radioGroup: BaseRadioGroupComponent
  ) {}

  select() {
    if (this.disabled) return;
    this.checked = true;
    if (this.radioGroup) {
      this.radioGroup.selectValue(this.value);
    }
  }
}
