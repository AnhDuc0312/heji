import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'base-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-upload.component.html',
  styleUrl: './base-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseUploadComponent),
      multi: true
    }
  ]
})
export class BaseUploadComponent implements ControlValueAccessor {
  @Input() multiple = false;
  @Input() accept = '';
  @Input() disabled = false;
  @Input() dragdrop = true;

  @Output() fileSelect = new EventEmitter<File[]>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  files: File[] = [];
  isDragOver = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  triggerFileSelect() {
    if (this.disabled) return;
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: any) {
    const inputFiles = event.target.files;
    if (inputFiles && inputFiles.length > 0) {
      this.addFiles(Array.from(inputFiles));
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (this.disabled || !this.dragdrop) return;
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    if (this.disabled || !this.dragdrop) return;
    
    const droppedFiles = event.dataTransfer?.files;
    if (droppedFiles && droppedFiles.length > 0) {
      this.addFiles(Array.from(droppedFiles));
    }
  }

  removeFile(index: number, event: MouseEvent) {
    event.stopPropagation();
    if (this.disabled) return;
    this.files.splice(index, 1);
    this.onChange(this.files);
    this.onTouched();
    this.fileSelect.emit(this.files);
  }

  getFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  private addFiles(newFiles: File[]) {
    if (this.multiple) {
      this.files = [...this.files, ...newFiles];
    } else {
      this.files = newFiles.slice(0, 1);
    }
    this.onChange(this.files);
    this.onTouched();
    this.fileSelect.emit(this.files);
    
    // Clear input value to allow selecting same file again
    this.fileInput.nativeElement.value = '';
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (Array.isArray(value)) {
      this.files = value;
    } else if (value instanceof File) {
      this.files = [value];
    } else {
      this.files = [];
    }
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
