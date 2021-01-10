import { useState } from 'react';

interface AlertType {
    alertMessage?: string;
    isShown?: boolean;
}

function useAlert(initialValue?: AlertType): [
    boolean,
    string,
    () => void,
    (message: string) => void
] {
    const [alertMessage, setAlertMessage] = useState(initialValue?.alertMessage || '');
    const [isShown, setIsShown] = useState(initialValue?.isShown || false);

    const onToggle = () => {
        setIsShown(prevState => !prevState);
    }

    const onSetAlertMessage = (message: string) => {
        setAlertMessage(message);
    }

    return [
        isShown,
        alertMessage,
        onToggle,
        onSetAlertMessage
    ];
};

export default useAlert;