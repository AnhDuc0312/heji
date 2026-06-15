import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ChangeDetectionStrategy 
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'base-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseModalComponent {
  @Input() visible: boolean = false;
  @Input() title: string = '';
  @Input() width: string | number = 520;
  @Input() closable: boolean = true;
  @Input() maskClosable: boolean = true;
  @Input() okText: string = 'OK';
  @Input() cancelText: string = 'Cancel';
  @Input() loading: boolean = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() ok = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onMaskClick() {
    if (this.maskClosable && !this.loading) {
      this.close();
    }
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.cancel.emit();
  }

  onOk() {
    this.ok.emit();
  }

  getWidth(): string {
    if (this.width === undefined || this.width === null || this.width === '') return '520px';
    return typeof this.width === 'number' ? `${this.width}px` : this.width;
  }
}
