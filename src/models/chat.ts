export interface Chat {
  color?: string;
  message: string;
  room: string;
  type: 'system' | 'user';
  userName: string;
}