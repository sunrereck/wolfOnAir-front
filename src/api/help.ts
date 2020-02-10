import axios from './core';

export function sendJoinAuthHelpEmail(email: string) {
  const formData = new FormData();

  formData.append('email', email);

  return axios.post(`/help/join/auth`, formData);
}

