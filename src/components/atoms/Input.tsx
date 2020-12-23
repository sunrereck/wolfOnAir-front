import React, { memo } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputEl?: React.RefObject<HTMLInputElement>;
}

function Input ({inputEl, value, ...props}: InputProps): React.ReactElement {
  return (
    <input 
      ref={inputEl}
      value={value || ''}
      {...props}
    />
  );
}
export default memo(Input);
