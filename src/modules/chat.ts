import {
  ActionType,
  createReducer,
  createAsyncAction,
  action,
} from "typesafe-actions";

const JOIN_LOBBY = "chat/JOIN_LOBBY";
const JOIN_LOBBY_SUCCESS = "chat/JOIN_LOBBY_SUCCESS";
const JOIN_LOBBY_FAILURE = "chat/JOIN_LOBBY_FAILURE";

const JOIN_ROOM = "chat/JOIN_ROOM";
const JOIN_ROOM_SUCCESS = "chat/JOIN_ROOM_SUCCESS";
const JOIN_ROOM_FAILURE = "chat/JOIN_ROOM_FAILURE";

export const joinLobby = createAsyncAction(
  JOIN_LOBBY,
  JOIN_LOBBY_SUCCESS,
  JOIN_LOBBY_FAILURE
)<boolean, boolean, boolean, boolean>();
export const joinRoom = createAsyncAction(
  JOIN_ROOM,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAILURE
)<string, string, string>();

const actions = { joinLobby, joinRoom };

type ChatAction = ActionType<typeof actions>;
type ChatState = {
  isConnecting: boolean;
  isJoinedChat: boolean;
};

const initialState = {
  isConnecting: false,
  isJoinedChat: false,
};

const chat = createReducer<ChatState, ChatAction>(initialState).handleAction(
  joinLobby.request,
  (state, action) => ({
    ...state,
    isConnecting: action.payload,
  })
);

export default chat;
