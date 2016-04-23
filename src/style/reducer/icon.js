/**
 * @file IconPage - reducer
 * @author chxtom
 */

import ReducerBuilder from '../../common/util/ReducerBuilder';
import {ICON_SEARCH} from '../actionCreater/iconsearch';

const {INIT} = require('ei/actionCreator/page');

const icon = new ReducerBuilder();

icon.add([INIT, ICON_SEARCH], (state, payload) => {
    return payload.icons;
});

const query = new ReducerBuilder();

query.add(INIT, (state, payload) => {
    return '';
});

query.add(ICON_SEARCH, (state, payload) => {
    return payload.query;
});


module.exports = {
    icons: icon.toReducer(),
    query: query.toReducer()
};
