import { act, renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import useRequest from '../useRequest';

function mockCallback(id: number) {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
}

describe('useAsync', () => {
  const mock = new MockAdapter(axios);

  mock.onGet('https://jsonplaceholder.typicode.com/users/1').reply(200, {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      geo: {
        lat: '-37.3159',
        lng: '81.1496'
      }
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets'
    }
  });

  mock.onGet('https://jsonplaceholder.typicode.com/users/2').reply(200, {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    address: {
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: {
        lat: '-43.9509',
        lng: '-34.4618'
      }
    },
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: {
      name: 'Deckow-Crist',
      catchPhrase: 'Proactive didactic contingency',
      bs: 'synergize scalable supply-chains'
    }
  });

  it('hook 선언 즉시 api 함수가 호출되어야 한다.', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRequest(mockCallback, 1, false));

    await waitForNextUpdate();

    const [updatedData, updatedError] = result.current;

    expect(updatedData.name).toBe('Leanne Graham');
    expect(updatedError).toBe(null);
  });

  test('hook 선언 즉시 api 호출이 되어서는 안된다.', async () => {
    const { waitForNextUpdate } = renderHook(() => useRequest(mockCallback, 1, true));

    try {
      await waitForNextUpdate({
        timeout: 5000
      });
    } catch (err) {
      expect(err.message).toBe('Timed out in waitForNextUpdate after 5000ms.');
    }
  }, 10000);

  test('param 값이 바뀌면 api가 재호출 된다.', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      ({ id }) => useRequest(mockCallback, id, false), {
        initialProps: { id: 1 }
      }
    );

    await waitForNextUpdate();

    const [updatedData] = result.current;

    expect(updatedData.name).toBe('Leanne Graham');

    rerender({ id: 2 });

    await waitForNextUpdate();

    const [reUpdatedData] = result.current;

    expect(reUpdatedData.name).toBe('Ervin Howell');
  });

  test('직접 fetch 함수를 호출하여 사용할 수 있다.', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRequest(
      mockCallback, 1 as number, false
    ));

    await waitForNextUpdate();

    const [data, , , onFetch] = result.current;

    expect(data.name).toBe('Leanne Graham');

    act(() => {
      onFetch(2);
    });

    await waitForNextUpdate();

    const [reUpdatedData] = result.current;

    expect(reUpdatedData.name).toBe('Ervin Howell');
  });

  test('api 호출 결과들을 reset 할 수 있다.', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useRequest(
      mockCallback, 1 as number, false
    ));

    await waitForNextUpdate();

    const [data, , , , onReset] = result.current;

    expect(data.name).toBe('Leanne Graham');

    act(() => {
      onReset();
    });

    const [updatedData, updateError, isLoading] = result.current;

    expect(updatedData).toBe(null);
    expect(updateError).toBe(null);
    expect(isLoading).toBe(false);
  });
});