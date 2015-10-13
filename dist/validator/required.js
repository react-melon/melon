define('melon/validator/required', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = function (value) {
        return !!value;
    };
});