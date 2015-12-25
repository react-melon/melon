/**
 * @file main
 * @author leon<lupengyu@baidu.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
// import {events} from 'ei';

import locator from './locator';
import routes from './routes';

import App from './common/component/App';
import Page from './common/component/Page';
import Nav from './common/component/Nav';

require('es6-promise').polyfill();

function init() {

    let main = document.getElementById('main');

    locator
        .on((location) => {

            ReactDOM.render(
                <App routes={routes}>
                    <Nav location={location} />
                    <Page request={location} main={true} />
                </App>,
                main
            );

        })
        .start();


}

export default {
    init: init
};
