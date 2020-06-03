import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { checkStatus } from '@/api/user';

import useRequest from '@/hooks/useRequest';

import { RootState } from '@/modules';
import { removeUser, setUser } from '@/modules/user';
 
import Home from '@/pages/Home';
import Join from '@/pages/Join';
import JoinResult from '@/pages/JoinResult';
import EmailAuthResult from '@/pages/EmailAuthResult';
import Login from '@/pages/Login';
import Lobby from '@/pages/Lobby';
import NotFound from '@/pages/NotFound';

const App: React.FC = () => {
  const [isCheckedAuth, setCheckAuth] = useState(false);
  const dispatch = useDispatch();
  const uid = useSelector((state: RootState) => (state.user.uid));
  const [state] = useRequest(checkStatus, [uid], false);  

  useEffect(() => {
    if (!!state.error) {
      dispatch(removeUser());
      setCheckAuth(true);
      return;
    }

    if (state.data  && (uid !== state.data.uid)) {
      setCheckAuth(true);
      dispatch(setUser({
        uid: state.data.uid,
        userName: state.data.userName
      }))
    }

  }, [state, dispatch, uid]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/user/login" component={Login} />
      <Route exact path="/user/join" component={Join} />
      <Route exact path="/user/join/:email/send-email" component={JoinResult} />
      <Route exact path="/user/join/:email/send-email/auth" component={EmailAuthResult} />
      <Route exact path='/lobby' render={() => <Lobby isCheckingAuth={!isCheckedAuth || state.isLoading} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
