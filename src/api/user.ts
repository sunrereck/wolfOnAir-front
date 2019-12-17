import axios from './core';

export function checkEmail(email: string) {
  return axios.get(`/user/join/availability-email/${email}`);
}

export function checkUserName(userName: string) {
  return axios.get(`/user/join/availability-nickname/${userName}`);
}

export function joinUser(values: {
  email: string;
  password: string;
  userName: string;
}) {
  const formData = new FormData();

  formData.append('email', values.email);
  formData.append('password', values.password);
  formData.append('userName', values.userName);

  return axios.post('/user/join', formData);
}

export function sendEmail(email: string) {
  const formData = new FormData();

  formData.append('email', email);

  return axios.post('/user/join/send-email', formData);
}
