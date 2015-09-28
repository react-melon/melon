define('melon/textbox/FloatLabel', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var TextBoxFloatingLabel = function (_Component) {
        babelHelpers.inherits(TextBoxFloatingLabel, _Component);
        function TextBoxFloatingLabel() {
            babelHelpers.classCallCheck(this, TextBoxFloatingLabel);
            babelHelpers.get(Object.getPrototypeOf(TextBoxFloatingLabel.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(TextBoxFloatingLabel, [
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return React.createElement('label', { className: this.getClassName() }, props.label);
                }
            },
            {
                key: 'getStates',
                value: function getStates(props) {
                    var states = babelHelpers.get(Object.getPrototypeOf(TextBoxFloatingLabel.prototype), 'getStates', this).call(this, props);
                    states.floating = props.floating;
                    states.focus = props.focused;
                    return states;
                }
            }
        ]);
        return TextBoxFloatingLabel;
    }(Component);
    var PropTypes = React.PropTypes;
    TextBoxFloatingLabel.propTypes = {
        label: PropTypes.string.isRequired,
        floating: PropTypes.bool.isRequired
    };
    module.exports = TextBoxFloatingLabel;
});