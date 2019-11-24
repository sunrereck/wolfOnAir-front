import React from 'react';

const Input = ({type, value, onChange, ...props}: React.InputHTMLAttributes<HTMLInputElement>):JSX.Element => (
  <input 
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

export default Input;
