import React from 'react';
import styled from 'styled-components';

import button from '@/styles/button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: string;
  variant?: 'contained' | 'outlined';
}

const Button= ({
  children,
  className,
  color,
  type,
  variant,
  ...others
}: ButtonProps): JSX.Element => (
  <Wrapper
    {...others}
    color={color || 'primary'}
    variant={variant || 'contained'}
  >
    {children}
  </Wrapper>
);

const Wrapper = styled.button<{ color: string; variant: 'contained' | 'outlined'; }>`
  ${button}
`;

export default Button;
