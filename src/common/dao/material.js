/**
 * @file common/dao/resource 资源位数据相关的 api
 * @author leon<lupengyu@baidu.com>
 */

var ejson = require('../ejson');
var toQueryString = require('../util/toQueryString');

module.exports = {

    list(query) {
        return ejson
            .get('/mat/list', {
                query: query
            });
    },

    detail(matId) {
        return ejson.get('/mat/detail', {
            query: {
                matId
            }
        });
    },

    update(data) {
        return ejson.post('/mat/update', {
            body: toQueryString(data)
        });
    },

    remove(ids) {
        return ejson.post('/mat/batchDelete', {
            body: toQueryString({
                matIds: ids.join(',')
            })
        });
    },

    create(matInfo) {
        return ejson.post('/mat/add', {
            body: toQueryString(matInfo)
        });
    }

};

