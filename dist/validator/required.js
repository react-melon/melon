define('melon/validator/required', [
    'exports',
    '../babelHelpers'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
    module.exports = function (value) {
        return !!value;
    };
});