import { ChangeEvent } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import useForm from '../useForm';

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function validate(value: string) {
  if (!value) {
    return 'error'!
  }

  return value === 'error' ? 'error!' : '';
} 

async function asyncValidate (value: string) {
  return timeout(1000).then(() => {
    if (['john', 'paul', 'george', 'ringo'].includes(value)) {
      return 'That username is taken' as string
    }

    return '';
  });
}

describe("useForm", () => {
  test('state 값들이 정상적으로 initialize 된다.', () => {
    const { result } = renderHook(() => useForm<{
      name: string;
      value: string;
    }>({
      name: '',
      value: ''
    }));
    const [values] = result.current;

    expect(values.name).toEqual('');
    expect(values.value).toEqual('');
  });

  test('state 값들이 정상적으로 변경된다.', () => {
    const { result } = renderHook(() => useForm<{
      value: string;
    }>({
      value: ''
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
    const { result } = renderHook(() => useForm<{
      value: string;
    }>({
      value: ''
    }));
    const [,,, onValidate] = result.current;

    act(() => {
      onValidate(validate, asyncValidate)({
        target: {
          value: 'error',
          name: 'value'
        }
      } as ChangeEvent<HTMLInputElement>);
    })

    const [, errors,,,, isValid] = result.current;

    expect(errors.value).toEqual('error!');
    expect(isValid).toEqual(false);

    await act(async () => {
      await onValidate(validate, asyncValidate)({
        target: {
          value: 'paul',
          name: 'value'
        }
      } as ChangeEvent<HTMLInputElement>);
    })

    const [, errors2,,,, isValid2] = result.current;

    expect(errors2.value).toEqual('That username is taken');
    expect(isValid2).toEqual(false);

    await act(async () => {
      await onValidate(validate, asyncValidate)({
        target: {
          value: 'not paul',
          name: 'value'
        }
      } as ChangeEvent<HTMLInputElement>);
    })

    const [, errors3,,,, isValid3] = result.current;

    expect(errors3.value).toEqual('');
    expect(isValid3).toEqual(true);
  })


  // test('onSubmit 함수를 정상적으로 실행할 수 있다.', () => {})
});
