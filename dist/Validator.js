/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './validator/Validity', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./validator/Validity'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Validity, global.babelHelpers);
        global.Validator = mod.exports;
    }
})(this, function (exports, _Validity, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Validator = undefined;

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    var Validator = exports.Validator = function () {
        function Validator() {
            babelHelpers.classCallCheck(this, Validator);

            this.rules = [];
        }

        Validator.prototype.addRule = function addRule(rule) {
            this.rules.push(rule);
            return this;
        };

        Validator.prototype.resolveCheckers = function resolveCheckers() {
            var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var rules = this.rules;


            return rules.reduce(function (activeCheckers, checker) {
                var name = checker.name;
                var check = checker.check;


                if (name in config) {
                    activeCheckers.push({
                        name: name,
                        check: check,
                        value: config[name]
                    });
                }

                return activeCheckers;
            }, []);
        };

        Validator.prototype.validate = function validate(value, component) {

            return this.resolveCheckers(component.props.rules).reduce(function (validity, checker) {
                var check = checker.check;

                var state = check(value, component);
                validity.addState(state);
                return validity;
            }, new _Validity2['default']());
        };

        Validator.prototype.createCustomValidity = function createCustomValidity(customValidity) {
            var validity = new _Validity2['default']();
            validity.addState({
                isValid: false,
                message: customValidity
            });
            return validity;
        };

        return Validator;
    }();

    var validator = new Validator();
    exports['default'] = validator;


    validator.create = function () {
        return new Validator();
    };

    validator.addRule({
        name: 'required',
        check: function check(value, component) {
            var requiredErrorMessage = component.props.rules.requiredErrorMessage;


            var isValid = Array.isArray(value) ? !!value.length : typeof value === 'string' ? value !== '' : value != null;

            return {
                isValid: isValid,
                message: requiredErrorMessage || '请填写此字段'
            };
        }
    });
});