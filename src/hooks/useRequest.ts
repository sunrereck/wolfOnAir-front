import { useCallback, useEffect, useReducer } from 'react';

function reducer(state: any, action: any) {
  switch(action.type) {
    case 'SUCCESS': {
      return {
        data: action.data,
        isLoading: false,
        error: null,
      }
    }
    
    case 'FAIL': {
      return {
        data: null,
        isLoading: false,
        error: action.error
      }
    }

    case 'LOADING': {
      return {
        ...state,
        isLoading: action.isLoading
      }
    }

    case 'RESET': {
      return {
        data: null,
        error: null,
        isLoading: false
      }
    }

    default: 
      return {
        data: null,
        error: null,
        isLoading: false
      }
  }
}

/**
 * @param callback 호출할 api 함수
 * @param deps useEffect에서 didupdate 시킬 값
 * @param isInitialized hooks를 선언하자마자 실행할지 말지 여부
 */
function useRequest (callback: Function, deps: any =[], isInitialized = false) {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    error: null,
    isLoading: false
  });

  const onFetchData = useCallback(async (...params: any) => {
    dispatch({
      type: 'LOADING',
      isLoading: true
    });

    try {
      const response = await callback(...params);

      dispatch({
        type: 'SUCCESS',
        data: response.data
      });

    } catch(err) {
      dispatch({
        type: 'FAIL',
        error: err
      })

      throw err;
    }
  }, [callback]);

  const onReset = () => {
    dispatch({
      type: 'RESET'
    })
  }

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
    
    onFetchData();

  }, [...deps]);

  return [state, onFetchData, onReset];
}

export default useRequest;