/**
 * @file 大骆驼化
 * @author leon(ludafa@outlook.com)
 */

const camelize = require('./camelize');

module.exports = function (source) {

    if (!source) {
        return '';
    }

    return `${source.charAt(0).toUpperCase()}${camelize(source.slice(1))}`;

};
