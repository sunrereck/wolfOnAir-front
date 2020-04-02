import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import saga from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit'

import { ThemeProvider } from 'styled-components';

import theme from '@/styles/theme';

import rootReducer from '@/modules';

import GlobalStyles from '@/styles/GlobalStyles';

import App from './App';
import * as serviceWorker from './serviceWorker';



// const store = configureStore({
//   reducer: rootReducer,
//   middleware: [saga]
// });

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
