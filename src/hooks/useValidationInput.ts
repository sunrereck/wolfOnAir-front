import { renderHook, act } from "@testing-library/react-hooks";

import useValidationInput from './useValidationInput';

describe('useValidationInput', () => {
  test('state, error 값들이 정상적으로 initialize 된다.', () => {
    const { result } = renderHook(() => useValidationInput(''));
    const [name] = result.current;

    expect(name).toEqual('');
  });
});