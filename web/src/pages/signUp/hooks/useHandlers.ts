import { AbsoluteRoutes, NotificationType, URLS, useAddNotification } from '../../../utils';
import axios, { isAxiosError } from 'axios';

import type { TSignUpFormValues } from '../../../utils/types';
import { useAppContext } from '../../../context/UserContext';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useHandlers() {
  const navigate = useNavigate();

  const pushNotification = useAddNotification();
  const { setActiveRequests } = useAppContext();

  const handleSubmit = useCallback(
    async (values: TSignUpFormValues) => {
      setActiveRequests(prev => prev + 1);
      try {
        if (!values.email) {
          delete values.email;
        }
        await axios.post(URLS.API_URL + URLS.ADD_USER, values);

        setActiveRequests(prev => prev - 1);
        navigate(AbsoluteRoutes.login);
        pushNotification({ type: NotificationType.Success, title: 'Sign up', text: 'authorization was successful' });
      } catch (error) {
        setActiveRequests(prev => prev - 1);
        if (isAxiosError(error)) {
          pushNotification({ type: NotificationType.Error, title: 'Sign up', text: error.response?.data.message });
          return;
        }
        console.error(error);
      }
    },
    [navigate, pushNotification, setActiveRequests],
  );

  return { handleSubmit };
}
