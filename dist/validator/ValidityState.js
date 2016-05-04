/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.babelHelpers);
        global.ValidityState = mod.exports;
    }
})(this, function (exports, babelHelpers) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var ValidityState = function ValidityState(_ref) {
        var isValid = _ref.isValid;
        var message = _ref.message;
        babelHelpers.classCallCheck(this, ValidityState);


        this.isValid = isValid;
        this.message = message || '';
    };

    exports["default"] = ValidityState;
});