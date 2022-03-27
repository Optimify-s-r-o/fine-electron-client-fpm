import './index.css';
import './translations/i18n';

import { AuthProvider } from 'modules/Auth/context/AuthProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './App';
import { darkTheme, lightTheme } from './constants/theme';

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={true ? lightTheme : darkTheme}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
    </BrowserRouter>
    , document.getElementById( 'root' ) );

