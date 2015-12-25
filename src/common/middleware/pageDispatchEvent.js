/**
 * @file common/middlewares/PageDispatchEvent
 * @author leon(ludafa@outlook.com)
 */


function pageDispatchEvent(page, state, action, next) {


    if (typeof action !== 'function') {
        let {event, type} = action;
        page.emit(event || type, action);
    }

    next(action);

}

module.exports = function (page) {
    return pageDispatchEvent.bind(null, page);
};
