import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{ color: string; size: string; variant: string }>`
  
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  readOnly?: boolean;
  variant?: 'contained' | 'outline';
}

const Button= ({
  children,
  className,
  color,
  disabled,
  size,
  type,
  variant,
  ...others
}: ButtonProps): JSX.Element => (
  <StyledButton
    {...others}
    color={color || 'primary'}
    disabled={disabled}
    size={size || 'medium'}
    type={type || 'button'}
    variant={variant || 'contained'}
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
