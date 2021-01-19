import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { checkStatus } from '@/api/user';

import { RootState } from '@/modules';
import { setUser, removeUser } from '@/modules/user';

import useRequest from '@/hooks/useRequest';

function useAuth() {
    const dispatch = useDispatch();
    const {
        isLoggedIn,
        uid,
        userName,
    } = useSelector((state: RootState) => state.user);
    const [
        checkStatusData,
        checkStatusError,
        ,
        ,
        onResetCheckStatus
    ] = useRequest(checkStatus, {}, false);
    const [isLoading, setIsLoading] = useState(true);

  
    const onSetUser = useCallback((uid: number, userName: string) => {
      dispatch(setUser({
          uid, 
          userName
      }));
    }, [dispatch]);
  
    const onRemoveUser = useCallback(() => {
      dispatch(removeUser());
    }, [dispatch]);

    useEffect(() => {
        if (!checkStatusError) {
            return;
        }

        setIsLoading(false);
        onRemoveUser();
        onResetCheckStatus();
    }, [
        checkStatusError,
        onRemoveUser,
        onResetCheckStatus
    ])
 
    useEffect(() => {
        if (!checkStatusData) {
            return;
        }

        if (checkStatusData.uid === uid) {
            setIsLoading(false);

            return;
        }

        setIsLoading(false);
        onSetUser(checkStatusData.uid, checkStatusData.userName);
        onResetCheckStatus();
    }, [
      checkStatusData,
      uid,
      onResetCheckStatus,
      onSetUser
    ]);

    return [
        isLoading,
        isLoggedIn,
        uid,
        userName
    ];
  };

export default useAuth;