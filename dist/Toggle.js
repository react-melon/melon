/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/InputComponent', 'melon-core/classname/cxBuilder', './ripples/CenterRipple', 'melon-core/Validity', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/InputComponent'), require('melon-core/classname/cxBuilder'), require('./ripples/CenterRipple'), require('melon-core/Validity'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.InputComponent, global.cxBuilder, global.CenterRipple, global.Validity, global.babelHelpers);
        global.Toggle = mod.exports;
    }
})(this, function (exports, _react, _InputComponent2, _cxBuilder, _CenterRipple, _Validity, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _CenterRipple2 = babelHelpers.interopRequireDefault(_CenterRipple);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    /**
     * @file melon/Toggle
     * @author cxtom<cxtom2008@gmail.com>
     * @author leon<ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('Toggle');

    /**
     * melon/Toggle
     *
     * @extends {melon-core/InputComponent}
     * @class
     */

    var Toggle = function (_InputComponent) {
        babelHelpers.inherits(Toggle, _InputComponent);

        /**
         * 构造函数
         *
         * @public
         * @constructor
         * @param  {*} props   属性
         * @param  {*} context 上下文
         */
        function Toggle(props, context) {
            babelHelpers.classCallCheck(this, Toggle);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            _this.onChange = _this.onChange.bind(_this);

            return _this;
        }

        /**
         * 值改变处理
         *
         * @protected
         * @param  {Object} e 事件对象
         */


        Toggle.prototype.onChange = function onChange(e) {
            var _props = this.props;
            var disabled = _props.disabled;
            var readOnly = _props.readOnly;
            var trueValue = _props.trueValue;
            var falseValue = _props.falseValue;


            if (disabled || readOnly) {
                return;
            }

            _InputComponent.prototype.onChange.call(this, {
                type: 'change',
                target: this,
                value: e.target.checked ? trueValue : falseValue
            });
        };

        Toggle.prototype.render = function render() {
            var props = this.props;
            var state = this.state;
            var onChange = this.onChange;
            var value = state.value;
            var validity = state.validity;
            var name = props.name;
            var trueValue = props.trueValue;
            var disabled = props.disabled;


            var checked = value === trueValue;

            return _react2['default'].createElement(
                'label',
                { className: cx(props).addStates({ checked: checked }).build() },
                _react2['default'].createElement('input', {
                    type: 'checkbox',
                    name: name,
                    value: value,
                    onChange: onChange,
                    checked: checked }),
                _react2['default'].createElement(
                    'div',
                    { className: cx().part('bar-container').build() },
                    _react2['default'].createElement('div', { className: cx().part('bar').build() }),
                    _react2['default'].createElement(
                        'div',
                        { className: cx().part('circle').build() },
                        disabled ? null : _react2['default'].createElement(_CenterRipple2['default'], { flag: checked, scale: 2.5, opacity: 0.3 })
                    )
                ),
                _react2['default'].createElement(_Validity2['default'], { validity: validity })
            );
        };

        return Toggle;
    }(_InputComponent3['default']);

    exports['default'] = Toggle;


    Toggle.displayName = 'Toggle';

    Toggle.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        trueValue: 'on',
        falseValue: '',
        defaultValue: ''
    });

    Toggle.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        trueValue: _react.PropTypes.string.isRequired,
        falseValue: _react.PropTypes.string
    });

    Toggle.childContextTypes = _InputComponent3['default'].childContextTypes;
    Toggle.contextTypes = _InputComponent3['default'].contextTypes;
});