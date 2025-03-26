import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL as string,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (config.method?.toUpperCase() === 'POST') {
    config.responseType = 'arraybuffer';
  }
  return config;
});
