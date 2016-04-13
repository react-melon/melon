/**
 * @file 入口
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import * as config from 'config';


function dispatch() {

    const hash = window.location.hash;
    const name = hash ? hash.slice(2) : 'Button';

    window.require([name], function (Component) {
        ReactDOM.render(
            React.createElement(
                App,
                {
                    components: config.components,
                    name: name,
                    Component: Component.default
                }
            ),
            document.getElementById('app')
        );
    });

}

window.onhashchange = function () {
    dispatch();
};

dispatch();
