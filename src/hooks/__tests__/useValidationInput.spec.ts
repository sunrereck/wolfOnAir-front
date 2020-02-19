import { ChangeEvent } from 'react';
import { renderHook, act } from "@testing-library/react-hooks";

import useValidationInput from '../useValidationInput';

describe('useValidationInput', () => {
  test('state, error 값들이 정상적으로 initialize 된다.', () => {
    const { result } = renderHook(() => useValidationInput(''));
    const [value, errorMessage, isValid, isError] = result.current;

    expect(value).toEqual('');
    expect(errorMessage).toEqual('');
    expect(isValid).toEqual(false);
    expect(isError).toEqual(false);
  });

  test('onChagne 함수가 정상적으로 실행된다.', () => {
    const { result } = renderHook(() => useValidationInput(''));
    const [,,,, onChange] = result.current;

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
});