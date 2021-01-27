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

  borderColor: string;
  primaryColor: string;
  textColor: string;
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
  grayColor: '#72707f',

  borderColor: '#dcdbe4',
  primaryColor: '#c3c2cc',
  textColor: '#1E1D29',
};

export default theme;
