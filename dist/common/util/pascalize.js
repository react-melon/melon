/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', "../../babelHelpers", './camelize'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, require("../../babelHelpers"), require('./camelize'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.babelHelpers, global.camelize);
        global.pascalize = mod.exports;
    }
})(this, function (module, babelHelpers, camelize) {
    'use strict';

    module.exports = function (source) {

        if (!source) {
            return '';
        }

        return '' + source.charAt(0).toUpperCase() + camelize(source.slice(1));
    };
    /**
     * @file 大骆驼化
     * @author leon(ludafa@outlook.com)
     */
});