/**
 * @file Home - HomePage
 * @author leon(ludafa@outlook.com)
 */

import ei from 'ei';

const HomePage = ei.Page.extend({

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
