import { act, wait } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { checkUserName } from '@/api/user';

import useForm from '../useForm';

function mockValidation(name: string, value: string) {
  if (!value) {
    return 'error';
  }

  return '';  
}

async function mockAsyncValidation(name: string, value: string) {
  let error = '';

  try {
    const response = await checkUserName(value);
  
    if (!response.data.isOk) {
      error = 'async error';
    }

  } catch (e) {
    error = '통신 에러';
  }

  return error;
}

describe("useForm Test", () => {
  const values = {
    name: '',
    value: '',
  };

  test('form이 정상적으로 initialize 된다.', () => {
    const { result } = renderHook(() => useForm(values));

    // values check
    expect(result.current[0].values.name).toBe('');
    expect(result.current[0].values.value).toBe('');

    // isValid check
    expect(result.current[1]).toBe(false);

    // isSubmit check
    expect(result.current[2]).toBe(false);
  })

  test('onChange 함수가 정상적으로 작동한다.', () => {
    const { result } = renderHook(() => useForm(values));

    act(() => {
      result.current[3]({target: {
        name: 'name',
        value: 'new name'
      }} as React.ChangeEvent<HTMLInputElement>);
    })

    expect(result.current[0].values.name).toBe('new name');
  })

  test('onBlur 함수가 정상적으로 작동한다.', async () => {
    const { result } = renderHook(() => useForm({
      name: '',
      value: ''
    }, mockValidation, mockAsyncValidation));

    act(() => {
      result.current[4]({target: {
        name: 'name',
        value: '',
      }} as React.ChangeEvent<HTMLInputElement>);
    })

    // // expect(result.current[1]).toBe(false);
    expect(result.current[0].errors.name).toBe('error');

    // mock.onGet('http://localhost:8000/user/join/availability-nickname/test').reply(200, {
    //   isOk: false
    // });

    act(() => {
      result.current[4]({target: {
        name: 'name',
        value: 'test',
      }} as React.ChangeEvent<HTMLInputElement>);
  
    });

    await wait(() => {
      expect(result.current[0].errors.name).toBe('async error');
    })
  })
});
