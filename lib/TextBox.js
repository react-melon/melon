(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', './textbox/FloatLabel', './textbox/Input', 'melon-core/InputComponent', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('./textbox/FloatLabel'), require('./textbox/Input'), require('melon-core/InputComponent'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.FloatLabel, global.Input, global.InputComponent, global.cxBuilder, global.babelHelpers);
        global.TextBox = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _FloatLabel, _Input, _InputComponent2, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _FloatLabel2 = babelHelpers.interopRequireDefault(_FloatLabel);

    var _Input2 = babelHelpers.interopRequireDefault(_Input);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    /**
     * @file TextBox
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('TextBox');

    function getValueStringLength(value) {
        return value == null ? 0 : ('' + value).length;
    }

    /**
     * melon/TextBox
     *
     * @extends {React.Component}
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

            /**
             * 状态
             *
             * @private
             * @type {Object}
             */
            _this.state = babelHelpers['extends']({}, _this.state, {
                isFocus: false
            });

            _this.onFocus = _this.onFocus.bind(_this);
            _this.onBlur = _this.onBlur.bind(_this);
            _this.onChange = _this.onChange.bind(_this);

            return _this;
        }

        /**
         * Mount时的处理
         *
         * @public
         * @override
         */


        TextBox.prototype.componentDidMount = function componentDidMount() {

            _InputComponent.prototype.componentDidMount.call(this);

            var _props = this.props,
                multiline = _props.multiline,
                autoFocus = _props.autoFocus;


            if (multiline && this.state.value != null) {
                this.syncTextareaHeight();
            }

            if (autoFocus) {
                this.input.focus();
            }
        };

        TextBox.prototype.componentDidUpdate = function componentDidUpdate() {

            var props = this.props;

            if (
            // 多行的
            props.multiline
            // 控制的
            && !props.hasOwnProperty('defaultValue')) {
                // 同步高度
                this.syncTextareaHeight();
            }
        };

        TextBox.prototype.onFocus = function onFocus(e) {

            this.setState({
                isFocus: true
            });

            var onFocus = this.props.onFocus;

            if (onFocus) {
                onFocus({
                    type: 'focus',
                    target: this
                });
                return;
            }
        };

        TextBox.prototype.onBlur = function onBlur(e) {

            this.setState({
                isFocus: false
            });

            var onBlur = this.props.onBlur;

            if (onBlur) {
                onBlur({
                    type: 'blur',
                    target: this
                });
            }
        };

        TextBox.prototype.onChange = function onChange(e) {
            var _this2 = this;

            var currentValue = this.state.value;

            _InputComponent.prototype.onChange.call(this, {
                value: e.target.value,
                target: e.target,
                currentTarget: this,
                type: 'change'
            }, function () {
                if (_this2.props.multiline && _this2.props.hasOwnProperty('defaultValue') && currentValue !== _this2.state.value) {
                    _this2.syncTextareaHeight();
                }
            });
        };

        TextBox.prototype.syncTextareaHeight = function syncTextareaHeight() {

            var input = this.input;

            if (input) {
                input.style.height = 'auto';
                input.style.height = input.scrollHeight + 'px';
            }
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
            var _this3 = this;

            var onFocus = this.onFocus,
                onBlur = this.onBlur,
                onChange = this.onChange,
                props = this.props;
            var floatingLabel = props.floatingLabel,
                defaultValue = props.defaultValue,
                rest = babelHelpers.objectWithoutProperties(props, ['floatingLabel', 'defaultValue']);
            var _state = this.state,
                isFocus = _state.isFocus,
                _state$value = _state.value,
                value = _state$value === undefined ? defaultValue : _state$value;


            var floating = !!getValueStringLength(value) || isFocus;

            var className = cx(props).addStates({
                floating: floatingLabel && floating,
                focus: isFocus,
                fulfilled: value == null
            }).addStates(this.getStyleStates()).build();

            return _react2['default'].createElement(
                'div',
                { className: className },
                this.renderFloatingLabel(floatingLabel, floating, isFocus),
                _react2['default'].createElement(_Input2['default'], babelHelpers['extends']({}, rest, {
                    onFocus: onFocus,
                    onBlur: onBlur,
                    onChange: onChange,
                    isFocus: isFocus,
                    value: value == null ? '' : value,
                    ref: function ref(input) {
                        if (input) {
                            _this3.input = _reactDom2['default'].findDOMNode(input);
                        }
                    } }))
            );
        };

        return TextBox;
    }(_InputComponent3['default']);

    exports['default'] = TextBox;


    TextBox.displayName = 'TextBox';

    TextBox.defaultProps = {
        type: 'text'
    };

    TextBox.propTypes = {
        type: _react.PropTypes.oneOf(['text', 'password', 'number']),
        placeholder: _react.PropTypes.string,
        floatingLabel: _react.PropTypes.string,
        multiline: _react.PropTypes.bool,
        autoFocus: _react.PropTypes.bool
    };

    TextBox.contextTypes = _InputComponent3['default'].contextTypes;
});
//# sourceMappingURL=TextBox.js.map
