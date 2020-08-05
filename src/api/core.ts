import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://mmi86v2vde.execute-api.ap-northeast-2.amazonaws.com/prod/api' : 'http://localhost:8080/api';

const customAxios = axios.create({
  baseURL: baseUrl,
  withCredentials: true
});

export default customAxios;