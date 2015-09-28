define('melon/validator/required', [
    'require',
    'exports',
    'module',
    '../babelHelpers'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    module.exports = function (value) {
        return !!value;
    };
});