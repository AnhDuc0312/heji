import { Injectable, signal } from '@angular/core';

export interface BaseToastMessage {
  id: string;
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class BaseToastService {
  readonly toasts = signal<BaseToastMessage[]>([]);

  show(message: string, type: 'success' | 'danger' | 'info' | 'warning' = 'info', duration: number = 3000) {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: BaseToastMessage = { id, message, type, duration };

    this.toasts.update(list => [...list, newToast]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  success(message: string, duration?: number) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.show(message, 'danger', duration);
  }

  info(message: string, duration?: number) {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration?: number) {
    this.show(message, 'warning', duration);
  }

  remove(id: string) {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}
