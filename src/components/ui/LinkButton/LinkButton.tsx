import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

import button from '@/styles/button';

const StyledLink = styled(Link)<{color: string; size: 'small' | 'medium' | 'large';} | any >`
  ${button}
`;

interface LinkButtonProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  search?: string
  size?: 'small' | 'medium' | 'large';
}

const LinkButton = ({
  className,
  children, 
  color, 
  size, 
  to
}: LinkButtonProps): JSX.Element => {
  return (
    <StyledLink
      className={className}
      color={color || 'primary'}
      size={size || 'medium'}
      to={to}
    >
      {children}
    </StyledLink>
  );
}

LinkButton.defaultProps = {
  children: null,
  className: '',
  color: 'primary',
  size: 'medium',
  to: ''
};

export default LinkButton;
