export type RoomModeTypes = 'wareWolf';

export type RoomStatusTypes = 'wating' | 'full' | 'playing';

export interface Room {
  currentPeopleCount: number; // 현재 입장 수
  maxPeopleCount: number; // 최대 입장 수
  roomTitle: string; // 방이름
  roomStatus: RoomStatusTypes // 상태
  roomMode: RoomModeTypes // 게임 모드
}