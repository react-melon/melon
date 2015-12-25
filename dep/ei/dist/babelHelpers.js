define('ei/babelHelpers', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    var babelHelpers = {};
    babelHelpers._extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    module.exports = babelHelpers;
});