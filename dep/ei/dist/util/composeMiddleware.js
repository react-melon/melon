define('ei/util/composeMiddleware', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    function composeMiddleware(context) {
        var middlewares = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
        return middlewares.reverse().reduce(function (next, middleware, index) {
            return function (action) {
                return middleware(context.getState(), action, next);
            };
        }, context.dispatch.bind(context));
    }
    module.exports = composeMiddleware;
});