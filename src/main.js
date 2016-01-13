/**
 * @file main
 * @author leon<lupengyu@baidu.com>
 */

import ei from 'ei';

import React from 'react';
import ReactDOM from 'react-dom';

import locator from './locator';
import routes from './routes';

import createAppComponent from 'ei/util/createAppComponent';
import Page from 'ei/component/Page';
import Nav from './common/component/Nav';

import ES6Promise from 'es6-promise';

const AppComponent = createAppComponent(ei.App);

function init() {

    ES6Promise.polyfill();

    let main = document.getElementById('main');

    locator
        .on((location) => {

            ReactDOM.render(
                <AppComponent routes={routes}>
                    <div className="ui-app">
                        <Nav location={location} />
                        <Page
                            request={location}
                            renderErrorMessage={error => {

                                const {status, statusInfo} = error;
                                return (
                                    <div className={'ui-page-error-message'}>
                                        <h3>{status}</h3>
                                        <p>{statusInfo}</p>
                                    </div>
                                );

                            }}
                            renderLoadingMessage={() =>
                                <div className="ui-loading">
                                    <h1>Your page is loading.</h1>
                                    <div className="ball ball-anim"></div>
                                </div>
                            } />
                    </div>
                </AppComponent>,
                main
            );

        })
        .start();


}

export default {
    init: init
};
