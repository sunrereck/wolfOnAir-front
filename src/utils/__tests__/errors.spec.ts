import { AxiosError } from 'axios';
import { getErrorMessage } from '../errors';

test('getErrorMessage', () => {
    expect(getErrorMessage(null)).toEqual('');
    expect(getErrorMessage({}as AxiosError)).toEqual('알수없는 오류가 발생하였습니다');
    expect(getErrorMessage({
        response: {
            data: {}
        }
    }as AxiosError)).toEqual('알수없는 오류가 발생하였습니다');
    expect(getErrorMessage({
        response: {
            data: {
                message: '테스트 에러'
            }
        }
    }as AxiosError)).toEqual('테스트 에러');
})