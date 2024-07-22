import axios from 'axios';
export { AxiosError } from 'axios';
import { useGlobalStore } from './useGlobalStore';

export const api = axios.create({
  baseURL: 'https://sharingam.netlify.app/api',
});

api.interceptors.request.use((config) => {
  const { token } = useGlobalStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
