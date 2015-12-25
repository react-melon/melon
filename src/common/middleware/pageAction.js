/**
 * @file common/middleware/pageAction
 * @author leon(ludafa@outlook.com)
 */

function pageAction(page, state, action, next) {

    let {type} = action;

    if (typeof action !== 'function' && action.type.indexOf('@') === 0) {

        let method = page[type.slice(1)];

        if (!method) {
            throw new Error('啊，view发来的快递page没有方式收啊。。。');
        }

        method.call(page, action.payload, state);

        return;
    }

    next(action);

}

module.exports = function (page) {
    return pageAction.bind(null, page);
};
