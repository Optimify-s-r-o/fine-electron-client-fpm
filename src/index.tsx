import './index.css';
import './translations/i18n';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';
import { darkTheme, lightTheme } from './constants/theme';

ReactDOM.render(
  <HashRouter>
    <ThemeProvider theme={true ? lightTheme : darkTheme}>
      <App />
    </ThemeProvider>
  </HashRouter>,
  document.getElementById('root')
);
