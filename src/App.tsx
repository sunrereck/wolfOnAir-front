import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GlobalStyles from '@/globalStyles';

const Home: React.SFC = () => {
  return <div>123456</div>
}

const App: React.FC = () => {
  return (
    <>
    <GlobalStyles/>
    <Switch>
      <Route exact path="/" components={Home} />
      <Route exact path="/123" components={Home} />
    </Switch>
    </>
  );
}

export default App;
