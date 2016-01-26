/**
 * @file Validitor
 * @author leon(ludafa@outlook.com)
 */

const Validity = require('./validator/Validity');

function Validator() {
    this.rules = [];
}

Validator.prototype.addRule = function (rule) {
    this.rules.push(rule);
    return this;
};

Validator.prototype.resolveCheckers = function (config = {}) {

    const {rules} = this;

    return rules
        .reduce(
            (activeCheckers, checker) => {

                const {name, check} = checker;

                if (name in config) {
                    activeCheckers.push({
                        name,
                        check,
                        value: config[name]
                    });
                }

                return activeCheckers;

            },
            []
        );

};

Validator.prototype.validate = function (value, component) {

    return this
        .resolveCheckers(component.props.rules)
        .reduce(
            (validity, checker) => {
                const {check} = checker;
                const state = check(value, component);
                validity.addState(state);
                return validity;
            },
            new Validity()
        );

};

Validator.prototype.createCustomValidity = function (customValidity) {
    const validity = new Validity();
    validity.addState({
        isValid: false,
        message: customValidity
    });
    return validity;
};

const validator = new Validator();

validator.create = () => {
    return new Validator();
};

validator.addRule({
    name: 'required',
    check: (value, component) => {

        const {requiredErrorMessage} = component.props.rules;

        const isValid = value instanceof Array
            ? value.length
            : typeof value === 'string' ? value !== '' : value != null;

        return {
            isValid,
            message: requiredErrorMessage || `请填写此字段`
        };

    }
});

module.exports = validator;
