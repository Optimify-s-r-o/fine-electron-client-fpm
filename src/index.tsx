import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {darkTheme, lightTheme} from "./constants/theme";
import {ThemeProvider} from "styled-components";
import './translations/i18n';

ReactDOM.render(
    <BrowserRouter>
        <ThemeProvider theme={true ?  lightTheme : darkTheme}>
        <App/>
        </ThemeProvider>
    </BrowserRouter>
, document.getElementById('root'));

