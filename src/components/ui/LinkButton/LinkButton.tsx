import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import button from '@/styles/button';

const StyledLink = styled(Link)<{ color: string; size: 'small' | 'medium' | 'large'; }>`
  ${button}
`;

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  color?: string;
  search?: string
  size?: 'small' | 'medium' | 'large';
  to: string | {
    pathname: string;
    search?: string;
    hash?: string;
    state?: object
  };
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
