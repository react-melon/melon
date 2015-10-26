define('melon/Toggle', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './InputComponent',
    './ripples/CenterRipple',
    'react-motion'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var InputComponent = require('./InputComponent');
    var CenterRipple = require('./ripples/CenterRipple');
    var _require = require('react-motion');
    var Motion = _require.Motion;
    var spring = _require.spring;
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
                    var _this = this;
                    var checked = this.isChecked();
                    var barStyle = checked ? { backgroundColor: 'rgba(0, 188, 212, 0.498039)' } : null;
                    var circleColor = checked ? 'rgb(0, 188, 212)' : '';
                    return React.createElement('div', { className: this.getPartClassName('bar-container') }, React.createElement('div', {
                        className: this.getPartClassName('bar'),
                        style: barStyle
                    }), React.createElement(Motion, { style: { x: spring(checked ? 45 : 0) } }, function (_ref) {
                        var x = _ref.x;
                        return React.createElement('div', {
                            className: _this.getPartClassName('circle'),
                            style: {
                                left: x + '%',
                                backgroundColor: circleColor
                            }
                        }, React.createElement(CenterRipple, {
                            flag: checked,
                            scale: 2.5,
                            opacity: 0.3
                        }));
                    }));
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