define('ei/util/assign', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    module.exports = Object.assign || function (target) {
        if (target == null) {
            throw new Error('assign target cannot be null');
        }
        for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            sources[_key - 1] = arguments[_key];
        }
        for (var i = 0, len = sources.length; i < len; ++i) {
            var source = sources[i];
            if (typeof source !== 'object') {
                continue;
            }
            for (var key in source) {
                if (hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
});