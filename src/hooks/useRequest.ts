import { useEffect, useReducer } from 'react';

function reducer() {
  return {
    data: null,
    error: null,
    isLoading: false
  }
}

function useRequest (callback: any, deps: any =[]) {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    error: null,
    isLoading: false
  });

  return [state];
}

export default useRequest;