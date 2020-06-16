import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import chat, { chatSaga } from './chat';
import user from './user'


const rootReducer = combineReducers({
  chat,
  user
});

export function* rootSaga() { 
  yield all([chatSaga()]); 
}

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;