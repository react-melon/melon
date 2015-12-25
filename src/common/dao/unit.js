/**
 * @file common/dao/unit
 * @author leon(ludafa@outlook.com)
 */

import ejson from '../ejson';
import toQueryString from '../util/toQueryString';

export default {

    list(query) {
        return ejson
            .get('/unit/list', {
                query: query
            });
    },

    create(unit) {
        return ejson
            .post('/unit/add', {
                body: toQueryString(unit)
            });
    },

    update(unit) {
        return ejson
            .post('/unit/update', {
                body: toQueryString(unit)
            });
    },

    remove(ids) {
        return ejson
            .post('/unit/batchDelete', {
                body: toQueryString({
                    unitIds: ids.join(',')
                })
            });
    },

    start(ids) {
        return ejson
            .post('/unit/batchStart', {
                body: toQueryString({
                    unitIds: ids.join(',')
                })
            });
    },

    stop(ids) {
        return ejson
            .post('/unit/batchStop', {
                body: toQueryString({
                    unitIds: ids.join(',')
                })
            });
    },

    rename(unitId, unitName, srcId) {
        return ejson
            .post('/unit/rename', {
                body: toQueryString({
                    unitId,
                    srcId,
                    unitName
                })
            });
    },

    bid(unitId, srcId, bid) {
        return ejson
            .post('/unit/bid', {
                body: toQueryString({
                    unitId,
                    srcId,
                    bid
                })
            });
    },

    changeMaterial(unitId, srcId, matId) {
        return ejson
            .post('/unit/mat', {
                body: toQueryString({
                    unitId, srcId, matId
                })
            });
    }

};
