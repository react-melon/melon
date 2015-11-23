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

Validator.prototype.resolveCheckers = function (config) {

    const {rules} = this;

    return rules
        .reduce(
            (activeCheckers, checker) => {

                const {name, check} = checker;

                if (name in config) {
                    activeCheckers.push({
                        name,
                        check: check,
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
        .resolveCheckers(component.props)
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
    name: 'min',
    check: (value, component) => {
        const {min, minErrorMessage} = component.props;
        const num = +value;
        if (value && isNaN(num)) {
            return {
                isValid: true
            };
        }
        return {
            isValid: num >= min,
            message: minErrorMessage || `不能小于${min}`
        };
    }
});

module.exports = validator;
