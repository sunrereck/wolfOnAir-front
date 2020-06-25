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

const JOIN_LOBBY = 'chat/JOIN';
const GET_MESSAGE = 'chat/GET_MESSAGE';

export const joinLobby = createAction(JOIN_LOBBY)();

type ChatState = {
  chat: {
    user: string;
    message: string;
  };
};

const initialState: ChatState = {
  chat: {
    user: '',
    message: ''
  }
};

function createSocketChannel(socket: any) {
  return eventChannel((emit: any) => {
    const chatHandler = ({user, message}: {user: string; message: string}) => {
      emit({
        user,
        message
      });
    };

    socket.on("join", chatHandler);

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.off("join", chatHandler);
    };

    return unsubscribe;
  });
}

function* joinLobbySaga() {
  const { userName } = yield select((state) => state.user);
  yield apply(socket, socket.emit, ["joinConnect", { userName }]);
}

const chat = createReducer<ChatState, any>(initialState).handleAction(GET_MESSAGE, (state: any, action: any) => {
  return {
    ...state,
    chat: action.payload
  }
});

export function* chatSaga() {
  const socketChannel = yield call(createSocketChannel, socket);
  
  yield takeEvery(JOIN_LOBBY, joinLobbySaga);

  while (true) {
    const payload = yield take(socketChannel);

    yield put({ type: GET_MESSAGE, payload });
  }
}

export default chat;
