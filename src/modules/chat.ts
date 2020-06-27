import {
  ActionType,
  createReducer,
  createAction,
  createCustomAction
} from "typesafe-actions";
import { apply, call, select, put, take, takeEvery } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { connect } from "socket.io-client";

import { Chat } from '@/interface/chat';

const socket = connect("http://localhost:4000/chat", { path: "/socket.io" });

const JOIN_LOBBY = 'chat/JOIN';
const GET_MESSAGE = 'chat/GET_MESSAGE';
const SEND_MESSAGE = 'chat/SEND_MESSAGE';

export const joinLobby = createAction(JOIN_LOBBY)();
export const getMessage = createAction(GET_MESSAGE)<Chat>();
export const sendMessage = createAction(SEND_MESSAGE)<string>();

const actionTypes = { joinLobby, getMessage, sendMessage };

type ChatAction = ActionType<typeof actionTypes>

type ChatState = {
  chat: Chat | null;
};

const initialState: ChatState = {
  chat: null
};

function createSocketChannel(socket: any) {
  return eventChannel((emit: any) => {
    const chatHandler = ({userName, message}: Chat) => {
      console.log(123);
      
      emit({
        message,
        userName
      });
    };

    socket.on("join", chatHandler);
    socket.on('getMessage', chatHandler);

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.off("join", chatHandler);
      socket.off('getMessage', chatHandler);
    };

    return unsubscribe;
  });
}

function* joinLobbySaga() {
  const { userName } = yield select((state) => state.user);
  yield apply(socket, socket.emit, ["joinConnect", { userName }]);
}

function* sendMessageSaga(action: any) {
  const { userName } = yield select((state) => state.user);
  yield apply(socket, socket.emit, ["sendMessage", { userName, message: action.payload }]);
}

// const chat = createReducer<ChatState, ChatAction>(initialState, {
//   [GET_MESSAGE]: (state, action) => ({
//     ...state,
//     message: action.payload.message,
//     userName: action.payload.userName
//   }),
//   [SEND_MESSAGE]: (state, action) => ({
//     ...state,
//   }),
//   [JOIN_LOBBY]: (state, action) => ({
//     ...state
//   })
// });

const chat = createReducer<ChatState, any>(initialState).handleAction(getMessage, (state: any, action: any) => {
  return {
    ...state,
    chat: action.payload
  }
});

export function* chatSaga() {
  const socketChannel = yield call(createSocketChannel, socket);
  
  yield takeEvery(JOIN_LOBBY, joinLobbySaga);
  yield takeEvery(SEND_MESSAGE, sendMessageSaga);

  while (true) {
    const payload = yield take(socketChannel);

    yield put({ type: GET_MESSAGE, payload });
  }
}

export default chat;
