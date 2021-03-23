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
  return axios.post('/user/join', values);
}

export function sendJoinAuthEmail(email: string) {

  return axios.post('/user/join/auth', {email});
}

export function updateUserAuth({
  email,
  code
}: {
  email: string,
  code: string
}) {
  return axios.put('/user/join/auth', {
    email,
    code
  });
}

export function loginUser({email, password}: {
  email: string;
  password: string;
}) {
  return axios.post('/user/login', { email, password });
}

export function logoutUser() {
  return axios.post('/user/logout');
}

export function checkStatus() {
  return axios.get('/user/check-status');
}