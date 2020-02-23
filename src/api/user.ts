import axios from './core';

export function checkAvailabilityEmail(email: string) {
  return axios.get(`/user/join/availability-email/${email}`);
}

export function checkAvailabiltyUser(userName: string) {
  return axios.get(`/user/join/availability-nickname/${userName}`);
}

export function joinUser(values: {
  email: string;
  password: string;
  userName: string;
}) {
  // const formData = new FormData();

  // formData.append('email', values.email);
  // formData.append('password', values.password);
  // formData.append('userName', values.userName);

  return axios.post('/user/join', values);
}

export function sendAuthEmail(email: string) {

  return axios.post('/user/join/auth', {email});
}

export function updateUserAuth(email: string) {
  return axios.put('/user/join/auth', {email});
}