import { useState } from 'react';

export default function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onReset = () => {
    setValue('');
  };

  return [value, onChange, onReset] as [string, typeof onChange, typeof onReset];
}