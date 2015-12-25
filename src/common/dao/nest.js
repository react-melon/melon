/**
 * @file common/dao/resource
 * @author leon<lupengyu@baidu.com>
 */

var ejson = require('../ejson');

export default {

    tradeList() {
        return ejson.get('/nest/tradeList');
    },

    channelList(nestId) {
        return ejson
            .get('/nest/channelList', {
                query: {
                    nestId
                }
            });
    },

    srcList(nestId) {
        return ejson
            .get('/nest/srcList', {
                query: {
                    nestId
                }
            });
    },

    srcInfo(srcId) {

        return ejson.get('/nest/srcInfo', {
            query: {
                srcId
            }
        });

    },

    srcDateRange(id) {
        return ejson.get('/unit/dateRange', {
            query: {
                srcIds: id
            }
        }).then(({list}) => {
            return list[0];
        });
    }

};
