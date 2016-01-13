/**
 * @file common/middleware/logger
 * @author leon<lupengyu@baidu.com>
 */

/* eslint-disable no-console */

var pageUidIndex = 0;

function logger(pageId, state, action, next) {
    if (typeof action !== 'function') {
        console.log(pageId, action);
    }
    next(action);
}

module.exports = function (page) {
    return logger.bind(null, pageUidIndex++);
};
