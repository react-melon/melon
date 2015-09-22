/**
 * @file melon/form/ValidityState
 * @author leon(ludafa@outlook.com)
 */

function ValidityState(isValid, message) {
    this.isValid = isValid;
    this.message = message || '';
}

module.exports = ValidityState;
