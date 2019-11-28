import React from 'react';
import styled from 'styled-components';

import { ThemeProps } from '@/styles/theme';

function getColor(color: string = '', theme: ThemeProps) {
  if (color === 'primary') {
    return theme.primaryColor;
  }

  if (color === 'green') {
    return theme.greenColor;
  }

  if (color === 'orange') {
    return theme.orangeColor;
  }

  if (color === 'red') {
    return theme.redColor;
  }

  if (color === 'yellow') {
    return theme.yellowColor;
  }

  return theme.borderColor;
}

const Wrapper = styled.button<{ color: string; size: string; variant: string }>`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1.25rem;
  cursor: pointer;

  ${({size}) => size === 'small' && `
    font-size: 1rem;
    padding: 0.5rem;
  `}

  ${({size}) => size === 'large' && `
    font-size: 1.75rem;
    padding: 1rem 2rem;
  `}

  ${({ color, theme, variant }) =>
    variant === 'contained' &&
    `
      border: 0px;
      color: ${theme.whiteColor};
      outline: none;
      background-color ${getColor(color, theme)};
    `}

  ${({ color, theme, variant }) =>
    variant === 'outline' &&
    `
      background: none;
      border: 1px solid;
      border-color ${getColor(color, theme)};
      color ${getColor(color, theme)};
    `}
}
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
  <Wrapper
    {...others}
    color={color || 'primary'}
    disabled={disabled}
    size={size || 'medium'}
    type={type || 'button'}
    variant={variant || 'contained'}
  >
    {children}
  </Wrapper>
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
