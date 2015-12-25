/**
 * @file common/util/fetch
 * @author leon(ludafa@outlook.com)
 */

import {addQuery} from 'numen/util';

let interceptors = {
    request: [],
    response: []
};

function request(url, options) {

    let config = interceptors
        .request
        .reduce((config, interceptor) => {
            return interceptor(config);
        },
        {
            url,
            ...options,

            // 这个是必须的，表示在同域下发送 cookie
            // 默认值是 omit，不发送任何 cookie
            credentials: 'same-origin'
        }
    );

    let {query, ...rest} = config;

    url = addQuery(config.url, query);

    return fetch(url, rest)
        .then((response) => {

            if (response.ok) {
                return response.json();
            }

            // @TODO 搞一个 FetchError 来搞这个吧
            throw new Error('hehe');

        })
        .then((response) => {

            return interceptors
                .response
                .reduce(
                    (response, interceptor) => {
                        return interceptor(response);
                    },
                    response
                );

        })
        .catch((error) => {

            if (error) {
                console.error(error.statusInfo || error.stack || 'unknown error');
            }

            throw error;

        });
}

export function addInterceptor(type, interceptor) {
    interceptors[type].push(interceptor);
}

export function removeInterceptor(type, interceptor) {
    interceptors[type] = interceptors[type]
        .filter((current) => {
            return current !== interceptor;
        });
}

export function get(url, options = {}) {

    return request(
        url,
        {
            ...options,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest',
                ...(options.headers || {})
            }
        }
    );

}

function normalizeHeaders(headers) {

    if (!headers) {
        return {};
    }

    return Object
        .keys(headers)
        .reduce((result, name) => {
            result[name.toLowerCase()] = headers[name];
            return result;
        }, {});
}

export function post(url, options = {}) {

    let {body, headers} = options;

    headers = {
        // 补充默认值
        'accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest',
        ...normalizeHeaders(headers)
    };

    // 由于 formdata 在处理 multipart/form-data 类型请求时，不能正确处理指定的 boundary
    // 因此，在这里把 content-type 给干掉，浏览器会 infer 出这个请求中是啥类型的。
    if (body instanceof FormData && headers['content-type'].indexOf('multipart') === 0) {
        delete headers['content-type'];
    }

    return request(
        url,
        {
            ...options,
            headers,
            method: 'POST'
        }
    );

}

// exports.jsonp = function () {
//     TODO
// }

export default {
    get,
    post,
    addInterceptor,
    removeInterceptor
};
