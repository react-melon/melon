define('melon/TextBox', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './InputComponent',
    './textbox/FloatLabel'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var PropTypes = React.PropTypes;
    var InputComponent = require('./InputComponent');
    var FloatingLabel = require('./textbox/FloatLabel');
    var TextBox = function (_InputComponent) {
        babelHelpers.inherits(TextBox, _InputComponent);
        babelHelpers.createClass(TextBox, null, [{
                key: 'displayName',
                value: 'TextBox',
                enumerable: true
            }]);
        function TextBox(props) {
            babelHelpers.classCallCheck(this, TextBox);
            babelHelpers.get(Object.getPrototypeOf(TextBox.prototype), 'constructor', this).call(this, props);
            this.state = babelHelpers._extends({}, this.state, {
                isFloating: !!this.getValue(),
                isFocus: false
            });
            this.onFocus = this.onFocus.bind(this);
            this.onBlur = this.onBlur.bind(this);
            this.onChange = this.onChange.bind(this);
        }
        babelHelpers.createClass(TextBox, [
            {
                key: 'render',
                value: function render() {
                    return React.createElement('div', { className: this.getClassName() }, this.renderFloatingLabel(this.props.floatingLabel), this.renderInput(), this.renderValidateMessage());
                }
            },
            {
                key: 'renderInput',
                value: function renderInput() {
                    var props = this.props;
                    var multiline = props.multiline;
                    var tag = multiline ? 'textarea' : 'input';
                    props = {
                        name: props.name,
                        disabled: props.disabled,
                        readOnly: props.readOnly,
                        type: props.type,
                        value: this.getValue(),
                        placeholder: props.placeholder,
                        className: this.getPartClassName('input'),
                        onFocus: this.onFocus,
                        onBlur: this.onBlur,
                        onChange: this.onChange,
                        ref: 'input'
                    };
                    if (multiline) {
                        props.rows = 1;
                    }
                    return React.createElement(tag, props);
                }
            },
            {
                key: 'renderFloatingLabel',
                value: function renderFloatingLabel(floatingLabel) {
                    var state = this.state;
                    return floatingLabel ? React.createElement(FloatingLabel, {
                        floating: state.isFloating || state.isFocus,
                        focused: state.isFocus,
                        label: floatingLabel
                    }) : null;
                }
            },
            {
                key: 'onFocus',
                value: function onFocus(e) {
                    e = {
                        type: 'focus',
                        target: this
                    };
                    babelHelpers.get(Object.getPrototypeOf(TextBox.prototype), 'onFocus', this).call(this, e);
                    var onFocus = this.props.onFocus;
                    if (onFocus) {
                        onFocus(e);
                    }
                    this.setState({
                        isFocus: true,
                        isFloating: true
                    });
                }
            },
            {
                key: 'getStates',
                value: function getStates(props) {
                    var states = babelHelpers.get(Object.getPrototypeOf(TextBox.prototype), 'getStates', this).call(this, props);
                    states.focus = this.state.isFocus;
                    return states;
                }
            },
            {
                key: 'onBlur',
                value: function onBlur(e) {
                    e = {
                        type: 'blur',
                        target: this
                    };
                    babelHelpers.get(Object.getPrototypeOf(TextBox.prototype), 'onBlur', this).call(this, e);
                    var onBlur = this.props.onBlur;
                    if (onBlur) {
                        onBlur(e);
                    }
                    this.setState({
                        isFloating: !!this.getValue(),
                        isFocus: false
                    });
                }
            },
            {
                key: 'onChange',
                value: function onChange(e) {
                    var rawValue = e.target.value;
                    e = {
                        type: 'change',
                        target: this,
                        value: this.stringifyValue(rawValue),
                        rawValue: rawValue
                    };
                    babelHelpers.get(Object.getPrototypeOf(TextBox.prototype), 'onChange', this).call(this, e);
                    if (this.isControlled()) {
                        this.props.onChange(e);
                        return;
                    }
                    this.setState({ rawValue: rawValue });
                    if (this.props.multiline) {
                        this.syncTextareaHeight();
                    }
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    babelHelpers.get(Object.getPrototypeOf(TextBox.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
                    if (nextProps.multiline && this.isControlled() && this.props.value !== nextProps.value) {
                        this.syncTextareaHeight();
                    }
                }
            },
            {
                key: 'syncTextareaHeight',
                value: function syncTextareaHeight() {
                    var dom = this.refs.input;
                    dom.style.height = 'auto';
                    dom.style.height = dom.scrollHeight + 'px';
                }
            }
        ]);
        return TextBox;
    }(InputComponent);
    TextBox.defaultProps = babelHelpers._extends({}, InputComponent.defaultProps, { value: '' });
    TextBox.propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func,
        defaultValue: PropTypes.string,
        placeholder: PropTypes.string,
        floatingLabel: PropTypes.string,
        multiline: PropTypes.bool
    };
    module.exports = TextBox;
});