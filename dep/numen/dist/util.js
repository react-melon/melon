define('numen/util', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    exports.addEventListener = function addEventListener(target, eventName, handler) {
        if (target.addEventListener) {
            target.addEventListener(eventName, handler);
            return;
        }
        target.attachEvent('on' + eventName, handler);
    };
    exports.removeEventListener = function removeEventListener(target, eventName, handler) {
        if (target.removeEventListener) {
            target.removeEventListener(eventName, handler);
            return;
        }
        target.detachEvent('on' + eventName, handler);
    };
    var toQueryString = exports.toQueryString = function toQueryString(query) {
        if (!query) {
            return '';
        }
        return Object.keys(query).map(function (name) {
            var value = query[name];
            name = encodeURIComponent(name);
            if (Array.isArray(value)) {
                return value.map(function (item) {
                    return name + '=' + encodeURIComponent(item);
                });
            }
            return name + '=' + encodeURIComponent(value);
        }).join('&');
    };
    exports.addQuery = function addQuery(path, query) {
        var querystring = toQueryString(query);
        return querystring ? path + (path.indexOf('?') === -1 ? '?' : '&') + querystring : path;
    };
    exports.guid = function guid() {
        var length = arguments.length <= 0 || arguments[0] === undefined ? 8 : arguments[0];
        return Math.random().toString(36).substr(2, length);
    };
    exports.parseQueryString = function parseQueryString(querystring) {
        return querystring.split('&').reduce(function (query, term) {
            term = term.split('=');
            var name = decodeURIComponent(term[0]);
            var value = decodeURIComponent(term[1]);
            if (!name) {
                return query;
            }
            var currentValue = query[name];
            if (Array.isArray(currentValue)) {
                currentValue.push(value);
            } else if (currentValue) {
                query[name] = [
                    currentValue,
                    value
                ];
            } else {
                query[name] = value;
            }
            return query;
        }, {});
    };
    exports.getHash = function getHash(target) {
        var href = target.href;
        var index = href.indexOf('#');
        return index === -1 ? '' : href.slice(index + 1);
    };
    var HTTP_PREFIX_REGEXP = /^https?:\/\/[^\/]*/;
    exports.normalize = function normalize(path) {
        var match = HTTP_PREFIX_REGEXP.exec(path);
        if (match) {
            path = path.slice(match[1].length);
        }
        if (path.charAt(0) !== '/') {
            path = '/' + path;
        }
        return path;
    };
});