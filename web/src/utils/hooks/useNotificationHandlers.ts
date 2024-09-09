import type { TNotification } from '../types';
import { useAppContext } from '../../context/UserContext';

export const useAddNotification = () => {
  const { setNotificationState } = useAppContext();

  return (newNotification: Omit<TNotification, 'id'>) => {
    const id = String(Date.now());
    setNotificationState(prevState => ({
      notifications: [...prevState.notifications, { ...newNotification, id }],
    }));
  };
};

export const useRemoveNotification = () => {
  const { setNotificationState } = useAppContext();

  return (id: string) => {
    setNotificationState(prevState => ({
      notifications: prevState.notifications.filter(notification => notification.id !== id),
    }));
  };
};
