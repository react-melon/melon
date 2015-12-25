/**
 * @file common/dao/auction
 * @author leon(ludafa@outlook.com)
 */

import ejson from '../ejson';
import toQueryString from '../util/toQueryString';

exports.list = (query) => {
    return ejson.get('/auction/list', {
        query
    });
};


exports.remove = (ids) => {
    return ejson
        .post('/auction/batchDelete', {
            body: toQueryString({
                auctionIds: ids.join(',')
            })
        });
};

exports.start = (ids) => {
    return ejson
        .post('/auction/batchStart', {
            body: toQueryString({
                auctionIds: ids.join(',')
            })
        });
};

exports.stop = (ids) => {
    return ejson
        .post('/auction/batchStop', {
            body: toQueryString({
                auctionIds: ids.join(',')
            })
        });
};

exports.updateBid = (auctionId, srcId, bid) => {

    return ejson
        .post('/auction/bid', {
            body: toQueryString({
                auctionId, srcId, bid
            })
        });

};

exports.changeMaterial = (auctionId, srcId, matId) => {
    return ejson
        .post('/auction/mat', {
            body: toQueryString({
                auctionId, srcId, matId
            })
        });
};
