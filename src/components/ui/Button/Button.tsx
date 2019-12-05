import React from 'react';
import styled from 'styled-components';

import button from '@/styles/button';

const StyledButton = styled.button<{ color: string; size:  'small' | 'medium' | 'large'; }>`
  ${button}
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  readOnly?: boolean;
}

const Button= ({
  children,
  className,
  color,
  disabled,
  size,
  type,
  ...others
}: ButtonProps): JSX.Element => (
  <StyledButton
    {...others}
    color={color || 'primary'}
    disabled={disabled}
    size={size || 'medium'}
    type={type || 'button'}
  >
    {children}
  </StyledButton>
);

Button.defaultProps = {
  children: null,
  className: '',
  color: 'primary',
  disabled: false,
  type: 'button',
  size: 'medium',
  variant: 'contained'
};

export default Button;
