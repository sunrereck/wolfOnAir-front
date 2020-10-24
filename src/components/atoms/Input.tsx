import React, { memo } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputEl?: React.RefObject<HTMLInputElement>
}

function Input ({type, value, onChange, inputEl, ...props}: InputProps): React.ReactElement {
  return (
    <input 
      ref={inputEl}
      onChange={onChange}
      type={type}
      value={value}
      {...props}
    />
  );
}
export default memo(Input);
