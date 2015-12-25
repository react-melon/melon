define('numen/Location', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    './action',
    './util'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    Object.defineProperty(exports, '__esModule', { value: true });
    var action = require('./action');
    var TRAVEL = action.TRAVEL;
    var util = require('./util');
    var parseQueryString = util.parseQueryString;
    var normalize = util.normalize;
    var Location = function () {
        function Location(href) {
            var action = arguments.length <= 1 || arguments[1] === undefined ? TRAVEL : arguments[1];
            var id = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
            var title = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];
            babelHelpers.classCallCheck(this, Location);
            href = normalize(href);
            this.href = href;
            this.title = title;
            this.action = action;
            this.id = id;
            href = this.href = (href.indexOf('/') === 0 ? '' : '/') + href;
            var hashIndex = href.indexOf('#');
            if (hashIndex !== -1) {
                this.hash = href.slice(hashIndex);
                href = href.slice(0, hashIndex);
            } else {
                this.hash = '';
            }
            var searchIndex = href.indexOf('?');
            if (searchIndex !== -1) {
                var search = this.search = href.slice(searchIndex);
                var querystring = this.querystring = search.slice(1);
                this.query = querystring ? parseQueryString(querystring) : {};
                href = href.slice(0, searchIndex);
            } else {
                this.search = '';
            }
            this.pathname = href;
        }
        babelHelpers.createClass(Location, [
            {
                key: 'toString',
                value: function toString() {
                    return '' + (this.pathname || '') + (this.search || '');
                }
            },
            {
                key: 'equalTo',
                value: function equalTo(anotherLocation) {
                    var pathname = this.pathname;
                    var search = this.search;
                    if (this === anotherLocation) {
                        return true;
                    }
                    return pathname === anotherLocation.pathname && search === anotherLocation.search;
                }
            }
        ]);
        return Location;
    }();
    exports['default'] = Location;
    module.exports = exports['default'];
});