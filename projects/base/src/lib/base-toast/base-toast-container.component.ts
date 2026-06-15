import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseToastService } from './base-toast.service';

@Component({
  selector: 'base-toast-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-toast-container.component.html',
  styleUrl: './base-toast-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseToastContainerComponent {
  public readonly toastService = inject(BaseToastService);
}
