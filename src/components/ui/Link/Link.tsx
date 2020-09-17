import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

import button from '@/styles/button';

const StyledLink = styled(RouterLink)<{color: string; size: 'small' | 'medium' | 'large';} | any >`
  ${button}
`;

interface LinkButtonProps extends LinkProps {
  children: React.ReactNode;
  color?: 'primary';
  search?: string
  variant?: 'contained' | 'outlined';
}

const LinkButton = ({
  children, 
  color, 
  to,
  variant,
  ...others
}: LinkButtonProps): JSX.Element => {
  return (
    <StyledLink
      color={color || 'primary'}
      variant={variant || 'contained'}
      to={to}
      {...others}
    >
      {children}
    </StyledLink>
  );
}

export default LinkButton;
