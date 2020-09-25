import React, { memo } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputEl?: React.RefObject<HTMLInputElement>
}

const Input = ({type, value, onChange, inputEl, ...props}: InputProps):JSX.Element => (
  <input 
    ref={inputEl}
    onChange={onChange}
    type={type}
    value={value}
    {...props}
  />
);

Input.defaultProps = {
  onChange: () => {},
  type: 'text',
  value: ''
};

export default memo(Input);
