define('melon/common/util/Validity', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    'use strict';
    class Validity {
        constructor() {
            this.states = [];
            this.stateIndex = {};
            this.customMessage = '';
        }
        addState(name, state) {
            var states = this.states;
            var stateIndex = this.stateIndex;
            if (stateIndex[name]) {
                if (stateIndex[name] === state) {
                    return;
                }
                for (var i = states.length - 1; i >= 0; --i) {
                    if (states[i] === stateIndex[name]) {
                        states.splice(i, 1);
                        break;
                    }
                }
            }
            this.states.push(state);
            this.stateIndex[name] = state;
        }
        getState(name) {
            return this.stateIndex[name];
        }
        getStates() {
            return this.states.slice();
        }
        getErrorMessage() {
            for (var states = this.states, i = 0, len = states.length; i < len; ++i) {
                var state = states[i];
                if (!state.isValid) {
                    return state.message;
                }
            }
            return '';
        }
        isValid() {
            for (var states = this.states, i = 0, len = states.length; i < len; ++i) {
                if (!states[i].isValid) {
                    return false;
                }
            }
            return true;
        }
    }
    module.exports = Validity;
});