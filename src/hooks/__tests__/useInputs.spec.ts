import { ChangeEvent } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import useInputs from '../useInputs';

describe("useInputs", () => {
  test('state 값들이 정상적으로 initialize 된다.', () => {
    const { result } = renderHook(() => useInputs({
      name: '',
      value: ''
    }));
    const [state] = result.current;

    expect(state.name).toEqual('');
    expect(state.value).toEqual('');
  })

  test('onChange 함수가 정상적으로 작동한다.', () => {
    const { result } = renderHook(() => useInputs({
      name: '',
      value: ''
    }));
    
    const [, onChange] = result.current;

    act(() => {
      onChange({
        target: {
          name: 'name',
          value: 'test'  
        }
      } as ChangeEvent<HTMLInputElement>);

      onChange({
        target: {
          name: 'value',
          value: 'test2'  
        }
      } as ChangeEvent<HTMLInputElement>);
    });

    const [state] = result.current;

    expect(state.name).toEqual('test');
    expect(state.value).toEqual('test2');
  });
});
