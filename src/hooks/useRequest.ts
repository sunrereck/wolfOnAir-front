import { useEffect, useReducer } from 'react';

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
 * @param initialize 맨 처음 mount 되었을 때 호출할 지 말지 여부 확인
 */
function useRequest (callback: any, deps: any =[], initialize = false) {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    error: null,
    isLoading: false
  });

  const fetchData = async (...params: any ) => {
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

    } catch(e) {
      dispatch({
        type: 'FAIL',
        error: e.message
      })

      throw e;
    }
  };

  useEffect(() => {
    if (!initialize) {
      return;
    }
    
    fetchData();

    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useRequest;