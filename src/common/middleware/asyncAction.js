/**
 * @file common/middlewares/asyncAction
 * @author leon<lupengyu@baidu.com>
 */

function asyncActionMiddleware(state, action, next) {

    var {type, payload} = action;

    // 只处理 payload 是 Promise 的情况~
    if (!payload || typeof payload.then !== 'function') {
        next(action);
        return;
    }

    var events = action.events || {};

    // 把一个 payload 是 promise 的 Aciton，转化为多个 action
    next({
        type: type + '_START',
        event: events.start || type + '_START'
    });

    payload.then(function (data) {

        next({
            type: type + '_SUCCEED',
            payload: data,
            event: events.succeed || type + '_SUCCEED'
        });

    }, function (error) {

        next({
            type: type + '_FAILED',
            payload: error,
            error: true,
            event: events.failed || type + '_FAILED'
        });

    });

}

module.exports = function (page) {
    return asyncActionMiddleware;
};

