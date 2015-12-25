define('ei/util/invariant', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    var invariant = function invariant(condition, format, a, b, c, d, e, f) {
        if (condition) {
            return;
        }
        if (!format) {
            throw new Error('' + 'Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        }
        var args = [
            a,
            b,
            c,
            d,
            e,
            f
        ];
        var argIndex = 0;
        var message = '' + 'Invariant Violation: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
        });
        throw new Error(message);
    };
    module.exports = invariant;
});