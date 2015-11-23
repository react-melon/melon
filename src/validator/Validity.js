/**
 * @file validity
 * @author leon(ludafa@outlook.com)
 */

const ValidityState = require('./ValidityState');

function Validity() {
    this.states = [];
}

Validity.prototype.addState = function (state) {
    this.states.push(new ValidityState(state));
};

Validity.prototype.isValid = function () {
    for (let i = 0, states = this.states, len = states.length; i < len; ++i) {
        if (!states[i].isValid) {
            return false;
        }
    }
    return true;
};

Validity.prototype.getMessage = function () {
    for (let states = this.states, i = 0, len = states.length; i < len; ++i) {
        if (!states[i].isValid) {
            return states[i].message;
        }
    }
    return '';
};

module.exports = Validity;
