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
        global.camelize = mod.exports;
    }
})(this, function (module, babelHelpers) {
    "use strict";

    /**
     * @file 骆驼化
     * @author leon(ludafa@outlook.com)
     */

    module.exports = function (source) {

        if (!source) {
            return '';
        }

        return source.replace(/-([a-z])/g, function (match, alpha) {
            return alpha.toUpperCase();
        });
    };
});