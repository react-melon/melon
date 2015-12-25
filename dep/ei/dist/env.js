define('ei/env', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    try {
        exports.isServer = 'object' === typeof process && Object.prototype.toString.call(process) === '[object process]';
    } catch (e) {
    }
    exports.isClient = !exports.isServer;
});