import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkStatus } from '@/api/user';

import { RootState } from '@/modules';
import { removeUser, setUser } from '@/modules/user';
 
import useRequest from '@/hooks/useRequest';

// import PageLoader from '@/components/atoms/PageLoader';

function WithAuth(
  WrappedComponent: React.ComponentType
): React.ComponentType {
  const ComponentWithExtraInfo: React.FC = (props) => {
    const dispatch = useDispatch();
    const uid = useSelector((state: RootState) => (state.user.uid));
    const [
      data,
      error,
      isLoading
    ] = useRequest(checkStatus, [], false);  


    useEffect(() => {
      if (!!error) {
        dispatch(removeUser());
        return;
      }
  
      if (data  && (uid !== data.uid)) {
        dispatch(setUser({
          uid: data.uid,
          userName: data.userName
        }))
      }
  
    }, [dispatch, error, data, uid]);

    if (isLoading) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithExtraInfo;
}

export default WithAuth;