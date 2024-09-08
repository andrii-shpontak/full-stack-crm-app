import { AbsoluteRoutes, LocalStorageKeys } from '../enums';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { LocalStorageService } from './localStorageServices';
import { URLS } from '../constants';
import api from './api';
import axios from 'axios';

let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const access = LocalStorageService.getItem(LocalStorageKeys.Access);
  if (access && config.headers) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError | AxiosResponse> => {
  if (error.response) {
    const { status, config } = error.response;

    if (status === 401) {
      const access = LocalStorageService.getItem(LocalStorageKeys.Access);
      const refresh = LocalStorageService.getItem(LocalStorageKeys.Refresh);

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await axios.post(
            `${URLS.API_AUTH}${URLS.REFRESH}`,
            {
              accessToken: access,
              refreshToken: refresh,
            },
            {
              headers: { Authorization: `Bearer ${access}` },
            },
          );

          const { accessToken, refreshToken } = data;
          LocalStorageService.setItem(LocalStorageKeys.Access, accessToken);
          LocalStorageService.setItem(LocalStorageKeys.Refresh, refreshToken);

          // Notify all the waiting subscribers
          subscribers.forEach(callback => callback(accessToken));
          subscribers = [];

          // Retry failed request
          config.headers.Authorization = `Bearer ${accessToken}`;
          return axios(config);
        } catch (refreshError) {
          // Handle refresh token error, e.g., logout user
          LocalStorageService.clear();

          // redirect to login when failing to refresh the token
          window.location.replace(AbsoluteRoutes.login);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        // If token is already refreshing, add this request to the subscribers list
        return new Promise(resolve => {
          subscribers.push(token => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(api.request(config));
          });
        });
      }
    }
  }

  return Promise.reject(error);
};

export const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};
