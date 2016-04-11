/**
 * @file Style - IconPage
 * @author cxtom(cxtom2010@gmail.com)
 */

import ei from 'ei';

import asyncAction from '../common/middleware/asyncAction';
import logger from '../common/middleware/logger';

const IconPage = ei.Page.extend({

    middlewares: [asyncAction, logger],

    view: require('./IconView'),

    reducer: require('./reducer/icon'),

    getInitialState(request) {
        return {
            icons: require('./resource/icons')
        };
    }

});

export default IconPage;
