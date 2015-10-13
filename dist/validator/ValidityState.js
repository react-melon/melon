define('melon/validator/ValidityState', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    function ValidityState(isValid, message) {
        this.isValid = isValid;
        this.message = message || '';
    }
    module.exports = ValidityState;
});