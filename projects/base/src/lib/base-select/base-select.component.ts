import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  forwardRef, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef, 
  ElementRef, 
  HostListener, 
  inject 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export interface BaseSelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'base-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './base-select.component.html',
  styleUrl: './base-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseSelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseSelectComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() options: BaseSelectOption[] = [];
  @Input() multiple: boolean = false;
  @Input() placeholder: string = 'Select option...';
  @Input() disabled: boolean = false;
  @Input() error: string | null = null;
  @Input() showSearch: boolean = true;

  @Output() change = new EventEmitter<any>();

  value: any = null; // Can be single value or array of values
  isOpen: boolean = false;
  searchQuery: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.isOpen) {
        this.isOpen = false;
        this.searchQuery = '';
        this.onTouched();
        this.cdr.markForCheck();
      }
    }
  }

  writeValue(value: any): void {
    if (this.multiple) {
      this.value = Array.isArray(value) ? value : [];
    } else {
      this.value = value;
    }
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

  toggleDropdown() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.searchQuery = '';
      this.onTouched();
    }
  }

  getFilteredOptions(): BaseSelectOption[] {
    if (!this.searchQuery) return this.options;
    const q = this.searchQuery.toLowerCase();
    return this.options.filter(opt => opt.label.toLowerCase().includes(q));
  }

  selectOption(opt: BaseSelectOption, event: MouseEvent) {
    event.stopPropagation();
    
    if (this.multiple) {
      const currentVal = Array.isArray(this.value) ? [...this.value] : [];
      const index = currentVal.indexOf(opt.value);
      if (index > -1) {
        currentVal.splice(index, 1);
      } else {
        currentVal.push(opt.value);
      }
      this.value = currentVal;
    } else {
      this.value = opt.value;
      this.isOpen = false;
      this.searchQuery = '';
    }

    this.onChange(this.value);
    this.change.emit(this.value);
    this.cdr.markForCheck();
  }

  removeMultiValue(val: any, event: MouseEvent) {
    event.stopPropagation();
    if (this.disabled) return;
    
    const currentVal = Array.isArray(this.value) ? [...this.value] : [];
    const index = currentVal.indexOf(val);
    if (index > -1) {
      currentVal.splice(index, 1);
      this.value = currentVal;
      this.onChange(this.value);
      this.change.emit(this.value);
      this.cdr.markForCheck();
    }
  }

  isSelected(opt: BaseSelectOption): boolean {
    if (this.multiple) {
      return Array.isArray(this.value) && this.value.includes(opt.value);
    }
    return this.value === opt.value;
  }

  getSelectedLabels(): string {
    if (this.multiple) {
      if (!Array.isArray(this.value) || this.value.length === 0) return '';
      return this.options
        .filter(opt => this.value.includes(opt.value))
        .map(opt => opt.label)
        .join(', ');
    } else {
      const match = this.options.find(opt => opt.value === this.value);
      return match ? match.label : '';
    }
  }

  getSelectedOptions(): BaseSelectOption[] {
    if (!this.multiple || !Array.isArray(this.value)) return [];
    return this.options.filter(opt => this.value.includes(opt.value));
  }
}
