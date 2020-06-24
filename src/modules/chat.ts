import {
  ActionType,
  createReducer,
  createAction,
  action,
} from "typesafe-actions";
import { apply, call, select, put, take, takeEvery } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

import { connect } from "socket.io-client";

const socket = connect("http://localhost:4000/chat", { path: "/socket.io" });

// 로비 접속
const JOIN_LOBBY = "chat/JOIN_LOBBY";

// 채팅
const GET_SYSTEM_MESSAGE = "chat/GET_SYSTEM_MESSAGE";

export const joinLobby = createAction(JOIN_LOBBY)();

type ChatState = {
  systemMessage: string;
};

const initialState: ChatState = {
  systemMessage: ''
};

function createSocketChannel(socket: any) {
  return eventChannel((emit: any) => {
    const systemHandler = (message: any) => {
      emit(message);
    };

    socket.on("system", systemHandler);

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.off("system", systemHandler);
    };

    return unsubscribe;
  });
}

function* joinLobbySaga() {
  const { userName } = yield select((state) => state.user);
  yield apply(socket, socket.emit, ["join", { userName }]);
}

const chat = createReducer<ChatState, any>(initialState).handleAction(GET_SYSTEM_MESSAGE,   (state: any, action: any) => ({
  ...state,
  systemMessage: action.payload
}));

export function* chatSaga() {
  const socketChannel = yield call(createSocketChannel, socket);
  
  yield takeEvery(JOIN_LOBBY, joinLobbySaga);

  while (true) {
    const payload = yield take(socketChannel);

    yield put({ type: GET_SYSTEM_MESSAGE, payload });
  }
}

export default chat;
