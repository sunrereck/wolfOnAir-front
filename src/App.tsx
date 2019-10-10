import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Home = () => {
  return <div>홈</div>
}

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" components={Home} />
    </Switch>
  );
}

export default App;
