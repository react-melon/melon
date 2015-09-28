define('melon/validator/ValidityState', [
    'require',
    'exports',
    'module',
    '../babelHelpers'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    function ValidityState(isValid, message) {
        this.isValid = isValid;
        this.message = message || '';
    }
    module.exports = ValidityState;
});