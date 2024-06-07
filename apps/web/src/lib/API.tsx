import axios from 'axios';

export const BASE_URL = 'https://task-backend-production-eac9.up.railway.app';

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((request) => {
  if (request?.url?.endsWith('login')) return request;

  const token = localStorage.getItem('token');
  request.headers['authorization'] = `Bearer ${token}`;
  request.headers['Content-Type'] =
    request.headers['Content-Type'] || 'application/json';

  return request;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      //   localStorage.removeItem('token');
    }

    return Promise.reject(error);
  }
);

export default API;
