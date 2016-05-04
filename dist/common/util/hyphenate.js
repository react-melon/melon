/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["module", "../../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, require("../../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.babelHelpers);
        global.hyphenate = mod.exports;
    }
})(this, function (module, babelHelpers) {
    "use strict";

    /**
     * @file 把一个XxxXxx格式的字符串转化成xxx-xxx的格式
     * @author leon(ludafa@outlook.com)
     */

    module.exports = function (source) {
        return source.replace(/[A-Z]/g, function ($0) {
            return "-" + $0;
        }).slice(1).toLowerCase();
    };
});