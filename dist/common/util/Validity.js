/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', "../../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, require("../../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.babelHelpers);
        global.Validity = mod.exports;
    }
})(this, function (module, babelHelpers) {
    'use strict';

    /**
     * @file melon/common/util/Validity
     * @author leon(ludafa@outlook.com)
     */

    'use strict';

    var Validity = function () {
        function Validity() {
            babelHelpers.classCallCheck(this, Validity);

            this.states = [];
            this.stateIndex = {};
            this.customMessage = '';
        }

        Validity.prototype.addState = function addState(name, state) {

            var states = this.states;
            var stateIndex = this.stateIndex;

            if (stateIndex[name]) {
                if (stateIndex[name] === state) {
                    return;
                }

                for (var i = states.length - 1; i >= 0; --i) {
                    if (states[i] === stateIndex[name]) {
                        states.splice(i, 1);
                        break;
                    }
                }
            }

            this.states.push(state);
            this.stateIndex[name] = state;
        };

        Validity.prototype.getState = function getState(name) {
            return this.stateIndex[name];
        };

        Validity.prototype.getStates = function getStates() {
            return this.states.slice();
        };

        Validity.prototype.getErrorMessage = function getErrorMessage() {
            for (var states = this.states, i = 0, len = states.length; i < len; ++i) {
                var state = states[i];
                if (!state.isValid) {
                    return state.message;
                }
            }
            return '';
        };

        Validity.prototype.isValid = function isValid() {
            for (var states = this.states, i = 0, len = states.length; i < len; ++i) {
                if (!states[i].isValid) {
                    return false;
                }
            }
            return true;
        };

        return Validity;
    }();

    module.exports = Validity;
});