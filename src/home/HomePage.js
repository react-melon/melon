/**
 * @file Home - HomePage
 * @author leon(ludafa@outlook.com)
 */

import ei from 'ei';

import pageDispatchEvent from '../common/middleware/pageDispatchEvent';
import asyncAction from '../common/middleware/asyncAction';
import logger from '../common/middleware/logger';

var HomePage = ei.Page.extend({

    middlewares: [asyncAction, pageDispatchEvent, logger],

    view: require('./HomeView'),

    reducer: {},

    getInitialState: function (request) {

        return {};
    }

});

export default HomePage;
