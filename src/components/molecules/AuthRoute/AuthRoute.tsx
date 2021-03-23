import React, { useEffect, useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import Maybe from '@/components/atoms/Maybe';
import DelayUnmount from '@/components/atoms/DelayUnmount';
import LoadingScreen from '@/components/atoms/LoadingScreen';

import useAuth from '@/hooks/useAuth';

type AuthType = 'public' | 'private' | 'guest';

interface AuthRouteProps extends RouteProps {
  children: React.ReactElement;
  type: AuthType;
}

function AuthRoute({
  children,
  type,
  ...others
}: AuthRouteProps) {
  const [isFetchingUserAuth, isLoggedIn] = useAuth();
  const [isLoading, setIsLoading] = useState(isFetchingUserAuth);

  useEffect(() => {
    if (!isFetchingUserAuth) {
      setIsLoading(false);
    }
  }, [isFetchingUserAuth]);

  return (
    <Route
      {...others}
      render={({ location }) => (
        <>
          <DelayUnmount isMounted={isFetchingUserAuth as boolean}>
            <LoadingScreen />
          </DelayUnmount>
          {
            !isLoading && (
              <>
                <Maybe condition={type === 'guest'}>
                  {
                    isLoggedIn ? (
                      <Redirect to="/" />
                    ) : (
                        children
                      )
                  }
                </Maybe>
                <Maybe condition={type === 'private'}>
                  {
                    isLoggedIn ? (
                      children
                    ) : (
                        <Redirect to={{
                          pathname: '/user/login',
                          search: `?from=${location.pathname}${location.search}`
                        }} />
                      )
                  }
                </Maybe>
                <Maybe condition={type === 'public'}>
                  {children}
                </Maybe>
              </>
            )
          }
        </>
      )}
    />
  );
}

export default AuthRoute;