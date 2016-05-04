/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', "../../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("../../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.babelHelpers);
        global.classname = mod.exports;
    }
})(this, function (exports, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.createClasses = createClasses;
    exports.createClassName = createClassName;

    /**
     * @file melon 样式相关的小工具
     * @author leon(ludafa@outlook.com)
     */

    var toString = Object.prototype.toString;
    var hasOwnProperty = Object.prototype.hasOwnProperty;

    function createClasses() {

        var classes = [];

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        for (var i = 0, len = args.length; i < len; i++) {

            var arg = args[i];

            if (!arg) {
                continue;
            }

            switch (toString.call(arg).slice(8, -1)) {

                case 'String':
                case 'Number':
                    classes.push(arg);
                    break;

                case 'Array':
                    classes = classes.concat(createClasses.apply(null, arg));
                    break;

                case 'Object':
                    for (var key in arg) {
                        if (hasOwnProperty.call(arg, key) && arg[key]) {
                            classes.push(key);
                        }
                    }
                    break;
            }
        }

        return classes;
    }

    function createClassName() {
        return createClasses.apply(undefined, arguments).join(' ');
    }
});