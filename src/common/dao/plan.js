/**
 * @file common/dao/plan
 * @author leon(ludafa@outlook.com)
 */

import ejson from '../ejson';
import toQueryString from '../util/toQueryString';

export default {

    list(query) {
        return ejson
            .get('/plan/list', {
                query: query
            });
    },

    create(plan) {
        return ejson
            .post('/plan/add', {
                body: toQueryString(plan)
            });
    },

    update(plan) {
        return ejson
            .post('/plan/update', {
                body: toQueryString(plan)
            });
    },

    remove(ids) {
        return ejson
            .post('/plan/batchDelete', {
                body: toQueryString({
                    planIds: ids.join(',')
                })
            });
    },

    start(ids) {
        return ejson
            .post('/plan/batchStart', {
                body: toQueryString({
                    planIds: ids.join(',')
                })
            });
    },

    stop(ids) {
        return ejson
            .post('/plan/batchStop', {
                body: toQueryString({
                    planIds: ids.join(',')
                })
            });
    }


};
