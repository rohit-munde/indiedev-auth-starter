import { IApiError } from "../../auth/interfaces/response";


export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface INotificationItem {
  id: number;
  type: NotificationType;
  message: string;
  count: number;
  errorResponse?: IApiError;
  duration: number;
  isAutoClose: boolean;
}
