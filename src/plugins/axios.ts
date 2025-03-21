import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL as string,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'arraybuffer',
});
