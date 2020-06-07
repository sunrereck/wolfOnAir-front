import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4000/api';

const customAxios = axios.create({
  baseURL: baseUrl,
  withCredentials: true
});

export function connectLobby(uid: number) {
  return customAxios.get('/chat/lobby', {
    params: {
      uid
    }
  });
}