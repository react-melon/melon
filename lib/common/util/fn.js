(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.fn = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    exports.__esModule = true;
    exports.throttle = throttle;
    /**
    * Copyright 2016 Baidu Inc. All rights reserved.
    *
    * @file function 相关的小工具
    * @author leon <ludafa@outlook.com>
    */

    /**
     * 限流
     *
     * @param  {Function} func       被限流的原函数
     * @param  {number}   wait       限流时间阀
     * @param  {Object}   options    选项
     * @return {Function}
     */
    function throttle(func, wait) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


        var timeout = void 0;
        var context = void 0;
        var args = void 0;
        var result = void 0;
        var previous = 0;

        var later = function later() {

            previous = options.leading === false ? 0 : new Date().getTime();
            timeout = null;
            result = func.apply(context, args);

            if (!timeout) {
                context = args = null;
            }
        };

        var throttled = function throttled() {

            var now = new Date();

            if (!previous && options.leading === false) {
                previous = now;
            }

            var remaining = wait - (now - previous);

            context = this;

            for (var _len = arguments.length, argus = Array(_len), _key = 0; _key < _len; _key++) {
                argus[_key] = arguments[_key];
            }

            args = argus;

            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) {
                    context = args = null;
                }
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }

            return result;
        };

        throttled.cancel = function () {
            clearTimeout(timeout);
            previous = 0;
            timeout = context = args = null;
        };

        return throttled;
    }
});
//# sourceMappingURL=fn.js.map
