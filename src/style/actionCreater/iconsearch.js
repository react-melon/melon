/**
 * @file IconPage - actionCreater - iconsearch
 * @author chenxiao07
 */

const icons = require('../resource/icons');

export const ICON_SEARCH = 'ICON_SEARCH';

export function search(query) {

    const ficons = icons.filter(function (name, index) {
        return name.indexOf(query) >= 0;
    });

    return {
        type: ICON_SEARCH,
        payload: {
            query,
            icons: ficons
        }
    };
}
