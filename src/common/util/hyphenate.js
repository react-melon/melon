/**
 * @file 把一个XxxXxx格式的字符串转化成xxx-xxx的格式
 * @author leon(ludafa@outlook.com)
 */

module.exports = function (source) {
    return source
        .replace(/[A-Z]/g, ($0) => {
            return `-${$0}`;
        })
        .slice(1)
        .toLowerCase();
};
