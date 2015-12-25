define('ei/resource', [
    'require',
    'exports',
    'module',
    './Container'
], function (require, exports, module) {
    var Container = require('./Container');
    var container = new Container();
    exports.register = function (type, resource) {
        container.register(type, resource);
        return this;
    };
    exports.get = function (type) {
        return container.make(type);
    };
});