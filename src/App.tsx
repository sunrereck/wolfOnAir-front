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
import Room from '@/pages/Room';
import NotFound from '@/pages/NotFound';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state: RootState) => (state.user.uid));
  const [isCheckedAuth, setCheckAuth] = useState(false);
  const [state] = useRequest(checkStatus, [], false);  

  useEffect(() => {
    if (!!state.error) {
      setCheckAuth(true);
      dispatch(removeUser());
      return;
    }

    if (state.data  && (uid !== state.data.uid)) {
      setCheckAuth(true);
      dispatch(setUser({
        uid: state.data.uid,
        userName: state.data.userName
      }))
    }

  }, [state]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/user/login" component={Login} />
      <Route exact path="/user/join" component={Join} />
      <Route exact path="/user/join/:email/send-email" component={JoinResult} />
      <Route exact path="/user/join/:email/send-email/auth" component={EmailAuthResult} />
      <Route exact path='/lobby' render={(props) => <Lobby isCheckingAuth={!isCheckedAuth || state.isLoading} {...props} />} />
      <Route exact path="/room/:roomId" render={(props) => <Room isCheckingAuth={!isCheckedAuth || state.isLoading} {...props} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
