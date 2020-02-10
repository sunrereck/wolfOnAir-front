import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080/api';

const customAxios = axios.create({
  baseURL: baseUrl,
  withCredentials: true
});

export default customAxios;