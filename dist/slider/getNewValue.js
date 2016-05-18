/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "../common/util/dom", "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("../common/util/dom"), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.dom, global.babelHelpers);
        global.getNewValue = mod.exports;
    }
})(this, function (exports, _dom, babelHelpers) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = getNewValue;

    /**
     * @file 获取新值
     * @author cxtom <cxtom2008@gmail.com>
     */

    function getNewValue(dom, clientX, max, min, step) {

        var position = (0, _dom.getPosition)(dom);

        var percent = (clientX - position.left) / position.width;
        var newValue = min + (max - min) * percent;

        return Math.round(newValue / step) * step;
    }
});