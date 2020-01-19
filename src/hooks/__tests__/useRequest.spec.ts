import { act, renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import useRequest from "../useRequest";

async function testCallback() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    return response.data;
  } catch (e) {
    return {
      error: "error!"
    };
  }
}

describe("useRequest", () => {
  test("state 값들이 정상적으로 initialize 된다.", () => {
    const { result } = renderHook(() => useRequest(testCallback, []));

    expect(result.current[0].data).toBe(null);
    expect(result.current[0].error).toBe(null);
    expect(result.current[0].isLoading).toBe(false);
  });

  test("callback 함수 호출이 정상적으로 된다.", () => {
    const mock = new MockAdapter(axios, { delayResponse: 200 }); // 200ms 가짜 딜레이 설정

    mock.onGet("https://jsonplaceholder.typicode.com/users").reply(200, {
      data: [
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
              lat: "-37.3159",
              lng: "81.1496"
            }
          }
        }
      ]
    });

    const { result } = renderHook(() => useRequest(testCallback, []));
    const { data } = result.current[0];
    let value = '';

    console.log(result.current[0]);

    // if (data) {
    //   value = data.name
    // }
    expect(value).toBe('Leanne Graham');
  });
});
