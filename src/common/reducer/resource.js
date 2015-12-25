/**
 * @file common/reducer/resource
 * @author leon(ludafa@outlook.com)
 */

import composeReducer from '../util/composeReducer';

import {RESOURCE_INFO, RESOURCE_LIST, RESOURCE_SELECTED} from '../action/resource';
import {CHANNEL_LIST} from '../action/channel';

export default composeReducer({

    // 这货是个异类啊。。。
    INIT: function (state, payload, action) {
        return {
            tradeList: payload.tradeList
        };
    },

    [`${CHANNEL_LIST}_SUCCEED`]: function (state, payload, action) {

        let {tradeId, channelList} = payload;

        return {
            ...state,
            tradeId,
            channelList,
            channelId: '',
            srcId: '',
            srcList: null
        };

    },

    [`${RESOURCE_LIST}_SUCCEED`]: function (state, payload, action) {

        var {channelId, srcList} = payload;

        return {
            ...state,
            srcId: '',
            channelId,
            srcList
        };

    },

    [`${RESOURCE_INFO}_SUCCEED`]: function (state, payload, action) {

        var {srcId} = payload;

        return {
            ...state,
            srcId
        };

    },

    [RESOURCE_SELECTED]: function (state, payload) {
        return {
            ...state,
            srcId: payload
        };
    }

});
