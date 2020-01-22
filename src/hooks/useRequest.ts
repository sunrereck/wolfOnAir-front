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

function useRequest (callback: any, deps: any =[]) {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    error: null,
    isLoading: false
  });

  useEffect(() => {
    dispatch({
      type: 'LOADING',
      isLoading: true
    });


    const fetchData = async () => {
      try {
        const response = await callback();
        dispatch({
          type: 'SUCCESS',
          data: response.data
        });

      } catch(e) {
        dispatch({
          type: 'FAIL',
          error: e.message
        })
      } finally {

      }
    };
    
    fetchData();

    // eslint-disable-next-line
  }, deps);

  return [state];
}

export default useRequest;