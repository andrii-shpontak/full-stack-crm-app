import './Notification.scss';

import { useCallback, useEffect } from 'react';

import NotificationProvider from '../NotificationProvider/NotificationProvider';
import type { TNotification } from '../../utils/types';
import { useAppContext } from '../../context/UserContext';
import { useRemoveNotification } from '../../utils';

const Notification = () => {
  const { notificationState } = useAppContext();

  const removeNotification = useRemoveNotification();

  const handleClose = useCallback(
    (notification: TNotification): void => {
      removeNotification(notification.id);
    },
    [removeNotification],
  );

  useEffect(() => {
    if (notificationState.notifications.length > 4) {
      handleClose(notificationState.notifications[0]);
    }
  }, [handleClose, notificationState]);

  return (
    <div className='notification'>
      {notificationState.notifications.map((notification, i) => (
        <NotificationProvider notification={notification} handleClose={handleClose} key={i} />
      ))}
    </div>
  );
};

export default Notification;
