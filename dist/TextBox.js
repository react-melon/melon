define('melon/TextBox', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'react-dom',
    './createInputComponent',
    './textbox/FloatLabel',
    './textbox/Input',
    './common/util/createClassNameBuilder'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var createInputComponent = require('./createInputComponent');
    var FloatingLabel = require('./textbox/FloatLabel');
    var TextBoxInput = require('./textbox/Input');
    var cxBuilder = require('./common/util/createClassNameBuilder')('Textbox');
    var TextBox = React.createClass({
        displayName: 'TextBox',
        getInitialState: function getInitialState() {
            var value = this.props.value;
            return {
                isFloating: !!value,
                isFocus: false
            };
        },
        onFocus: function onFocus(e) {
            var _props = this.props;
            var onFocus = _props.onFocus;
            var willValidate = _props.willValidate;
            var validate = _props.validate;
            var value = _props.value;
            if (onFocus) {
                onFocus({
                    type: 'focus',
                    target: this
                });
            }
            this.setState({
                isFocus: true,
                isFloating: true
            });
            if (willValidate('focus')) {
                validate(value);
            }
        },
        onBlur: function onBlur(e) {
            var _props2 = this.props;
            var onBlur = _props2.onBlur;
            var value = _props2.value;
            var willValidate = _props2.willValidate;
            var validate = _props2.validate;
            if (onBlur) {
                onBlur({
                    type: 'blur',
                    target: this
                });
            }
            this.setState({
                isFloating: !!value,
                isFocus: false
            });
            if (willValidate('blur')) {
                validate(value);
            }
        },
        onChange: function onChange(e) {
            var rawValue = e.target.value;
            var _props3 = this.props;
            var onChange = _props3.onChange;
            var willValidate = _props3.willValidate;
            var validate = _props3.validate;
            onChange({
                type: 'change',
                target: this,
                value: rawValue,
                rawValue: rawValue
            });
            if (willValidate('change')) {
                validate(rawValue);
            }
        },
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            var value = nextProps.value;
            if (nextProps.multiline && this.props.value !== value) {
                this.syncTextareaHeight();
            }
            var _state = this.state;
            var isFloating = _state.isFloating;
            var isFocus = _state.isFocus;
            var nextIsFloating = !!value || isFocus;
            if (isFloating !== nextIsFloating) {
                this.setState({ isFloating: nextIsFloating });
            }
        },
        syncTextareaHeight: function syncTextareaHeight() {
            var input = this.input;
            if (input) {
                input.style.height = 'auto';
                input.style.height = input.scrollHeight + 'px';
            }
        },
        renderFloatingLabel: function renderFloatingLabel(floatingLabel, isFloating, isFocus) {
            if (!floatingLabel) {
                return null;
            }
            return React.createElement(FloatingLabel, {
                floating: isFloating || isFocus,
                focused: isFocus,
                label: floatingLabel
            });
        },
        render: function render() {
            var _this = this;
            var onFocus = this.onFocus;
            var onBlur = this.onBlur;
            var onChange = this.onChange;
            var props = this.props;
            var renderValidateMessage = props.renderValidateMessage;
            var floatingLabel = props.floatingLabel;
            var className = props.className;
            var getStateClassName = props.getStateClassName;
            var value = props.value;
            var rest = babelHelpers.objectWithoutProperties(props, [
                'renderValidateMessage',
                'floatingLabel',
                'className',
                'getStateClassName',
                'value'
            ]);
            var _state2 = this.state;
            var isFocus = _state2.isFocus;
            var isFloating = _state2.isFloating;
            var statefulClassName = cxBuilder.resolve(props).addState({
                focus: isFocus,
                floating: isFloating,
                fulfilled: !!value
            }).build();
            return React.createElement('div', { className: statefulClassName }, this.renderFloatingLabel(floatingLabel, isFloating, isFocus), React.createElement(TextBoxInput, babelHelpers._extends({}, rest, {
                onFocus: onFocus,
                onBlur: onBlur,
                onChange: onChange,
                isFocus: isFocus,
                value: value,
                ref: function (input) {
                    if (input) {
                        _this.input = ReactDOM.findDOMNode(input);
                    }
                }
            })), renderValidateMessage());
        }
    });
    TextBox.defaultProps = {
        value: '',
        defaultValue: ''
    };
    var PropTypes = React.PropTypes;
    TextBox.propTypes = {
        type: PropTypes.oneOf([
            'text',
            'password'
        ]),
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        placeholder: PropTypes.string,
        floatingLabel: PropTypes.string,
        multiline: PropTypes.bool,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func
    };
    module.exports = createInputComponent('Textbox', TextBox);
});