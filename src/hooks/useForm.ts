import React, { useReducer, useState } from 'react';

interface StateType {
  values: {
    [name: string]: string;
  };
  errors: {
    [name: string]: string;
  };
}

interface ActionType {
  type: string;
  name: string;
  value: string;
}

function reducer(state: StateType, action: ActionType) {
  const { name, type, value } = action;

  switch (type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        values: {
          ...state.values,
          [name]: value
        }
      };
    case 'CHECK_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [name]: value
        }
      };
    default:
      return {
        ...state
      };
  }
}

export default function useForm(values: object, validate?: Function, asyncValidation?: Function) {
  const [isValid, setValid] = useState(true);
  const [isSubmit, setSubmit] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    values: { ...values },
    errors: {}
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  };

  const onBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let willBeValid = true;
    let error = '';
    const { name, value } = e.target;

    if (!!validate){
      error = validate(name, value, state.values, dispatch);
    }

    if (!error && !!asyncValidation) {
      error = await asyncValidation(name, value, state.values, dispatch);
    }

    const newErrors = {
      ...state.errors,
      [name]: error
    };
    const keys = Object.keys(newErrors);

    keys.forEach((key) => {
      if (!!newErrors[key]) {
        willBeValid = false;
      }
    });

    // setValid(willBeValid);

    dispatch({
      type: 'CHECK_ERROR',
      name,
      value: error
    });
  };

  const onSubmit = async (
    callback: Function, 
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    // setSubmit(true);

    try {
      await callback();
    } catch(e) {
      //
    } finally {
      // setSubmit(false);
    }
  };

  return [state, isValid, isSubmit, onChange, onBlur, onSubmit, dispatch] as [
    StateType,
    boolean,
    boolean,
    typeof onChange,
    typeof onBlur,
    typeof onSubmit,
    typeof dispatch
  ];
}
