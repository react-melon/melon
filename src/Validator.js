/**
 * @file melon/Validator
 * @author leon(ludafa@outlook.com)
 */

var rules = {};

var ValidityState = require('./validator/ValidityState');

var Validator = {};

Validator.register = function (ruleName, check) {
    rules[ruleName] = check;
};

Validator.register('required', function (value, component) {
    return new ValidityState(
        !!value,
        component.props.requiredErrorMessage || '不能为空'
    );
});

Validator.register('pattern', function (value, component) {

    var {pattern, patternErrorMessage} = component.props;

    return new ValidityState(
        !value || new RegExp(pattern).test(value),
        patternErrorMessage || '格式非法'
    );

});

Validator.register('maxByteLength', function (value, component) {

    var {maxByteLength, maxByteLengthErrorMessage} = component.props;
    var byteLength = value.replace(/[^\x00-\xff]/g, 'xx').length;

    return new ValidityState(
        !value || byteLength <= maxByteLength,
        maxByteLengthErrorMessage || `不能多于${maxByteLength}个字符，中文及中文符号占2个字符`
    );

});

Validator.register('minByteLength', function (value, component) {

    var {minByteLength, minByteLengthErrorMessage} = component.props;
    var byteLength = value.replace(/[^\x00-\xff]/g, 'xx').length;

    return new ValidityState(
        !value || byteLength >= minByteLength,
        minByteLengthErrorMessage || `不能少于${minByteLength}个字符，中文及中文符号占2个字符`
    );

});

Validator.register('max', function (value, component) {

    var {max, maxErrorMessage} = component.props;
    var number = +value;
    var isValid = !isNaN(number) && number <= max;

    return new ValidityState(
        !value || isValid,
        maxErrorMessage || `不能大于${max}`
    );

});

Validator.register('min', function (value, component) {

    var {min, minErrorMessage} = component.props;
    var number = +value;
    var isValid = !isNaN(number) && min <= number;

    return new ValidityState(
        !value || isValid,
        minErrorMessage || `不能小于${min}`
    );

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
