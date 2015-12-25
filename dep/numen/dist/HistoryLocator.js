define('numen/HistoryLocator', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    './Locator',
    './Location',
    './util',
    './action'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var Locator = require('./Locator');
    var Location = require('./Location');
    var util = require('./util');
    var addEventListener = util.addEventListener;
    var removeEventListener = util.removeEventListener;
    var guid = util.guid;
    var action = require('./action');
    var PUSH = action.PUSH;
    var REPLACE = action.REPLACE;
    var TRAVEL = action.TRAVEL;
    var HISTORY_LOCATOR_STATE_ID_KEY = '__hlik__';
    var HistoryLocator = function (_Locator) {
        babelHelpers.inherits(HistoryLocator, _Locator);
        function HistoryLocator() {
            babelHelpers.classCallCheck(this, HistoryLocator);
            babelHelpers.get(Object.getPrototypeOf(HistoryLocator.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(HistoryLocator, [
            {
                key: 'start',
                value: function start() {
                    babelHelpers.get(Object.getPrototypeOf(HistoryLocator.prototype), 'start', this).call(this);
                    addEventListener(window, 'popstate', this.onLocationChange);
                    return this;
                }
            },
            {
                key: 'stop',
                value: function stop() {
                    removeEventListener(window, 'popstate', this.onLocationChange);
                    return this;
                }
            },
            {
                key: 'getLocation',
                value: function getLocation(e) {
                    var state = e && e.state || window.history.state || {};
                    var id = state[HISTORY_LOCATOR_STATE_ID_KEY];
                    var loc = window.location;
                    var pathname = loc.pathname;
                    var search = loc.search;
                    var hash = loc.hash;
                    var path = pathname + search + hash;
                    if (!id) {
                        id = guid();
                        window.history.replaceState(babelHelpers._extends({}, state, babelHelpers.defineProperty({}, HISTORY_LOCATOR_STATE_ID_KEY, id)), null, path);
                    }
                    return new Location(path, TRAVEL, id, '');
                }
            },
            {
                key: 'finishTransit',
                value: function finishTransit(nextLocation) {
                    var action = nextLocation.action;
                    var title = nextLocation.title;
                    var state = babelHelpers.defineProperty({}, HISTORY_LOCATOR_STATE_ID_KEY, nextLocation.id);
                    switch (action) {
                    case PUSH:
                        window.history.pushState(state, title, nextLocation.toString());
                        break;
                    case REPLACE:
                        window.history.replaceState(state, title, nextLocation.toString());
                        break;
                    }
                    babelHelpers.get(Object.getPrototypeOf(HistoryLocator.prototype), 'finishTransit', this).call(this, nextLocation);
                }
            },
            {
                key: 'createHref',
                value: function createHref(nextLocation) {
                    return nextLocation ? nextLocation.toString() : 'javascript: void 0';
                }
            },
            {
                key: 'dispose',
                value: function dispose() {
                    this.stop();
                    this.listeners.length = 0;
                }
            }
        ]);
        return HistoryLocator;
    }(Locator);
    module.exports = HistoryLocator;
});