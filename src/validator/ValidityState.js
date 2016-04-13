/**
 * @file melon/form/ValidityState
 * @author leon(ludafa@outlook.com)
 */

export default class ValidityState {

    constructor({isValid, message}) {

        this.isValid = isValid;
        this.message = message || '';
    }


}
