/**
 * @file common/ejson
 * @author leon<lupengyu@baidu.com>
 */

import fetch from './util/fetch';

import ajax from './ejson/interceptor/ajax';
import data from './ejson/interceptor/data';
import sessionExpired from './ejson/interceptor/sessionExpired';
import fcAccountLocked from './ejson/interceptor/fcAccountLocked';
import bizError from './ejson/interceptor/bizError';

[
    ajax,
    bizError,
    sessionExpired,
    fcAccountLocked,
    data
].map((interceptor) => {
    fetch.addInterceptor(
        interceptor.type,
        interceptor.intercept
    );
});

export default fetch;
