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
        global.Validity = mod.exports;
    }
})(this, function (exports, babelHelpers) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var Validity = function () {
        function Validity() {
            babelHelpers.classCallCheck(this, Validity);

            this.states = [];
        }

        Validity.prototype.addState = function addState(state) {
            this.states.push(state);
        };

        Validity.prototype.isValid = function isValid() {
            for (var i = 0, states = this.states, len = states.length; i < len; ++i) {
                if (!states[i].isValid) {
                    return false;
                }
            }
            return true;
        };

        Validity.prototype.getMessage = function getMessage() {

            for (var states = this.states, i = 0, len = states.length; i < len; ++i) {
                if (!states[i].isValid) {
                    return states[i].message;
                }
            }

            return '';
        };

        return Validity;
    }();

    exports["default"] = Validity;
});