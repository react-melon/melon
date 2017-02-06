/**
 * @file Home - HomePage
 * @author leon(ludafa@outlook.com)
 */

import {Page} from 'ei';

const HomePage = Page.extend({

    middlewares: [
        require('../common/middleware/asyncAction'),
        require('../common/middleware/logger')
    ],

    view: require('./HomeView'),

    reducer: {},

    getInitialState(request) {
        return {};
    }

});

module.exports = HomePage;
