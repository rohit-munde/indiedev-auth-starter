import { Injectable } from '@angular/core';
import { NotificationType } from '../../app/auth/enums/notificationType.enum';
import { IApiError } from '../../app/auth/interfaces/response';
import { BehaviorSubject } from 'rxjs';

export interface INotificationItem {
  id: number;
  type: NotificationType;
  message: string;
  count: number;
  errorResponse: IApiError;
  duration: number;
  isAutoClose: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<INotificationItem[]>([]);

  notifications$ = this.notificationSubject.asObservable();

  private isAutoClose: boolean = false;

  setGlobalAutoClose(value: boolean) {
    this.isAutoClose = value;
  }

  showError(message: string, errorResponse: IApiError, duration: number = 5000) {
    const notifications =
      [...this.notificationSubject.value];

    const existing =
      notifications.find(
        n => n.message === message
      );

    if (existing) {
      existing.count++;
      this.notificationSubject.next([...notifications]);
      return;
    }

    const notification: INotificationItem = {
      id: Math.random(),
      type: NotificationType.ERROR,
      message,
      count: 1,
      errorResponse,
      duration,
      isAutoClose: this.isAutoClose
    }

    notifications.push(notification);
    //  if (notification.autoClose) {
    //   setTimeout(() => {
    //     this.remove(notification.id);
    //   }, duration);
    // }
  }

  showSucces() { }

  showWarning() { }

  showInfo() { }
}
