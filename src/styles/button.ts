import { css } from 'styled-components';

import theme from './theme';

interface IButtonColor {
  [color: string]: {
    background: string;
    border: string;
    color: string;
  }
}

const containedColor: IButtonColor = {
  primary: {
    background: theme.primaryColor,
    border: theme.primaryColor,
    color: theme.whiteColor
  }
};

const outlinedColor: IButtonColor = {
  primary: {
    background: theme.whiteColor,
    border: theme.primaryColor,
    color: theme.primaryColor
  }
};

const button = css<{ color: string; variant: 'contained' | 'outlined' }>`
  height: 3rem;
  border: 1px solid;
  border-radius: 3px;
  font-size: 0.875rem;
  cursor: pointer;
  text-align: center;
  outline: none;

  &:disabled {
    opacity: 0.7;
  }

  ${({ color, variant }) => variant === 'contained' && `
    background-color: ${containedColor[color].background};
    border-color: ${containedColor[color].border};
    color: ${containedColor[color].color};    
  `}

  ${({ color, variant }) => variant === 'outlined' && `
    background-color: ${outlinedColor[color].background};
    border-color: ${outlinedColor[color].border};
    color: ${outlinedColor[color].color};    
  `}
`;

export default button;
