import { useReducer } from 'react';

interface UseInputsAction {
  name: string;
  value: string;
};

function reducer<T>(state: T, action: UseInputsAction) {
  return {
    ...state,
    [action.name]: action.value
  }
}

export default function useInputs<T>(values: T) {
  const [state, dispatch] = useReducer(reducer, values);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      name: e.target.name,
      value: e.target.value
    })
  }
 
  return [state, onChange];
}
