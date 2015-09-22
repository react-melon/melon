/**
 * @file melon/Validator
 * @author leon(ludafa@outlook.com)
 */

'use strict';

var rules = {};

var ValidityState = require('./validator/ValidityState');

var Validator = {};

Validator.register = function (ruleName, check) {
    rules[ruleName] = check;
};

Validator.register('required', function (value, component) {
    return new ValidityState(!!value, component.props.requiredErrorMessage || '不能为空');
});

Validator.resolve = function (component) {

    var props = component.props;

    if (props.novalidate) {
        return [];
    }

    return Object
        .keys(rules)
        .reduce(
            function (result, ruleName) {
                if (ruleName in component.props) {
                    result.push({
                        name: ruleName,
                        check: rules[ruleName]
                    });
                }
                return result;
            },
            []
        );
};


module.exports = Validator;
