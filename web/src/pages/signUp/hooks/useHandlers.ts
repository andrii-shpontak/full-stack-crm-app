import { AbsoluteRoutes, URLS } from '../../../utils';
import axios, { isAxiosError } from 'axios';

import type { TSignUpFormValues } from '../../../utils/types';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useHandlers() {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values: TSignUpFormValues) => {
      try {
        if (!values.email) {
          delete values.email;
        }
        await axios.post(URLS.API_URL + URLS.ADD_USER, values);
        navigate(AbsoluteRoutes.login);
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
