import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '@/pages/Home';
// import Join from '@/pages/Join';
// import JoinResult from '@/pages/JoinResult';
// import EmailAuthResult from '@/pages/EmailAuthResult';
// import Login from '@/pages/Login';
// import Lobby from '@/pages/Lobby';
// import Room from '@/pages/Room';
import NotFound from '@/pages/NotFound';

const App: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    {/* <Route exact path="/user/login" component={Login} />
    <Route exact path="/user/join" component={Join} />
    <Route exact path="/user/join/:email/send-email" component={JoinResult} />
    <Route exact path="/user/join/:email/send-email/auth" component={EmailAuthResult} />
    <Route exact path='/lobby' component={Lobby} />
    <Route exact path="/room/:roomId" component={Room} /> */}
    <Route component={NotFound} />
  </Switch>
)

export default App;
