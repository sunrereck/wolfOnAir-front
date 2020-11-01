import {
  ActionType,
  createAction,
  createReducer
} from 'typesafe-actions';

const SET_USER = 'user/SET_USER';
const REMOVE_USER = 'user/REMOVE_USER';

export const setUser = createAction(SET_USER)<{
  uid: number;
  userName: string;
}>(); 
export const removeUser = createAction(REMOVE_USER)();

const actionTypes = { setUser, removeUser };

type UserAction = ActionType<typeof actionTypes>

type UserState = {
  isLoading: boolean;
  isLoggedIn: boolean;
  uid: number;
  userName: string;
};

const initialState: UserState = {
  isLoading: true,
  isLoggedIn: false,
  uid: 0,
  userName: ''
};

const user = createReducer<UserState, UserAction>(initialState, {
  [SET_USER]: (state, action) => ({
    ...state,
    isLoading: false,
    isLoggedIn: true,
    uid: action.payload.uid,
    userName: action.payload.userName
  }),
  [REMOVE_USER]: (state) => ({
    ...state,
    isLoading: false,
    isLoggedIn: false,
    uid: 0,
    userName: ''
  })
});

export default user;