import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'base-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-checkbox.component.html',
  styleUrl: './base-checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseCheckboxComponent),
      multi: true
    }
  ]
})
export class BaseCheckboxComponent implements ControlValueAccessor {
  @Input() label: string | null = null;
  @Input() disabled = false;

  checked = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.checked = !!value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
