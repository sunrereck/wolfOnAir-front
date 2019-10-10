import * as styledComponents from 'styled-components';

import theme, { ThemeProps } from './theme';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  ThemeProps
>;

export { css, createGlobalStyle, keyframes, ThemeProvider, theme };
export default styled;