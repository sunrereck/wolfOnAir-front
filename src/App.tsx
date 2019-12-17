import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '@/pages/Home';
import Join from '@/pages/Join';
import JoinResult from '@/pages/JoinResult';
import EmailAuthResult from '@/pages/EmailAuthResult';
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/user/login" component={Login} />
      <Route exact path="/user/join" component={Join} />
      <Route exact path="/user/join/:email/send-email" component={JoinResult} />
      <Route exact path="/user/join/auth/:email" component={EmailAuthResult} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
