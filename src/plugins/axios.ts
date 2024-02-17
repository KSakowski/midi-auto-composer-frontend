import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.APP_API_URL as string,
});
