import './index.css';
import './translations/i18n';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';
import { darkTheme, lightTheme } from './constants/theme';

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={true ? lightTheme : darkTheme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>
    , document.getElementById( 'root' ) );

