import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/custom-useSelector";
import { notificationActions } from "../store/notification-slice";
import {
  NotificationParagraph,
  CustomNotificationTab,
} from "./NotificationTabComponents";

const NotificationTab = () => {
  const notification = useAppSelector(state => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if(notification.active) {
      setTimeout(() => {
        dispatch(notificationActions.dismissNotification());
      }, 4000);
    }
  }, [notification.active])

  const handlerNotification = () => {
    dispatch(notificationActions.dismissNotification());
  }

  const cssClasses = [notification.status, notification.active ? 'open' : 'close']
  return (
    <CustomNotificationTab className={cssClasses.join(' ')} onClick={handlerNotification}>
      <NotificationParagraph>{notification.message}</NotificationParagraph>
    </CustomNotificationTab>
  );
};

export default NotificationTab;
