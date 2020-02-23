import { ChangeEvent } from 'react';
import { renderHook, act } from "@testing-library/react-hooks";

import useValidationInput from '../useValidationInput';

describe('useValidationInput', () => {
  test('state 값들이 정상적으로 initialize 된다.', () => {
    const { result } = renderHook(() => useValidationInput(''));
    const [value, errorMessage, isValid] = result.current;

    expect(value).toEqual('');
    expect(errorMessage).toEqual('');
    expect(isValid).toEqual(false);
  });

  test('onChagne 함수가 정상적으로 실행된다.', () => {
    const { result } = renderHook(() => useValidationInput(''));
    const [,,, onChange] = result.current;

    act(() => {
      onChange({
        target: {
          value: 'test'
        }
      } as ChangeEvent<HTMLInputElement>);  
    });

    const [value] = result.current;

    expect(value).toEqual('test');
  });

  test('onBlur 함수가 정상적으로 실행된다.', async () => {
    function validateTest(value: string) {
      if (!value) {
        return 'error';
      }
      
      return '';
    }

    const { result } = renderHook(() => useValidationInput('', validateTest));
    const [,,,, onBlur] = result.current;

    await act(async () => {
      await onBlur({
        target: {
          value: ''
        }
      } as ChangeEvent<HTMLInputElement>);  
    });

    const [, errorMessage, isValid] = result.current;

    expect(errorMessage).toEqual('error');
    expect(isValid).toEqual(false);
  });

  test('onSetValid 함수가 정상적으로 실행된다.', () => {
    const { result } = renderHook(() => useValidationInput('test'));

    const [, , , , , onSetValid] = result.current;

    onSetValid(false, 'Error!');

    const [, errorMessage, isValid,] = result.current;


    expect(errorMessage).toEqual('Error!');
    expect(isValid).toEqual(false);
  });

  test('onReset 함수가 정상적으로 실행된다.', () => {
    const { result } = renderHook(() => useValidationInput('test'));

    const [, , , , , , onReset] = result.current;

    onReset();

    const [changedValue] = result.current;

    expect(changedValue).toEqual('test');

  });
});