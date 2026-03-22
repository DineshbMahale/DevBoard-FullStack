import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AlertState {
  type: 'success' | 'error' | 'warning';
  message: string;
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSubject = new BehaviorSubject<AlertState>({
    type: 'success',
    message: '',
    show: false
  });

  alert$ = this.alertSubject.asObservable();

  showSuccess(message: string) {
    this.showAlert('success', message);
  }

  showError(message: string) {
    this.showAlert('error', message);
  }

  showWarning(message: string) {
    this.showAlert('warning', message);
  }

  private showAlert(type: 'success' | 'error' | 'warning', message: string) {
    this.alertSubject.next({ type, message, show: true });

    setTimeout(() => {
      this.clear();
    }, 3000);
  }

  clear() {
    this.alertSubject.next({ type: 'success', message: '', show: false });
  }
}