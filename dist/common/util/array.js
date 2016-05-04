/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "../../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("../../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.babelHelpers);
        global.array = mod.exports;
    }
})(this, function (exports, babelHelpers) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.range = range;
    exports.compact = compact;

    /**
    * Copyright 2016 Baidu Inc. All rights reserved.
    *
    * @file array utilities;
    * @author leon <ludafa@outlook.com>
    */

    function range(start, stop) {
        var step = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];


        /* eslint-disable fecs-no-arguments */
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }

        step = step || 1;

        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);

        for (var idx = 0; idx < length; idx++, start += step) {
            range[idx] = start;
        }

        return range;
    }

    function compact(arr) {

        return arr.filter(function (item) {
            return !!item;
        });
    }
});