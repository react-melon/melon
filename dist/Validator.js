define('melon/Validator', [
    'require',
    'exports',
    'module',
    './validator/Validity'
], function (require, exports, module) {
    var Validity = require('./validator/Validity');
    function Validator() {
        this.rules = [];
    }
    Validator.prototype.addRule = function (rule) {
        this.rules.push(rule);
        return this;
    };
    Validator.prototype.resolveCheckers = function (config) {
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
    Validator.prototype.validate = function (value, component) {
        return this.resolveCheckers(component.props).reduce(function (validity, checker) {
            var check = checker.check;
            var state = check(value, component);
            validity.addState(state);
            return validity;
        }, new Validity());
    };
    Validator.prototype.createCustomValidity = function (customValidity) {
        var validity = new Validity();
        validity.addState({
            isValid: false,
            message: customValidity
        });
        return validity;
    };
    var validator = new Validator();
    validator.create = function () {
        return new Validator();
    };
    validator.addRule({
        name: 'min',
        check: function check(value, component) {
            var _component$props = component.props;
            var min = _component$props.min;
            var minErrorMessage = _component$props.minErrorMessage;
            var num = +value;
            if (value && isNaN(num)) {
                return { isValid: true };
            }
            return {
                isValid: num >= min,
                message: minErrorMessage || '\u4E0D\u80FD\u5C0F\u4E8E' + min
            };
        }
    });
    module.exports = validator;
});