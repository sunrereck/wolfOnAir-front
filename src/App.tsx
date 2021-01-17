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
import JoinUserAuthResult from '@/pages/JoinUserAuthResult';
import Login from '@/pages/Login';
// import Lobby from '@/pages/Lobby';
// import Room from '@/pages/Room';
import NotFound from '@/pages/NotFound';

function App(): React.ReactElement {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/user/login" component={Login} />
      <Route exact path="/user/join" component={Join} />
      <Route exact path="/user/join/:email/send-email" component={JoinResult} />
      <Route exact path="/user/join/:email/send-email/auth" component={JoinUserAuthResult} />
      {/* <Route exact path='/lobby' component={Lobby} />
      <Route exact path="/room/:roomId" component={Room} /> */}
      <Route component={NotFound} />
    </Switch>
  )
} 

export default App;
