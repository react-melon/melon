/**
 * @file Home - HomePage
 * @author leon(ludafa@outlook.com)
 */

import ei from 'ei';

import pageDispatchEvent from '../common/middleware/pageDispatchEvent';
import asyncAction from '../common/middleware/asyncAction';
import logger from '../common/middleware/logger';

const HomePage = ei.Page.extend({

    middlewares: [asyncAction, pageDispatchEvent, logger],

    view: require('./HomeView'),

    reducer: {},

    getInitialState(request) {

        return {};
    }

});

module.exports = HomePage;
