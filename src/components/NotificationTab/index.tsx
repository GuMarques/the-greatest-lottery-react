import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@hooks/custom-useSelector";
import { notificationActions } from "@slices/notification-slice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationTab = () => {
  const notification = useAppSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.active) {
      notification.status === 'sucess' ? toast.success(notification.message) : toast.error(notification.message)
      dispatch(notificationActions.dismissNotification());
    }
  }, [notification.active]);

  return (
    <ToastContainer />
  );
};

export default NotificationTab;
