import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';
 
import Home from '@/pages/Home';
import Join from '@/pages/Join';
import JoinResult from '@/pages/JoinResult';
import EmailAuthResult from '@/pages/EmailAuthResult';
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound';

function getCookie(name: string) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");

  // @ts-ignore
  if (!!parts && parts.length === 2) return parts.pop().split(";").shift();
}

const App: React.FC = () => {
  
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('');

    console.log(cookies, getCookie('access_token'));

   if (!cookies) {
     return;
   }

  }, []);

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
