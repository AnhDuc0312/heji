import { Component, Input, Output, EventEmitter, forwardRef, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { BaseRadioComponent } from './base-radio.component';

@Component({
  selector: 'base-radio-group',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="base-radio-group"><ng-content></ng-content></div>`,
  styles: [`.base-radio-group { display: flex; flex-direction: column; gap: 8px; }`],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseRadioGroupComponent),
      multi: true
    }
  ]
})
export class BaseRadioGroupComponent implements ControlValueAccessor, AfterContentInit {
  @Input() name = '';
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<any>();

  value: any = null;

  @ContentChildren(forwardRef(() => BaseRadioComponent), { descendants: true }) 
  radios!: QueryList<BaseRadioComponent>;

  onChange: any = () => {};
  onTouched: any = () => {};

  ngAfterContentInit() {
    this.updateRadios();
    this.radios.changes.subscribe(() => {
      this.updateRadios();
    });
  }

  selectValue(val: any) {
    if (this.disabled) return;
    this.value = val;
    this.onChange(val);
    this.onTouched();
    this.valueChange.emit(val);
    this.updateRadios();
  }

  private updateRadios() {
    if (this.radios) {
      this.radios.forEach(radio => {
        radio.name = this.name;
        radio.checked = radio.value === this.value;
        if (this.disabled) {
          radio.disabled = true;
        }
      });
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.value = value;
    this.updateRadios();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.updateRadios();
  }
}
