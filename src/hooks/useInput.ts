import { useCallback, useState } from 'react';

export default function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }, []);

  const onReset = useCallback(() => {
    setValue('');
  }, []);

  return [value, onChange, onReset] as [string, typeof onChange, typeof onReset];
}