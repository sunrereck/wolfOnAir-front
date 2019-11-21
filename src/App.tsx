import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GlobalStyles from '@/globalStyles';

import Home from '@/pages/Home';

const App: React.FC = () => {
  return (
    <>
    <GlobalStyles/>
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route exact path="/123" component={Home} /> */}
    </Switch>
    </>
  );
}

export default App;
