/**
 * @file common/dao/account
 * @author leon(ludafa@outlook.com)
 */

let ejson = require('../ejson');
let {toQueryString} = require('numen/util');

exports.detail = function detail() {
    return ejson.get('/user/info');
};

exports.update = (userInfo) => {
    return ejson
        .post('/user/update', {
            body: toQueryString({
                ...userInfo,
                qualification: '呵呵哒'
            })
        });
};

