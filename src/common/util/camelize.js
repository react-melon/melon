/**
 * @file 骆驼化
 * @author leon(ludafa@outlook.com)
 */

module.exports = function (source) {

    if (!source) {
        return '';
    }

    return source.replace(
        /-([a-z])/g,
        function (match, alpha) {
            return alpha.toUpperCase();
        }
    );

};
