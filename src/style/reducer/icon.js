/**
 * @file IconPage - reducer
 * @author chxtom
 */

const ReducerBuilder = require('../../common/util/ReducerBuilder');
const {INIT} = require('ei/actionCreator/page');
const {ICON_SEARCH} = require('../actionCreater/iconsearch');

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
