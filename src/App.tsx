import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GlobalStyles from '@/globalStyles';

import Home from '@/pages/Home';
import Join from '@/pages/Join'
import JoinResult from '@/pages/JoinResult';
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound';

const App: React.FC = () => {
  return (
    <>
    <GlobalStyles/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/user/login" component={Login} />
      <Route exact path="/user/join" component={Join} />
      <Route exact path="/user/join/:email" component={JoinResult} />

      <Route component={NotFound} />
    </Switch>
    </>
  );
}

export default App;
