define('ei/Emitter', [
    'require',
    'exports',
    'module',
    './util/assign'
], function (require, exports, module) {
    var EMITTER_LISTENER_POOL_ATTR = '__listeners__';
    var EMITTER_CURRENT_EVENT_ATTR = '__event__';
    var assign = require('./util/assign');
    function Emitter() {
    }
    var mixins = {
        on: function on(name, handler) {
            var pool = this[EMITTER_LISTENER_POOL_ATTR];
            if (!pool) {
                pool = this[EMITTER_LISTENER_POOL_ATTR] = {};
            }
            var listeners = pool[name];
            if (!listeners) {
                listeners = pool[name] = [];
            }
            listeners.push(handler);
            return this;
        },
        off: function off(name, handler) {
            var pool = this[EMITTER_LISTENER_POOL_ATTR];
            if (!pool) {
                return this;
            }
            if (!name) {
                return this.destroyEvents();
            }
            var listeners = pool[name];
            if (!listeners || !listeners.length) {
                return this;
            }
            if (!handler) {
                listeners.length = 0;
                pool[name] = [];
                return this;
            }
            for (var i = listeners.length - 1; i >= 0; --i) {
                if (listeners[i] === handler) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
            return this;
        },
        once: function once(name, handler) {
            var me = this;
            function onceHandler() {
                me.off(name, onceHandler);
                return handler.apply(me, arguments);
            }
            me.on(name, onceHandler);
            return this;
        },
        emit: function emit(name) {
            var pool = this[EMITTER_LISTENER_POOL_ATTR];
            if (!pool) {
                return this;
            }
            var listeners = [].concat(pool[name] || [], pool['*'] || []);
            if (!listeners.length) {
                return this;
            }
            this[EMITTER_CURRENT_EVENT_ATTR] = name;
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }
            for (var i = 0, len = listeners.length; i < len; ++i) {
                listeners[i].apply(this, args);
            }
            this[EMITTER_CURRENT_EVENT_ATTR] = null;
            return this;
        },
        getCurrentEvent: function getCurrentEvent() {
            return this[EMITTER_CURRENT_EVENT_ATTR];
        },
        destroyEvents: function destroyEvents() {
            var pool = this[EMITTER_LISTENER_POOL_ATTR];
            if (pool) {
                for (var type in pool) {
                    if (pool[type]) {
                        pool[type].length = 0;
                        pool[type] = null;
                    }
                }
                this[EMITTER_LISTENER_POOL_ATTR] = null;
            }
            return this;
        }
    };
    assign(Emitter.prototype, mixins);
    Emitter.enable = function (target) {
        if (typeof target === 'function') {
            target = target.prototype;
        }
        return assign(target, mixins);
    };
    module.exports = Emitter;
});