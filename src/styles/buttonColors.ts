import theme from './theme';

interface IButtonColor {
  [color: string]: {
    background: string;
    border: string;
    color: string;
  }
}

export const containedButtonColors: IButtonColor = {
  primary: {
    background: theme.primaryColor,
    border: theme.primaryColor,
    color: theme.whiteColor
  },
  none: {
    background: theme.whiteColor,
    border: theme.whiteColor,
    color: theme.blackColor
  }
};

export const outlinedButtonColors: IButtonColor = {
  primary: {
    background: theme.whiteColor,
    border: theme.primaryColor,
    color: theme.primaryColor
  },
  none: {
    background: theme.whiteColor,
    border: theme.whiteColor,
    color: theme.blackColor
  }
};
