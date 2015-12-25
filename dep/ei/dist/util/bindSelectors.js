define('ei/util/bindSelectors', [
    'require',
    'exports',
    'module',
    './invariant'
], function (require, exports, module) {
    var invariant = require('./invariant');
    var toString = Object.prototype.toString;
    function bindSelectors(selectors) {
        return function (store, props) {
            invariant(store, 'need store');
            switch (toString.call(selectors).slice(8, -1).toLowerCase()) {
            case 'function':
                return selectors(store, props);
            case 'object':
                return Object.keys(selectors).reduce(function (result, name) {
                    var select = selectors[name];
                    if (typeof select === 'function') {
                        result[name] = select(store[name], props);
                    }
                    return result;
                }, {});
            case 'number':
            case 'string':
                return store[selectors];
            case 'boolean':
                return selectors ? store : {};
            default:
                return {};
            }
        };
    }
    module.exports = bindSelectors;
});