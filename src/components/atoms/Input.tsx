import React from 'react';

type InputPrpos = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputPrpos>((props, ref): React.ReactElement => (
  <input ref={ref} {...props} />
));

export default Input;
