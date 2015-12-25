/**
 * @file common/dao/authority
 * @author leon(ludafa@outlook.com)
 */

let ejson = require('../ejson');

exports.list = () => {
    return ejson.get('/authority/list');
};
