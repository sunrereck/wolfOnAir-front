import axios from 'axios';

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_CHAT,
  withCredentials: true
});

export function connectLobby(uid: number) {
  return customAxios.get('/chat/lobby', {
    params: {
      uid
    }
  });
}

export function createRoom(roomTitle: string, userName: string) {
  return customAxios.post('/chat/room', {
    roomTitle,
    userName
  })
}