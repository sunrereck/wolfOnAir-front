import { css } from 'styled-components';

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

const button = css<{ color: string; size: string; variant: string }>`
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

export default button;
