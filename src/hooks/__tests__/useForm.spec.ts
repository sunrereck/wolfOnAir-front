import { ChangeEvent } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import useForm from '../useForm';

interface FormValues {
  name: string;
  value: string;
}

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function validate(values: FormValues): FormValues {
  const errors = {} as FormValues;

  if (!values.name) {
    errors.name = 'no value';
  } else if (values.name === 'error') {
    errors.name = 'It is Error!';
  }

  if (!values.value) {
    errors.value = 'no value';
  }

  return errors;
} 

async function asyncValidateName (name: string) {
  return timeout(1000).then(() => {
    if (['john', 'paul', 'george', 'ringo'].includes(name)) {
      return { name: 'That name is taken' }
    }

    return { name: '' }
  });
}

describe("useForm", () => {
  test('state 값들이 정상적으로 initialize 된다.', () => {
    const { result } = renderHook(() => useForm({
      initialValues: {
        name: '',
        value: ''
      },
      validate,
      asyncValidate: {
        name: asyncValidateName
      }
    }));
    const [values] = result.current;

    expect(values.name).toEqual('');
    expect(values.value).toEqual('');
  });

  test('state 값들이 정상적으로 변경된다.', () => {
    const { result } = renderHook(() => useForm({
      initialValues: {
        name: '',
        value: ''
      },
      validate,
      asyncValidate: {
        name: asyncValidateName
      }
    }));
    const [,, onChange] = result.current;

    act(() => {
      onChange({
        target: {
          value: 'test',
          name: 'value'
        }
      } as ChangeEvent<HTMLInputElement>);  
    });
   
    const [values] = result.current;

    expect(values.value).toEqual('test');
  });

  test('state 값들의 validation check를 정상적으로 할 수 있다.', async () => {
    const { result } = renderHook(() => useForm({
      initialValues: {
        name: '',
        value: ''
      },
      validate,
      asyncValidate: {
        name: asyncValidateName
      }
    }));
    const [,,, onBlur] = result.current;

    act(() => {
      onBlur({
        target: {
          value: '',
          name: 'name'
        }
      } as ChangeEvent<HTMLInputElement>);
    })

    act(() => {
      onBlur({
        target: {
          value: '',
          name: 'value'
        }
      } as ChangeEvent<HTMLInputElement>);
    })

    const [, errors] = result.current;

    expect(errors.value).toEqual('no value');

    await act(async () => {
      await onBlur({
        target: {
          name: 'name',
          value: 'john'
        }
      } as ChangeEvent<HTMLInputElement>);
    })

    const [, errors2] = result.current;

    expect(errors2.name).toEqual('That name is taken');

    await act(async () => {
      await onBlur({
        target: {
          name: 'name',
          value: 'test'
        }
      } as ChangeEvent<HTMLInputElement>);
    })

    const [, errors3] = result.current;

    expect(errors3.name).toEqual(undefined);
  })


  test('onSubmit 함수를 실행헀을 때 validation check가 가능하다.', async () => {
    const { result } = renderHook(() => useForm({
      initialValues: {
        name: '',
        value: ''
      },
      validate,
      asyncValidate: {
        name: asyncValidateName
      }
    }));
    const [,,,, onSubmit] = result.current;

    await act(async () => {
      await onSubmit(() => console.log(123))();
    })
    
    const [, errors] = result.current;

    expect(errors.name).toEqual('no value');
    expect(errors.value).toEqual('no value');

    const [,,onChange] = result.current;

    act(() => {
      onChange({
        target: {
          name: 'name',
          value: 'john'
        }
      } as ChangeEvent<HTMLInputElement>)
      onChange({
        target: {
          name: 'value',
          value: 'test'
        }
      } as ChangeEvent<HTMLInputElement>)
    })

    const [,,,,onSubmit2] = result.current;

    await act(async () => {
      await onSubmit2(() => console.log(123))();
    })

    const [, errors2] = result.current;

    expect(errors2.name).toEqual('That name is taken');
  })

  test('onSubmit 함수가 정상적으로 실행된다.', () => {
    const { result } = renderHook(() => useForm({
      initialValues: {
        name: '',
        value: ''
      },
      validate,
      asyncValidate: {
        name: asyncValidateName
      }
    }));
    const [,,, onBlur] = result.current;
  })
});
