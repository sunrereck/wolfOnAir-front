import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GlobalStyles from '@/globalStyles';

import Home from '@/pages/Home';
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound';

const App: React.FC = () => {
  return (
    <>
    <GlobalStyles/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/user/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

export default App;
