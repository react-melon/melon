define('melon/common/util/Validity', [
    'exports',
    '../../babelHelpers'
], function (exports) {
    var babelHelpers = require('../../babelHelpers');
    'use strict';
    var Validity = function () {
        function Validity() {
            babelHelpers.classCallCheck(this, Validity);
            this.states = [];
            this.stateIndex = {};
            this.customMessage = '';
        }
        babelHelpers.createClass(Validity, [
            {
                key: 'addState',
                value: function addState(name, state) {
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
            },
            {
                key: 'getState',
                value: function getState(name) {
                    return this.stateIndex[name];
                }
            },
            {
                key: 'getStates',
                value: function getStates() {
                    return this.states.slice();
                }
            },
            {
                key: 'getErrorMessage',
                value: function getErrorMessage() {
                    for (var states = this.states, i = 0, len = states.length; i < len; ++i) {
                        var state = states[i];
                        if (!state.isValid) {
                            return state.message;
                        }
                    }
                    return '';
                }
            },
            {
                key: 'isValid',
                value: function isValid() {
                    for (var states = this.states, i = 0, len = states.length; i < len; ++i) {
                        if (!states[i].isValid) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        ]);
        return Validity;
    }();
    module.exports = Validity;
});