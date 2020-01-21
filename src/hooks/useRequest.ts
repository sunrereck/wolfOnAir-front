import { useEffect, useReducer, useCallback } from 'react';

function reducer(state: any, action: any) {
  switch(action.type) {
    case 'SUCCESS': {
      return {
        data: action.data,
        loading: false,
        error: null,
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

function useRequest (callback: any, deps: any =[]) {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    error: null,
    isLoading: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callback();
  
        dispatch({
          type: 'SUCCESS',
          data: response
        });
      } catch(e) {
        //
      }
    };
    
    fetchData();
  }, [callback, deps]);

  return [state];
}

export default useRequest;