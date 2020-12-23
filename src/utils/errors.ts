import { AxiosError } from 'axios';

// eslint-disable-next-line
export function getErrorMessage(error: AxiosError | null): string {
    if (!error) {
        return '';
    }

    if (!error.response || !error.response.data.message) {
        return '알수없는 오류가 발생하였습니다';
    }

    return error.response.data.message;
}