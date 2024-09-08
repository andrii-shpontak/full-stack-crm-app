import { URLS } from '../constants';
import axios from 'axios';
import { setupInterceptorsTo } from './interceptors';

const api = setupInterceptorsTo(
  axios.create({
    baseURL: URLS.API_URL,
    timeout: 10000,
  }),
);

export default api;
