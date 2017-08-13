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
    ReactDOM.render(
        <AppContainer>
            <App />
        </AppContainer>,
        container
    );
}

render(App);

if (module.hot) {
    module.hot.accept('./App', () => render(App));
}
