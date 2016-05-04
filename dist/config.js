/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.babelHelpers);
        global.config = mod.exports;
    }
})(this, function (exports, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    /**
     * @file melon/common/config
     * @author leon(ludafa@outlook.com)
     */

    var COMPONENT_SIZES = exports.COMPONENT_SIZES = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];
    var COMPONENT_CLASS_PREFIX = exports.COMPONENT_CLASS_PREFIX = 'ui';
    var COMPONENT_VARIANT_PREFIX = exports.COMPONENT_VARIANT_PREFIX = 'variant';
    var COMPONENT_STATE_PREFIX = exports.COMPONENT_STATE_PREFIX = 'state';

    exports['default'] = {
        COMPONENT_SIZES: COMPONENT_SIZES,
        COMPONENT_CLASS_PREFIX: COMPONENT_CLASS_PREFIX,
        COMPONENT_VARIANT_PREFIX: COMPONENT_VARIANT_PREFIX,
        COMPONENT_STATE_PREFIX: COMPONENT_STATE_PREFIX
    };
});