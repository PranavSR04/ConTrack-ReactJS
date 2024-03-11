import { NotificationType } from "../../Notification/types";

export interface NotificationListPropType{
    notifications: NotificationType[];
    isLoading: boolean;
    isError: boolean;
    error: string;
    viewMoreClick: () => void;
    hasViewMore: boolean;
    toggleNotifications:()=>void
}
export interface NotificationsResponse {
    data: {
      active_notifications_count: number;
      NotificationListdisplay: NotificationType[];
    };
  }
export interface userType{
  user_id:number;
}