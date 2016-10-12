(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', './textbox/FloatLabel', './textbox/Input', 'melon-core/Validity', 'melon-core/InputComponent', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('./textbox/FloatLabel'), require('./textbox/Input'), require('melon-core/Validity'), require('melon-core/InputComponent'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.FloatLabel, global.Input, global.Validity, global.InputComponent, global.cxBuilder, global.babelHelpers);
        global.TextBox = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _FloatLabel, _Input, _Validity, _InputComponent2, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _FloatLabel2 = babelHelpers.interopRequireDefault(_FloatLabel);

    var _Input2 = babelHelpers.interopRequireDefault(_Input);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    /**
     * @file TextBox
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('TextBox');

    /**
     * melon/TextBox
     *
     * @extends {melon-core/InputComponent}
     * @class
     */

    var TextBox = function (_InputComponent) {
        babelHelpers.inherits(TextBox, _InputComponent);

        /**
         * 构造函数
         *
         * @public
         * @constructor
         * @param  {*} props   属性
         * @param  {*} context 上下文
         */
        function TextBox(props, context) {
            babelHelpers.classCallCheck(this, TextBox);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            var value = _this.state.value;

            /**
             * 状态
             *
             * @protected
             * @type {Object}
             */
            _this.state = babelHelpers['extends']({}, _this.state, {
                isFloating: !!value,
                isFocus: false
            });

            _this.onFocus = _this.onFocus.bind(_this);
            _this.onBlur = _this.onBlur.bind(_this);
            _this.onChange = _this.onChange.bind(_this);

            return _this;
        }

        /**
         * 接受新属性时的处理
         *
         * @public
         * @override
         * @param {*} nextProps 新属性
         */


        TextBox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            var value = nextProps.value;
            var defaultValue = nextProps.defaultValue;


            if (value === void 0) {
                value = defaultValue;
            }

            // 多行文本框应该可以自动更新高度
            if (nextProps.multiline && this.state.value !== value) {
                this.syncTextareaHeight();
            }

            var _state = this.state;
            var isFloating = _state.isFloating;
            var isFocus = _state.isFocus;


            var nextIsFloating = !!value || isFocus;

            if (isFloating !== nextIsFloating) {
                this.setState({
                    isFloating: nextIsFloating
                });
            }

            _InputComponent.prototype.componentWillReceiveProps.call(this, nextProps);
        };

        TextBox.prototype.componentDidMount = function componentDidMount() {

            _InputComponent.prototype.componentDidMount.call(this);

            if (this.props.multiline && this.state.value) {
                this.syncTextareaHeight();
            }
        };

        TextBox.prototype.onFocus = function onFocus(e) {

            this.setState({
                isFocus: true,
                isFloating: true
            });

            var onFocus = this.props.onFocus;

            if (onFocus) {
                onFocus({
                    type: 'focus',
                    target: this
                });
                return;
            }

            if (this.needValidate('focus')) {
                this.validate(this.state.value);
            }
        };

        TextBox.prototype.onBlur = function onBlur(e) {

            var value = e.target.value;

            this.setState({
                isFloating: !!value,
                isFocus: false
            });

            var onBlur = this.props.onBlur;

            if (onBlur) {
                onBlur({
                    type: 'blur',
                    target: this
                });
                return;
            }

            this.setState({ value: value });

            if (this.needValidate('blur')) {
                this.validate(value);
            }
        };

        TextBox.prototype.onChange = function onChange(e) {

            _InputComponent.prototype.onChange.call(this, {
                type: 'change',
                target: this,
                value: e.target.value
            });
        };

        TextBox.prototype.syncTextareaHeight = function syncTextareaHeight() {

            var input = this.input;

            if (input) {
                input.style.height = 'auto';
                input.style.height = input.scrollHeight + 'px';
            }
        };

        TextBox.prototype.needValidate = function needValidate(eventName) {
            return this.props.validateEvents.indexOf(eventName) !== -1;
        };

        TextBox.prototype.renderFloatingLabel = function renderFloatingLabel(floatingLabel, isFloating, isFocus) {

            if (!floatingLabel) {
                return null;
            }

            return _react2['default'].createElement(_FloatLabel2['default'], {
                floating: isFloating || isFocus,
                focused: isFocus,
                label: floatingLabel });
        };

        TextBox.prototype.render = function render() {
            var _this2 = this;

            var onFocus = this.onFocus;
            var onBlur = this.onBlur;
            var onChange = this.onChange;
            var props = this.props;
            var floatingLabel = props.floatingLabel;
            var rest = babelHelpers.objectWithoutProperties(props, ['floatingLabel']);
            var _state2 = this.state;
            var validity = _state2.validity;
            var isFocus = _state2.isFocus;
            var isFloating = _state2.isFloating;
            var value = _state2.value;


            var statefulClassName = cx(props).addStates({
                focus: isFocus,
                floating: isFloating,
                fulfilled: !!value
            }).addStates(this.getStyleStates()).build();

            return _react2['default'].createElement(
                'div',
                { className: statefulClassName },
                this.renderFloatingLabel(floatingLabel, isFloating, isFocus),
                _react2['default'].createElement(_Input2['default'], babelHelpers['extends']({}, rest, {
                    onFocus: onFocus,
                    onBlur: onBlur,
                    onChange: onChange,
                    isFocus: isFocus,
                    value: value,
                    ref: function ref(input) {
                        if (input) {
                            _this2.input = _reactDom2['default'].findDOMNode(input);
                        }
                    } })),
                _react2['default'].createElement(_Validity2['default'], { validity: validity })
            );
        };

        return TextBox;
    }(_InputComponent3['default']);

    exports['default'] = TextBox;


    TextBox.displayName = 'TextBox';

    TextBox.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        validateEvents: ['change', 'blur']
    });

    TextBox.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {

        type: _react.PropTypes.oneOf(['text', 'password', 'number']),

        placeholder: _react.PropTypes.string,
        floatingLabel: _react.PropTypes.string,

        multiline: _react.PropTypes.bool,

        onFocus: _react.PropTypes.func,
        onBlur: _react.PropTypes.func

    });

    TextBox.childContextTypes = _InputComponent3['default'].childContextTypes;
    TextBox.contextTypes = _InputComponent3['default'].contextTypes;
});
//# sourceMappingURL=TextBox.js.map
