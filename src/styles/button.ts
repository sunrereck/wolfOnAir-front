import { css } from 'styled-components';

import theme from './theme';

const buttonColor: {
  [color: string]: {
    background: string;
    border: string;
    color: string;
  }
} = {
  primary: {
    background: theme.primaryColor,
    border: theme.primaryColor,
    color: theme.whiteColor
  },
  red: {
    background: theme.redColor,
    border: theme.redColor,
    color: theme.whiteColor
  },
  primaryOutline: {
    background: theme.whiteColor,
    border: theme.primaryColor,
    color: theme.primaryColor
  },
  redOutline: {
    background: theme.whiteColor,
    border: theme.redColor,
    color: theme.redColor
  }
}

const button = css<{ color: string; size: 'small' | 'medium' | 'large'; }>`
  display: flex;
  height: 3rem;
  border-radius: 2px;
  border: 1px solid;
  font-size: 1.25rem;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  outline: none;

  &:disabled {
    opacity: 0.5;
  }

  ${({color}) => `
    background-color: ${buttonColor[color].background};
    border-color: ${buttonColor[color].border};
    color: ${buttonColor[color].color};
  `}

  ${({size}) => size === 'small' && `
    font-size: 1rem;
    height: 2.5rem;
    padding: 0.5rem;
  `}

  ${({size}) => size === 'large' && `
    font-size: 1.75rem;
    height: 3.5rem;
    padding: 1rem 2rem;
  `}
}
`;

export default button;
