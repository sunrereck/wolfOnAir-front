import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { containedButtonColors, outlinedButtonColors } from '@/styles/buttonColors';

type ButtonColosTypes = 'primary' | 'secondary' | 'none';
type ButtonVariantTypes = 'contained' | 'outlined';

interface ButtonStylesProps {
  height?: string;
  width?: string;
  color: ButtonColosTypes;
  variant: ButtonVariantTypes;
}

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  height?: string;
  width?: string;
  to?: string;
  color?: ButtonColosTypes;
  variant?: ButtonVariantTypes;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  height?: string;
  width?: string;
  color?: ButtonColosTypes;
  variant?: ButtonVariantTypes;
}

type Props = AnchorProps & ButtonProps;

function Button({
  color = 'none',
  height,
  href,
  type,
  to,
  variant = 'contained',
  width,
  ...others
}: Props): React.ReactElement {
  if (to) {
    return (
      <StyledLink
        color={color}
        height={height}
        to={to}
        width={width}
        variant={variant}
        {...others} />
    );
  }

  if (href) {
    return (
      <StyledAnchor
        color={color}
        height={height}
        href={href}
        width={width}
        variant={variant}
        {...others} />
    );
  }

  return (
    <StyledButton
      type={type}
      color={color}
      height={height}
      width={width}
      variant={variant}
      {...others} />
  );
};

const styles = css<ButtonStylesProps>`
  display: inline-flex;
  border: 1px solid;
  border-radius: 2px;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  outline: none;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.2;
  }

  background-color: ${({
    color,
    theme,
    variant
  }) => {
    if (variant === 'contained') {
      return containedButtonColors[color].background || theme.color.white;
    }

    if (variant === 'outlined') {
      return outlinedButtonColors[color].background || theme.color.white;
    }

    return theme.color.white
  }};

  border-color: ${({
    color,
    theme,
    variant
  }) => {
    if (variant === 'contained') {
      return containedButtonColors[color].border || theme.color.white;
    }

    if (variant === 'outlined') {
      return outlinedButtonColors[color].border || theme.color.white;
    }

    return theme.color.white;
  }};

  color: ${({
    color,
    theme,
    variant
  }) => {
    if (variant === 'contained') {
      return containedButtonColors[color].color || theme.color.basic900;
    }

    if (variant === 'outlined') {
      return outlinedButtonColors[color].color || theme.color.basic900;
    }

    return theme.color.basic900;
  }};

  ${({ height }) => height && css`height: ${height};`}
  ${({ width }) => width && css`width: ${width};`}
`;

const StyledAnchor = styled.a<ButtonStylesProps>`
  ${styles}
`;

const StyledButton = styled.button<ButtonStylesProps>`
  ${styles}
`;

const StyledLink = styled(Link)<ButtonStylesProps>`
  ${styles}
`;

export default Button;
