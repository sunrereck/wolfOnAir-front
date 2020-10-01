import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkStatus } from '@/api/user';

import { RootState } from '@/modules';
import { removeUser, setUser } from '@/modules/user';
 
import useRequest from '@/hooks/useRequest';

import PageLoader from '@/components/atoms/PageLoader';

function WithAuth(
  WrappedComponent: React.ComponentType
): React.ComponentType {
  const ComponentWithExtraInfo: React.FC = (props) => {
    const dispatch = useDispatch();
    const uid = useSelector((state: RootState) => (state.user.uid));
    const [state] = useRequest(checkStatus, [], false);  


    useEffect(() => {
      if (!!state.error) {
        dispatch(removeUser());
        return;
      }
  
      if (state.data  && (uid !== state.data.uid)) {
        dispatch(setUser({
          uid: state.data.uid,
          userName: state.data.userName
        }))
      }
  
    }, [dispatch, state, uid]);

    if (state && state.isLoading) {
      return <PageLoader />;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithExtraInfo;
}

export default WithAuth;