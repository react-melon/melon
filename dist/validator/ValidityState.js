define('melon/validator/ValidityState', [
    'exports',
    '../babelHelpers'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
    function ValidityState(isValid, message) {
        this.isValid = isValid;
        this.message = message || '';
    }
    module.exports = ValidityState;
});