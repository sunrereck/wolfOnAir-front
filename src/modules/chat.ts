import {
  createAction,
  createReducer,
  ActionType
} from "typesafe-actions";
import { call, put, select, take, takeEvery } from "redux-saga/effects";
import { buffers, eventChannel } from "redux-saga";

import SocketIOClient, { connect } from "socket.io-client";

import { Chat } from '@/interface/chat';

interface Join extends Chat {
  roomId: string;
}

const socket = connect("http://localhost:4000/chat", { path: "/socket.io" });

// user 관련 Action
const ADD_USER = 'chat/ADD_USER';
const REMOVE_USER = 'chat/REMOVE_USER';

// message 관련 Action
const GET_MESSAGE = 'chat/GET_MESSAGE';
const SEND_MESSAGE = 'chat/SEND_MESSAGE';

// 접속 관련 Action
const JOIN = 'chat/JOIN';
const JOIN_SUCCESS = 'chat/JOIN_SUCCESS';
const LEAVE = 'chat/LEAVE';

const getMessage = createAction(GET_MESSAGE)<Chat>();

export const join = createAction(JOIN)();
export const joinSuccess = createAction(JOIN_SUCCESS)<Join>();
export const sendMessage = createAction(SEND_MESSAGE)<string>();

const actionTypes = { getMessage, join, joinSuccess };

type ChatAction = ActionType<typeof actionTypes>

type ChatState = {
  chat: Chat | null;
  roomId: string;
};

const initialState: ChatState = {
  chat: null,
  roomId: ''
};

function createSocketChannel(socket: SocketIOClient.Socket, buffer: any) {
  return eventChannel((emit: any) => {
    const chatHandler = ({userName, message}: Chat) => {
      emit({
        type: GET_MESSAGE,
        message,
        userName
      });
    };

    const joinHandler = ({userName, message, roomId}: Join) => {
      emit({
        type: JOIN_SUCCESS,
        message,
        roomId,
        userName
      })
    }

    socket.on('getMessage',chatHandler);
    socket.on("join", joinHandler);

    const unsubscribe = () => {
      socket.off('getMessage', chatHandler);
      socket.off("join", joinHandler);
    };

    return unsubscribe;
  }, buffer || buffers.none());
}

export function *joinSaga() {
  const { userName } = yield select((state) => state.user);

  socket.emit('joinConnect', { userName });
}

export function *sendMessageSaga(action: {
  type: string;
  payload: string
}) {
  const { roomId, userName } = yield select((state) => ({
    roomId: state.chat.roomId,
    userName: state.user.userName
  }));

  socket.emit('sendMessage', { userName, message: action.payload, roomId });
}
 
export function* chatSaga() {
  const socketChannel = yield call(createSocketChannel, socket, buffers.sliding(1));

  yield takeEvery(JOIN, joinSaga);
  yield takeEvery(SEND_MESSAGE, sendMessageSaga);

  while (true) {
    try {
      const payload = yield take(socketChannel);

      yield put({ type: payload.type, payload })

    } catch (err) {
      //
    }
  }
}

const chat = createReducer<ChatState, ChatAction>(initialState, {
  [GET_MESSAGE]: (state: ChatState, action: any) => {
    return {
    ...state,
    chat: {
      message: action.payload.message,
      userName: action.payload.userName  
    }
  }
  },
  [JOIN_SUCCESS]: (state: ChatState, action: any) => ({
    ...state,
    roomId: action.payload.roomId,
    chat: {
      message: action.payload.message,
      userName: action.payload.userName  
    }
  })
});

export default chat;
