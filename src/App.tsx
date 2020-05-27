import React, { useEffect } from 'react';
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
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound';

const App: React.FC = () => {
  const [state, onCheckStatus] = useRequest(checkStatus, [], false);  
  const dispatch = useDispatch();
  const uid = useSelector((state: RootState) => state.user.uid);

  useEffect(() => {
    onCheckStatus();
  }, [uid, onCheckStatus]);

  useEffect(() => {
    if (!state.data || !!state.error) {
      dispatch(removeUser());
      return;
    }

    if (uid !== state.data.uid) {
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
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
