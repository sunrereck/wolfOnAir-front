import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { checkStatus } from '@/api/user';

import { RootState } from '@/modules';
import { removeUser, setUser } from '@/modules/user';

import useRequest from '@/hooks/useRequest';

import Home from '@/pages/Home';
import Join from '@/pages/Join';
import JoinResult from '@/pages/JoinResult';
// import EmailAuthResult from '@/pages/EmailAuthResult';
import Login from '@/pages/Login';
// import Lobby from '@/pages/Lobby';
// import Room from '@/pages/Room';
import NotFound from '@/pages/NotFound';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const prevUser = useSelector((state: RootState) => state.user);
  const [currentUser, error, isFetchingUser] = useRequest(checkStatus, {}, false);

  const onSetUser = useCallback((uid: number, userName: string) => {
    dispatch(setUser({
        uid, 
        userName
    }));
  }, [dispatch]);

  const onRemoveUser = useCallback(() => {
    dispatch(removeUser());
  }, [dispatch]);

  useEffect(() => {
    if (isFetchingUser) {
      return;
    }
    
    if (error || !currentUser) {
      onRemoveUser();

      return;
    }

    if (prevUser.uid === currentUser.uid) {
      return;
    }

    onSetUser(currentUser.uid, currentUser.userName);
  }, [
    error,
    currentUser,
    isFetchingUser,
    prevUser.uid,
    onRemoveUser,
    onSetUser
  ]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/user/login" component={Login} />
      <Route exact path="/user/join" component={Join} />
      <Route exact path="/user/join/:email/send-email" component={JoinResult} />
      {/* <Route exact path="/user/join/:email/send-email/auth" component={EmailAuthResult} />
      <Route exact path='/lobby' component={Lobby} />
      <Route exact path="/room/:roomId" component={Room} /> */}
      <Route component={NotFound} />
    </Switch>
  )
} 

export default App;
