import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import button from '@/styles/button';

interface ButtonProps extends React.AllHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  color?: 'primary';
  to?: string;
  variant?: 'contained' | 'outlined';
}

function Button ({
  color = 'primary',
  href,
  to,
  variant = 'contained',
  ...others
}: ButtonProps): React.ReactElement {
  if (to) {
    return (
      <StyledLink color={color} to={to} variant={variant} {...others as Link} />
    ) 
  }

  if (href) {
    return (
      <StyledAnchor 
        color={color} 
        href={href} 
        variant={variant} 
        {...others as React.AnchorHTMLAttributes<HTMLAnchorElement>} />
    ) 
  }

  return (
    <StyledButton 
      color={color} 
      variant={variant} 
      {...others as React.ButtonHTMLAttributes<HTMLButtonElement>} />
  )
}

const styles = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledAnchor = styled.a<{ color: string; variant: 'contained' | 'outlined'; }>`
  ${button}
  ${styles}
`;

const StyledButton = styled.button<{ color: string; variant: 'contained' | 'outlined'; }>`
  ${button}
  ${styles}
`;

const StyledLink = styled(Link)<{ color: string; variant: 'contained' | 'outlined'; }>`
  ${button}
  ${styles}
`;

export default Button;
