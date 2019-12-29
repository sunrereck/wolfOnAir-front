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

export default function useForm(values: object, validate: Function) {
  const [state, dispatch] = useReducer(reducer, {
    values: {
      ...values
    },
    errors: {}
  });
  const [isValid, setValid] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

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
    const { name, value } = e.target;
    const error = await validate(name, value, state.values, dispatch);
    const keys = Object.keys(error);

    keys.forEach(key => {
      if (error[key] !== '') {
        willBeValid = false;
      }
    });

    setValid(willBeValid);

    dispatch({
      type: 'CHECK_ERROR',
      name,
      value: error
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => async (
    callback: Function
  ) => {
    e.preventDefault();

    setSubmit(true);

    try {
      if (!isValid) {
        throw new Error();
      }

      await callback();
    } catch (error) {
      //
    }

    setSubmit(false);
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
