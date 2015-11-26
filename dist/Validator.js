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
    Validator.prototype.resolveCheckers = function () {
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
    Validator.prototype.validate = function (value, component) {
        return this.resolveCheckers(component.props.rules).reduce(function (validity, checker) {
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
        name: 'required',
        check: function (value, component) {
            var requiredErrorMessage = component.props.rules.requiredErrorMessage;
            var isValid = value instanceof Array ? value.length : typeof value === 'string' ? value !== '' : value != null;
            return {
                isValid: isValid,
                message: requiredErrorMessage || '\u8BF7\u586B\u5199\u6B64\u5B57\u6BB5'
            };
        }
    });
    module.exports = validator;
});