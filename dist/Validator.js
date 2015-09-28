define('melon/Validator', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    './validator/ValidityState'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var rules = {};
    var ValidityState = require('./validator/ValidityState');
    var Validator = {};
    Validator.register = function (ruleName, check) {
        rules[ruleName] = check;
    };
    Validator.register('required', function (value, component) {
        return new ValidityState(!!value, component.props.requiredErrorMessage || '\u4E0D\u80FD\u4E3A\u7A7A');
    });
    Validator.resolve = function (component) {
        var props = component.props;
        if (props.novalidate) {
            return [];
        }
        return Object.keys(rules).reduce(function (result, ruleName) {
            if (ruleName in component.props) {
                result.push({
                    name: ruleName,
                    check: rules[ruleName]
                });
            }
            return result;
        }, []);
    };
    module.exports = Validator;
});