import { AbsoluteRoutes, LocalStorageKeys, LocalStorageService, URLS } from '../../../utils';
import type { TLoginFormValues, TLoginResponse } from '../../../utils/types';
import axios, { isAxiosError } from 'axios';

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useHandlers() {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values: TLoginFormValues) => {
      try {
        const response = await axios.post(URLS.API_AUTH + URLS.LOGIN, values);
        const { access_token, refresh_token, user_id } = response.data as TLoginResponse;
        LocalStorageService.setItem(LocalStorageKeys.Access, access_token);
        LocalStorageService.setItem(LocalStorageKeys.Refresh, refresh_token);
        LocalStorageService.setItem(LocalStorageKeys.UserId, user_id);

        navigate(AbsoluteRoutes.user);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error.response?.data.message);
          return;
        }
        console.error(error);
      }
    },
    [navigate],
  );

  return { handleSubmit };
}
