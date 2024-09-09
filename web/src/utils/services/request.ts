import axios, { type AxiosError, type AxiosResponse } from 'axios';

import { URLS } from '../constants';
import type { UrlsType } from '../types';
import api from './api';

async function request<ResponseType>(
  callback: () => Promise<AxiosResponse<ResponseType>>,
): Promise<{ data: ResponseType | null; error: AxiosError | null }> {
  try {
    const response = await callback();
    return { data: response?.data ?? null, error: null };
  } catch (e) {
    let error: AxiosError | null = null;
    if (axios.isAxiosError(e)) {
      error = e;
    } else {
      error = {
        isAxiosError: false,
        toJSON: () => ({}),
        name: '',
        message: '',
      };
    }
    return { data: null, error };
  }
}

export async function get<ResponseType>(
  key: UrlsType,
  query?: string,
): Promise<{ data: ResponseType | null; error: AxiosError | null }> {
  const url = `${URLS.API_URL}${URLS[key]}${query || ''}`;
  return request(() => api.get<ResponseType>(url));
}

export async function post<RequestParams, ResponseType>(
  key: UrlsType,
  params: RequestParams,
  query?: string,
): Promise<{ data: ResponseType | null; error: AxiosError | null }> {
  const url = `${URLS.API_URL}${URLS[key]}/${query || ''}`;
  return request(() => api.post<ResponseType>(url, params));
}
