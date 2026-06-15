import { 
  Component, 
  Input, 
  forwardRef, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef, 
  inject 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'base-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseInputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'password' | 'email' | 'number' = 'text';
  @Input() disabled: boolean = false;
  @Input() error: string | null = null;
  @Input() hint: string | null = null;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';

  value: any = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  private readonly cdr = inject(ChangeDetectorRef);

  writeValue(value: any): void {
    this.value = value !== undefined && value !== null ? value : '';
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

  onInputValueChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }

  onBlur() {
    this.onTouched();
  }
}
