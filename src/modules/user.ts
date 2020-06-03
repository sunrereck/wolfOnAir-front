import {
  deprecated,
  ActionType,
  createReducer
} from 'typesafe-actions';

const { createStandardAction } = deprecated;

const SET_USER = 'user/SET_USER';
const REMOVE_USER = 'user/REMOVE_USER';

export const setUser = createStandardAction(SET_USER)<{
  uid: number;
  userName: string;
}>(); 
export const removeUser = createStandardAction(REMOVE_USER)();

const actionTypes = { setUser, removeUser };

type UserAction = ActionType<typeof actionTypes>

type UserState = {
  isLoggedIn: boolean;
  uid: number;
  userName: string;
};

const initialState: UserState = {
  isLoggedIn: false,
  uid: 0,
  userName: ''
};

const user = createReducer<UserState, UserAction>(initialState, {
  [SET_USER]: (state, action) => ({
    ...state,
    isLoggedIn: true,
    uid: action.payload.uid,
    userName: action.payload.userName
  }),
  [REMOVE_USER]: (state) => ({
    ...state,
    isLoggedIn: false,
    uid: 0,
    userName: ''
  })
});

export default user;