export interface ThemeProps {
  // 색상
  whiteColor: string;
  blackColor: string;
  redColor: string;
  orangeColor: string;
  yellowColor: string;
  greenColor: string;
  blueColor: string;
  grayColor: string;
  blackgreyColor: string;

  borderColor: string;
  primaryColor: string;
  textColor: string;

  // 레이아웃
  headerHeight: string;
  footerHeight: string;

  // media query
  xSmall: string;
  small: string;
  medium: string;
  large: string;
  xLarge: string;
}

const theme: ThemeProps = {
  // 색상
  whiteColor: '#FFFFFF',
  blackColor: '#1E1D29',
  redColor: '#dc3545',
  orangeColor: '#f68b1f',
  yellowColor: '#ffdd45',
  greenColor: '#64bb46',
  blueColor: '#3399ff',
  grayColor: '#979797',
  blackgreyColor: '#c3c2cc',

  borderColor: '#d1d2d3',
  primaryColor: '#c3c2cc',
  textColor: '#1E1D29',

  // 레이아웃
  headerHeight: '50px',
  footerHeight: '50px',

  // 미디어쿼리
  xSmall:'320px',
  small:'375px',
  medium: '768px',
  large: '992px',
  xLarge: '1200px'
};

export default theme;
