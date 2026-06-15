import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  forwardRef, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef, 
  inject 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'base-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-switch.component.html',
  styleUrl: './base-switch.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseSwitchComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseSwitchComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() disabled: boolean = false;

  @Output() change = new EventEmitter<boolean>();

  checked: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  private readonly cdr = inject(ChangeDetectorRef);

  writeValue(value: any): void {
    this.checked = !!value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.change.emit(this.checked);
    this.onTouched();
    this.cdr.markForCheck();
  }
}
