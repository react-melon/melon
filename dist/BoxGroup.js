/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './boxgroup/Option', './common/util/cxBuilder', './InputComponent', './Validity', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./boxgroup/Option'), require('./common/util/cxBuilder'), require('./InputComponent'), require('./Validity'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Option, global.cxBuilder, global.InputComponent, global.Validity, global.babelHelpers);
        global.BoxGroup = mod.exports;
    }
})(this, function (exports, _react, _Option, _cxBuilder, _InputComponent2, _Validity, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.createOptions = createOptions;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Option2 = babelHelpers.interopRequireDefault(_Option);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    /**
     * @file melon/BoxGroup
     * @author cxtom<cxtom2010@gmail.com>
     * @author leon<ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('BoxGroup');

    var BoxGroup = function (_InputComponent) {
        babelHelpers.inherits(BoxGroup, _InputComponent);

        function BoxGroup(props, context) {
            babelHelpers.classCallCheck(this, BoxGroup);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            var value = _this.state.value;

            _this.state = babelHelpers['extends']({}, _this.state, {
                value: Array.isArray(value) ? value : [value]
            });

            _this.onChange = _this.onChange.bind(_this);
            _this.renderOption = _this.renderOption.bind(_this);

            return _this;
        }

        BoxGroup.prototype.onChange = function onChange(e) {

            var optionValue = e.target.value;
            var value = this.getValue();

            var boxModel = this.props.boxModel;

            var nextValue = void 0;

            // 计算 radio 的值
            if (boxModel === 'radio') {
                nextValue = [optionValue];
            }
            // 计算 checkbox 的值
            else {

                    var index = value.indexOf(optionValue);

                    nextValue = index > -1 ? [].concat(value.slice(0, index), value.slice(index + 1)) : [].concat(value, [optionValue]);
                }

            _InputComponent.prototype.onChange.call(this, {
                type: 'change',
                target: this,
                value: nextValue
            });
        };

        BoxGroup.prototype.getValue = function getValue() {

            var currentValue = this.state.value;

            return _react.Children.toArray(this.props.children).reduce(function (result, option) {

                if (option && option.props) {
                    var _option$props = option.props;
                    var disabled = _option$props.disabled;
                    var value = _option$props.value;


                    if (!disabled && currentValue.indexOf(value) > -1) {
                        result.push(value);
                    }
                }

                return result;
            }, []);
        };

        BoxGroup.prototype.renderOption = function renderOption(option) {
            var type = option.type;
            var props = option.props;


            // 如果 child 不是一个 <Option> 那么直接返回它
            if (type !== 'option') {
                return option;
            }

            var boxModel = this.props.boxModel;
            var value = props.value;
            var children = props.children;
            var label = props.label;


            return _react2['default'].createElement(_Option2['default'], {
                key: value,
                boxModel: boxModel,
                label: label || children,
                value: value,
                checked: this.state.value.indexOf(value) > -1,
                disabled: this.props.disabled || props.disabled,
                readOnly: this.props.readOnly,
                onChange: this.onChange });
        };

        BoxGroup.prototype.render = function render() {
            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).addStates(this.getStyleStates()).build() },
                _react.Children.map(this.props.children, this.renderOption),
                _react2['default'].createElement(_Validity2['default'], { validity: this.state.validity })
            );
        };

        return BoxGroup;
    }(_InputComponent3['default']);

    exports['default'] = BoxGroup;


    BoxGroup.displayName = 'BoxGroup';

    BoxGroup.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        boxModel: _react.PropTypes.oneOf(['radio', 'checkbox']).isRequired,
        value: _react.PropTypes.arrayOf(_react.PropTypes.string),
        children: _react.PropTypes.node.isRequired
    });

    BoxGroup.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        boxModel: 'checkbox',
        defaultValue: []
    });

    function createOptions(datasource) {

        return datasource.map(function (option, index) {
            var name = option.name;
            var value = option.value;
            var disabled = option.disabled;


            return _react2['default'].createElement('option', {
                key: value,
                disabled: !!disabled,
                label: name,
                value: value });
        });
    }

    BoxGroup.createOptions = createOptions;
});