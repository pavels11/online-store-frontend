import axios from 'axios';

import { ACCESS_TOKEN_KEY } from '../config/auth';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    return Promise.reject(error);
  }
);

export { api };

export default api;
