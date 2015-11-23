/**
 * @file melon 将参数用`-`连接成字符串
 * @author leon(ludafa@outlook.com)
 */


/**
 * 将参数用`-`连接成字符串
 *
 * @param {...string} args 需要连接的串
 * @return {string}
 * @ignore
 */
function joinByStrike() {

    var result = [];

    for (var i = 0, len = arguments.length; i < len; ++i) {
        var arg = arguments[i];
        if (arg) {
            result.push(arg);
        }
    }

    return result.join('-');

}

module.exports = joinByStrike;
