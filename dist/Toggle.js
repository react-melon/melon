define('melon/Toggle', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './InputComponent',
    './ripples/CenterRipple'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var InputComponent = require('./InputComponent');
    var CenterRipple = require('./ripples/CenterRipple');
    var Toggle = function (_InputComponent) {
        babelHelpers.inherits(Toggle, _InputComponent);
        babelHelpers.createClass(Toggle, null, [{
                key: 'displayName',
                value: 'Toggle',
                enumerable: true
            }]);
        function Toggle(props) {
            babelHelpers.classCallCheck(this, Toggle);
            babelHelpers.get(Object.getPrototypeOf(Toggle.prototype), 'constructor', this).call(this, props);
            this.onChange = this.onChange.bind(this);
            if (!this.isControlled()) {
                this.state = babelHelpers._extends({}, this.state, { checked: props.checked });
            }
        }
        babelHelpers.createClass(Toggle, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(props) {
                    var checked = props.checked;
                    if (this.props.checked === checked || !this.isControlled()) {
                        return;
                    }
                    var rawValue = checked ? props.value : '';
                    var value = this.stringifyValue(rawValue);
                    var validity = this.checkValidity(value);
                    this.setState({ checked: checked });
                    this.showValidity(validity);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var isChecked = this.isChecked();
                    return React.createElement('label', { className: this.getClassName() }, React.createElement('input', {
                        type: 'checkbox',
                        name: props.name,
                        value: props.value,
                        onChange: this.onChange,
                        checked: isChecked
                    }), this.renderBar(), this.renderValidateMessage());
                }
            },
            {
                key: 'getValue',
                value: function getValue() {
                    return this.isChecked() ? this.props.value || '' : this.state.value;
                }
            },
            {
                key: 'isChecked',
                value: function isChecked() {
                    return this.isControlled() ? this.props.checked : this.state.checked;
                }
            },
            {
                key: 'isControlled',
                value: function isControlled() {
                    var props = this.props;
                    return props.disabled || props.readOnly || props.checked != null && props.onChange;
                }
            },
            {
                key: 'getStates',
                value: function getStates(props) {
                    return babelHelpers._extends({}, babelHelpers.get(Object.getPrototypeOf(Toggle.prototype), 'getStates', this).call(this, props), { checked: this.isChecked() });
                }
            },
            {
                key: 'onChange',
                value: function onChange(e) {
                    var props = this.props;
                    if (props.disabled || props.readOnly) {
                        return;
                    }
                    var isChecked = e.target.checked;
                    e = {
                        type: 'change',
                        target: this,
                        value: isChecked ? this.props.value || 'on' : ''
                    };
                    babelHelpers.get(Object.getPrototypeOf(Toggle.prototype), 'onChange', this).call(this, e);
                    if (this.isControlled()) {
                        this.props.onChange(e);
                        return;
                    }
                    this.setState({ checked: isChecked }, function () {
                        var onChange = this.props.onChange;
                        if (onChange) {
                            onChange(e);
                        }
                    });
                }
            },
            {
                key: 'renderBar',
                value: function renderBar() {
                    var checked = this.isChecked();
                    var disabled = this.props.disabled;
                    return React.createElement('div', { className: this.getPartClassName('bar-container') }, React.createElement('div', { className: this.getPartClassName('bar') }), React.createElement('div', { className: this.getPartClassName('circle') }, disabled ? null : React.createElement(CenterRipple, {
                        flag: checked,
                        scale: 2.5,
                        opacity: 0.3
                    })));
                }
            }
        ]);
        return Toggle;
    }(InputComponent);
    Toggle.defaultProps = babelHelpers._extends({}, InputComponent.defaultProps, {
        value: 'on',
        checked: false,
        validateEvents: ['change']
    });
    var PropTypes = React.PropTypes;
    Toggle.propTypes = {
        checked: PropTypes.bool,
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        defaultChecked: PropTypes.bool
    };
    module.exports = Toggle;
});