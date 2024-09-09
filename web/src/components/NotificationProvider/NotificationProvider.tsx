import type { TNotificationProvider } from '../../utils/types';
import { useEffect } from 'react';

const NotificationProvider = ({ notification, handleClose }: TNotificationProvider) => {
  const handleClick = () => {
    handleClose(notification);
  };

  useEffect((): (() => void) => {
    const timer = setTimeout((): void => handleClose(notification), 10000);
    return (): void => {
      clearTimeout(timer);
    };
  }, [notification, handleClose]);

  return (
    <div className={`notificationItem ${notification.type}`}>
      <div className='close' onClick={handleClick}>
        &times;
      </div>
      <span className='title'>{notification.title}</span>
      <span>{notification.text}</span>
    </div>
  );
};

export default NotificationProvider;
