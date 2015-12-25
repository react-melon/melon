define('ei/util/bindActions', [
    'require',
    'exports',
    'module',
    './invariant'
], function (require, exports, module) {
    var invariant = require('./invariant');
    function bindActions(dispatch) {
        var actions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        invariant(typeof dispatch === 'function', 'need dispatch');
        function execute(methodName) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }
            var action = actions[methodName].apply(actions, args);
            invariant(action, 'action creator must return a object/funciton');
            return dispatch(action);
        }
        return Object.keys(actions).reduce(function (result, methodName) {
            result[methodName] = execute.bind(null, methodName);
            return result;
        }, {});
    }
    module.exports = bindActions;
});