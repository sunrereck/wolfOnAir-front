import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '@/pages/Home';
import Join from '@/pages/Join';
import JoinResult from '@/pages/JoinResult';
import JoinUserAuthResult from '@/pages/JoinUserAuthResult';
import Login from '@/pages/Login';
import Lobby from '@/pages/Lobby';
// import Room from '@/pages/Room';
import NotFound from '@/pages/NotFound';

import AuthRoute from '@/components/molecules/AuthRoute';

function App(): React.ReactElement {
  return (
    <Switch>
      <AuthRoute 
        exact 
        path="/"
        type="public">
        <Home />
      </AuthRoute>
      <AuthRoute 
        exact 
        path="/user/login"
        type="guest">
        <Login />
      </AuthRoute>
      <AuthRoute 
        exact 
        path="/user/join"
        type="guest">
        <Join />
      </AuthRoute>
      <AuthRoute 
        exact 
        path="/user/join/:email/send-email"
        type="guest">
        <JoinResult />
      </AuthRoute>
      <AuthRoute 
        exact 
        path="/user/join/:email/send-email/auth"
        type="guest">
        <JoinUserAuthResult />
      </AuthRoute>
      <AuthRoute
        exact
        path="/lobby"
        type="private">
        <Lobby />
      </AuthRoute>
      {/* <Route exact path="/room/:roomId" component={Room} /> */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
} 

export default App;
