import { LocalStorageKeys, LocalStorageService, NotificationType, get, useAddNotification } from '../../../utils';
import { useCallback, useEffect } from 'react';

import { TUser } from '../../../utils/types';
import { useAppContext } from '../../../context/UserContext';

export function useGetUserData() {
  const pushNotification = useAddNotification();
  const { setActiveRequests, setUser } = useAppContext();

  const fetchUserData = useCallback(async () => {
    const userId = LocalStorageService.getItem(LocalStorageKeys.UserId) || '';

    setActiveRequests(prev => prev + 1);
    const { data, error } = await get('GET_USER', userId);
    setActiveRequests(prev => prev - 1);

    if (!!error) {
      pushNotification({ type: NotificationType.Error, title: 'User data', text: error.message });
      return;
    }

    const { name, email, phone } = data as TUser;

    setUser({ name, email, phone });
  }, [pushNotification, setActiveRequests, setUser]);

  useEffect(() => {
    fetchUserData();
    // only when mounting the component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
