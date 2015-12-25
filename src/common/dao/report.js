/**
 * @file common/dao/report
 * @author leon(ludafa@outlook.com)
 */

import ejson from '../ejson';

export default {

    plan(ids) {
        return ejson
            .get('/report/batchPlans', {
                query: {
                    planIds: ids.join(',')
                }
            });
    },

    unit(ids) {
        return ejson
            .get('/report/batchUnits', {
                query: {
                    unitIds: ids.join(',')
                }
            });
    },

    summary(start, end) {
        return ejson
            .get('/report/total', {
                query: {
                    startDate: start,
                    endDate: end
                }
            });
    },

    nest(nestGroupCode, startDate, endDate) {
        return ejson
            .get('/authority/report', {
                query: {
                    nestGroupCode, startDate, endDate
                }
            })
            .then((report) => {
                return {
                    nestGroupCode,
                    startDate,
                    endDate,
                    ...report
                };
            }, (error) => {
                throw {
                    nestGroupCode,
                    startDate,
                    endDate,
                    error
                };
            });

    }

};
