/**
 * @file index
 * @author leon<ludafa@outlook.com>
 */

/* eslint-disable fecs-min-vars-per-destructure, fecs-no-require */
/* eslint-disable no-inner-declarations */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AppContainer} from 'react-hot-loader';

const container = document.getElementById('app');

function render(App) {
    window.fuck = 1;
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        container
    );
    window.fuck = 2;
}

render(App);

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./App', () => render(App));
}
