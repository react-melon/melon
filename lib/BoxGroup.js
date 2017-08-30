(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', './boxgroup/Option', 'melon-core/classname/cxBuilder', 'melon-core/InputComponent', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('./boxgroup/Option'), require('melon-core/classname/cxBuilder'), require('melon-core/InputComponent'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.Option, global.cxBuilder, global.InputComponent, global.babelHelpers);
        global.BoxGroup = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _Option, _cxBuilder, _InputComponent2, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.createOptions = createOptions;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _Option2 = babelHelpers.interopRequireDefault(_Option);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    /**
     * @file melon/BoxGroup
     * @author cxtom<cxtom2008@gmail.com>
     * @author leon<ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('BoxGroup');

    /**
     * melon/BoxGroup
     *
     * @extends {melon-core/InputComponent}
     * @class
     */

    var BoxGroup = function (_InputComponent) {
        babelHelpers.inherits(BoxGroup, _InputComponent);

        /**
         * 构造函数
         *
         * @public
         * @constructor
         * @param  {*} props   属性
         * @param  {*} context 上下文
         */
        function BoxGroup(props, context) {
            babelHelpers.classCallCheck(this, BoxGroup);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            var value = _this.state.value;

            /**
             * 状态
             *
             * @protected
             * @type {Object}
             */
            _this.state = babelHelpers['extends']({}, _this.state, {
                value: Array.isArray(value) ? value : [value]
            });

            _this.onChange = _this.onChange.bind(_this);
            _this.renderOption = _this.renderOption.bind(_this);

            return _this;
        }

        /**
         * 值改变时处理
         *
         * @protected
         * @param  {Object} e 事件对象
         */


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
                    var _option$props = option.props,
                        disabled = _option$props.disabled,
                        value = _option$props.value;


                    if (!disabled && currentValue.indexOf(value) > -1) {
                        result.push(value);
                    }
                }

                return result;
            }, []);
        };

        BoxGroup.prototype.renderOption = function renderOption(option) {
            var type = option.type,
                props = option.props;


            // 如果 child 不是一个 <Option> 那么直接返回它
            if (type !== 'option') {
                return option;
            }

            var boxModel = this.props.boxModel;
            var value = props.value,
                children = props.children,
                label = props.label;


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

            var className = cx(this.props).addVariants(this.props.boxModel).addStates(this.getStyleStates()).build();

            return _react2['default'].createElement(
                'div',
                { className: className },
                _react.Children.map(this.props.children, this.renderOption)
            );
        };

        return BoxGroup;
    }(_InputComponent3['default']);

    exports['default'] = BoxGroup;


    BoxGroup.displayName = 'BoxGroup';

    BoxGroup.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        boxModel: _propTypes2['default'].oneOf(['radio', 'checkbox']).isRequired,
        value: function value() {
            var _InputComponent$propT;

            return (_InputComponent$propT = _InputComponent3['default'].propTypes).value.apply(_InputComponent$propT, arguments) && _propTypes2['default'].arrayOf(_propTypes2['default'].string).apply(undefined, arguments);
        },

        children: _propTypes2['default'].node.isRequired
    });

    BoxGroup.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        boxModel: 'checkbox'
    });

    BoxGroup.childContextTypes = _InputComponent3['default'].childContextTypes;
    BoxGroup.contextTypes = _InputComponent3['default'].contextTypes;

    /**
     * 生成 BoxGroup 的选项
     *
     * @param  {Array<{disabled: boolean, name: string, value: string}>} datasource 数据
     * @return {Array<ReactElement>}
     */
    function createOptions(datasource) {

        return datasource.map(function (option, index) {
            var name = option.name,
                value = option.value,
                disabled = option.disabled;


            return _react2['default'].createElement('option', {
                key: value,
                disabled: !!disabled,
                label: name,
                value: value });
        });
    }

    BoxGroup.createOptions = createOptions;
});
//# sourceMappingURL=BoxGroup.js.map
