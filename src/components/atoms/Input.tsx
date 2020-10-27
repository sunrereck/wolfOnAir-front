import React, { memo } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputEl?: React.RefObject<HTMLInputElement>
}

function Input ({inputEl, ...props}: InputProps): React.ReactElement {
  return (
    <input 
      ref={inputEl}
      {...props}
    />
  );
}
export default memo(Input);
