import { act, renderHook } from '@testing-library/react-hooks';

import useAlert from '../useAlert';

describe('useAlert', () => {
    test('state 값들이 정상적으로 initialize 된다.', () => {
        const { result } = renderHook(() => useAlert());
        const [isShown, alertMessage] = result.current;
    
        expect(isShown).toEqual(false);
        expect(alertMessage).toEqual('');

        const { result: result2 } = renderHook(() => useAlert({
            isShown: true,
            alertMessage: 'test'
        }));
        const [isShown2, alertMessage2] = result2.current;
    
        expect(isShown2).toEqual(true);
        expect(alertMessage2).toEqual('test');
    });

    test('isShown 세팅을 할 수 있다.', () => {
        const { result } = renderHook(() => useAlert());
        const [isShown,, onToggle] = result.current;
    
        expect(isShown).toEqual(false);

        act(() => {
            onToggle();
        })

        const [isShown2] = result.current;
   
        expect(isShown2).toEqual(true);
    });

    test('alertMessage 세팅을 할 수 있다.', () => {
        const { result } = renderHook(() => useAlert());
        const [, alerttMessage,, onSetAlertMessage] = result.current;
    
        expect(alerttMessage).toEqual('');

        act(() => {
            onSetAlertMessage('test!!!!');
        })

        const [, alerttMessage2] = result.current;
   
        expect(alerttMessage2).toEqual('test!!!!');
    });
});
