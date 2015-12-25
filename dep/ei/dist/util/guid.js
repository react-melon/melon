define('ei/util/guid', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    module.exports = function () {
        return Math.random().toString(36).substr(2, 12);
    };
});