import { useState } from 'react';

export default function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  };

  return [value, onChange] as [string, typeof onChange];
}