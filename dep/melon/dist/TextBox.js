define('melon/TextBox', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'react-dom',
    './textbox/FloatLabel',
    './textbox/Input',
    './Validity',
    './common/util/cxBuilder',
    './createInputComponent'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var FloatingLabel = require('./textbox/FloatLabel');
    var TextBoxInput = require('./textbox/Input');
    var Validity = require('./Validity');
    var cx = require('./common/util/cxBuilder').create('TextBox');
    var TextBox = React.createClass({
        displayName: 'TextBox',
        getInitialState: function () {
            var value = this.props.value;
            return {
                isFloating: !!value,
                isFocus: false
            };
        },
        onFocus: function (e) {
            var _props = this.props;
            var onFocus = _props.onFocus;
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
            if (this.needValidate('focus')) {
                validate(value);
            }
        },
        onBlur: function (e) {
            var _props2 = this.props;
            var onBlur = _props2.onBlur;
            var value = _props2.value;
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
            if (this.needValidate('blur')) {
                validate(value);
            }
        },
        onChange: function (e) {
            var value = e.target.value;
            var _props3 = this.props;
            var onChange = _props3.onChange;
            var validate = _props3.validate;
            onChange({
                type: 'change',
                target: this,
                value: value
            });
            if (this.needValidate('change')) {
                validate(value);
            }
        },
        componentWillReceiveProps: function (nextProps) {
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
        syncTextareaHeight: function () {
            var input = this.input;
            if (input) {
                input.style.height = 'auto';
                input.style.height = input.scrollHeight + 'px';
            }
        },
        needValidate: function (eventName) {
            return this.props.validateEvents.indexOf(eventName) !== -1;
        },
        renderFloatingLabel: function (floatingLabel, isFloating, isFocus) {
            if (!floatingLabel) {
                return null;
            }
            return React.createElement(FloatingLabel, {
                floating: isFloating || isFocus,
                focused: isFocus,
                label: floatingLabel
            });
        },
        render: function () {
            var _this = this;
            var onFocus = this.onFocus;
            var onBlur = this.onBlur;
            var onChange = this.onChange;
            var props = this.props;
            var floatingLabel = props.floatingLabel;
            var className = props.className;
            var value = props.value;
            var validity = props.validity;
            var rest = babelHelpers.objectWithoutProperties(props, [
                'floatingLabel',
                'className',
                'value',
                'validity'
            ]);
            var _state2 = this.state;
            var isFocus = _state2.isFocus;
            var isFloating = _state2.isFloating;
            var statefulClassName = cx(props).addStates({
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
            })), React.createElement(Validity, { validity: validity }));
        }
    });
    TextBox.defaultProps = {
        value: '',
        defaultValue: '',
        validateEvents: [
            'change',
            'blur'
        ]
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
    module.exports = require('./createInputComponent').create(TextBox);
});