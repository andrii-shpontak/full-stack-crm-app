import {
  AbsoluteRoutes,
  LocalStorageKeys,
  LocalStorageService,
  NotificationType,
  URLS,
  useAddNotification,
} from '../../../utils';
import type { TLoginFormValues, TLoginResponse } from '../../../utils/types';
import axios, { isAxiosError } from 'axios';

import { useAppContext } from '../../../context/UserContext';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useHandlers() {
  const navigate = useNavigate();

  const pushNotification = useAddNotification();
  const { setActiveRequests } = useAppContext();

  const handleSubmit = useCallback(
    async (values: TLoginFormValues) => {
      setActiveRequests(prev => prev + 1);
      try {
        const response = await axios.post(URLS.API_AUTH + URLS.LOGIN, values);
        const { access_token, refresh_token, user_id } = response.data as TLoginResponse;
        LocalStorageService.setItem(LocalStorageKeys.Access, access_token);
        LocalStorageService.setItem(LocalStorageKeys.Refresh, refresh_token);
        LocalStorageService.setItem(LocalStorageKeys.UserId, user_id);
        setActiveRequests(prev => prev - 1);
        navigate(AbsoluteRoutes.user);
      } catch (error) {
        setActiveRequests(prev => prev - 1);
        if (isAxiosError(error)) {
          pushNotification({ type: NotificationType.Error, title: 'Login', text: error.response?.data.message });
          return;
        }
        console.error(error);
      }
    },
    [navigate, pushNotification, setActiveRequests],
  );

  return { handleSubmit };
}
