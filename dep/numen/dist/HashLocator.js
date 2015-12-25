define('numen/HashLocator', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    './util',
    './Locator',
    './Location',
    './action'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var util = require('./util');
    var addEventListener = util.addEventListener;
    var removeEventListener = util.removeEventListener;
    var getHash = util.getHash;
    var addQuery = util.addQuery;
    var guid = util.guid;
    var Locator = require('./Locator');
    var Location = require('./Location');
    var action = require('./action');
    var PUSH = action.PUSH;
    var REPLACE = action.REPLACE;
    var TRAVEL = action.TRAVEL;
    var HashLocator = function (_Locator) {
        babelHelpers.inherits(HashLocator, _Locator);
        function HashLocator() {
            babelHelpers.classCallCheck(this, HashLocator);
            babelHelpers.get(Object.getPrototypeOf(HashLocator.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(HashLocator, [
            {
                key: 'getLocation',
                value: function getLocation(e) {
                    return new Location(getHash(window.location), TRAVEL, guid(), '');
                }
            },
            {
                key: 'finishTransit',
                value: function finishTransit(nextLocation) {
                    babelHelpers.get(Object.getPrototypeOf(HashLocator.prototype), 'finishTransit', this).call(this, nextLocation);
                    var action = nextLocation.action;
                    switch (action) {
                    case PUSH:
                    case REPLACE:
                        window.location.hash = nextLocation.toString();
                        return;
                    }
                }
            },
            {
                key: 'start',
                value: function start() {
                    babelHelpers.get(Object.getPrototypeOf(HashLocator.prototype), 'start', this).call(this);
                    addEventListener(window, 'hashchange', this.onLocationChange);
                    return this;
                }
            },
            {
                key: 'stop',
                value: function stop() {
                    removeEventListener(window, 'hashchange', this.onLocationChange);
                    return this;
                }
            },
            {
                key: 'createHref',
                value: function createHref(pathname, query) {
                    return '#' + addQuery(pathname, query);
                }
            }
        ]);
        return HashLocator;
    }(Locator);
    module.exports = HashLocator;
});