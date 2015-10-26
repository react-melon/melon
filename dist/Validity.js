define('melon/Validity', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Validity = function (_Component) {
        babelHelpers.inherits(Validity, _Component);
        function Validity() {
            babelHelpers.classCallCheck(this, Validity);
            babelHelpers.get(Object.getPrototypeOf(Validity.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(Validity, [
            {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps) {
                    var props = this.props;
                    return nextProps.isValid !== props.isValid || nextProps.message !== props.message;
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return React.createElement('span', { className: this.getClassName() }, props.message);
                }
            },
            {
                key: 'getStates',
                value: function getStates(props) {
                    var isValid = props.isValid;
                    return babelHelpers._extends({}, babelHelpers.get(Object.getPrototypeOf(Validity.prototype), 'getStates', this).call(this, props), {
                        valid: isValid,
                        invalid: !isValid
                    });
                }
            }
        ], [{
                key: 'displayName',
                value: 'Validity',
                enumerable: true
            }]);
        return Validity;
    }(Component);
    module.exports = Validity;
});