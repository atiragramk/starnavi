import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API,
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);
