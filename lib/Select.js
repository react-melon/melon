(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Icon', 'melon-core/InputComponent', './select/OptionGroup', './select/Option', 'melon-core/classname/cxBuilder', './Popover', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Icon'), require('melon-core/InputComponent'), require('./select/OptionGroup'), require('./select/Option'), require('melon-core/classname/cxBuilder'), require('./Popover'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Icon, global.InputComponent, global.OptionGroup, global.Option, global.cxBuilder, global.Popover, global.babelHelpers);
        global.Select = mod.exports;
    }
})(this, function (exports, _react, _Icon, _InputComponent2, _OptionGroup, _Option, _cxBuilder, _Popover, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.OptionGroup = exports.Option = undefined;
    exports.createOptions = createOptions;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _OptionGroup2 = babelHelpers.interopRequireDefault(_OptionGroup);

    var _Option2 = babelHelpers.interopRequireDefault(_Option);

    var _Popover2 = babelHelpers.interopRequireDefault(_Popover);

    /**
     * @file melon/Select
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Select');

    /**
     * melon/Select
     *
     * @extends {melon-core/InputComponent}
     * @class
     */

    var Select = function (_InputComponent) {
        babelHelpers.inherits(Select, _InputComponent);

        /**
         * 构造函数
         *
         * @public
         * @constructor
         * @param  {*} props   属性
         * @param  {*} context 上下文
         */
        function Select(props, context) {
            babelHelpers.classCallCheck(this, Select);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            /**
             * 状态
             *
             * @type {Object}
             */
            _this.state = babelHelpers['extends']({}, _this.state, {
                open: false
            });

            _this.onClick = _this.onClick.bind(_this);
            _this.onClickOption = _this.onClickOption.bind(_this);
            _this.hideOptions = _this.hideOptions.bind(_this);
            _this.renderOptions = _this.renderOptions.bind(_this);
            _this.showSelectedOption = _this.showSelectedOption.bind(_this);

            return _this;
        }

        /**
         * 渲染选项浮层
         *
         * @protected
         * @return {ReactElement}
         */


        Select.prototype.renderOptions = function renderOptions() {

            var children = _react.Children.map(this.props.children, this.renderOption, this);

            return _react2['default'].createElement(
                'div',
                { className: cx.getPartClassName('popup') },
                children
            );
        };

        Select.prototype.renderOption = function renderOption(child, index) {

            if (!child) {
                return null;
            }

            if (child.type === 'option') {
                return _react2['default'].createElement(_Option2['default'], babelHelpers['extends']({}, child.props, {
                    selected: this.state.value === child.props.value,
                    onClick: this.onClickOption,
                    key: index }));
            }

            if (child.type === 'optgroup') {
                return _react2['default'].createElement(_OptionGroup2['default'], babelHelpers['extends']({}, child.props, {
                    value: this.state.value,
                    onClick: this.onClickOption,
                    key: index }));
            }

            return null;
        };

        Select.prototype.renderHiddenInput = function renderHiddenInput() {
            var _props = this.props,
                name = _props.name,
                value = _props.value;


            return name ? _react2['default'].createElement('input', {
                name: name,
                type: 'hidden',
                value: value }) : null;
        };

        Select.prototype.renderLabel = function renderLabel() {

            var value = this.state.value;
            var _props2 = this.props,
                children = _props2.children,
                placeholder = _props2.placeholder;


            var option = this.findOption(value, children);

            var label = option ? option.props.label || option.props.children : _react2['default'].createElement(
                'span',
                { className: cx().part('label-placeholder').build() },
                placeholder
            );

            return _react2['default'].createElement(
                'label',
                { className: cx().part('label').build() },
                label
            );
        };

        Select.prototype.findOption = function findOption(value, children) {

            children = _react.Children.toArray(children);

            if (!children) {
                return null;
            }

            for (var i = 0, len = children.length; i < len; ++i) {

                var child = children[i];

                if (child.type === 'optgroup') {
                    var option = this.findOption(value, child.props.children);
                    if (option) {
                        return option;
                    }
                    continue;
                }
                if (child.props.value === value) {
                    return child;
                }
            }

            return null;
        };

        Select.prototype.renderIcon = function renderIcon() {
            return _react2['default'].createElement(_Icon2['default'], { icon: 'expand-more' });
        };

        Select.prototype.isOpen = function isOpen() {
            return this.state.open;
        };

        Select.prototype.showOptions = function showOptions() {
            this.setState({
                open: true
            }, this.showSelectedOption);
        };

        Select.prototype.hideOptions = function hideOptions() {
            this.setState({
                open: false
            });
        };

        Select.prototype.showSelectedOption = function showSelectedOption() {

            var value = this.state.value;
            var layer = this.popover.getLayer();

            if (value == null || !layer) {
                return;
            }

            var selectedOption = layer.querySelector('[data-value="' + value + '"]');

            if (selectedOption) {
                setTimeout(function () {
                    selectedOption.scrollIntoView();
                }, 50);
            }
        };

        Select.prototype.onClick = function onClick() {
            var _props3 = this.props,
                disabled = _props3.disabled,
                readOnly = _props3.readOnly;


            if (disabled || readOnly) {
                return;
            }

            var open = this.state.open;

            if (open) {
                this.hideOptions();
                return;
            }

            this.showOptions();
        };

        Select.prototype.onClickOption = function onClickOption(e) {

            var value = e.value;

            if (this.state.closing) {
                return;
            }

            this.hideOptions();

            _InputComponent.prototype.onChange.call(this, {
                type: 'change',
                target: this,
                value: value
            });
        };

        Select.prototype.render = function render() {
            var _this2 = this;

            var className = cx(this.props).addStates(this.getStyleStates()).build();
            var _props4 = this.props,
                autoWidth = _props4.autoWidth,
                style = _props4.style,
                maxHeight = _props4.maxHeight;


            return _react2['default'].createElement(
                'div',
                {
                    onClick: this.onClick,
                    className: className,
                    style: style,
                    ref: 'main' },
                this.renderLabel(),
                this.renderHiddenInput(),
                this.renderIcon(),
                _react2['default'].createElement(
                    _Popover2['default'],
                    {
                        ref: function ref(popover) {
                            return _this2.popover = popover;
                        },
                        maxHeight: maxHeight,
                        autoWidth: autoWidth,
                        variants: ['select'],
                        anchor: this.refs.main,
                        useLayerMask: false,
                        open: this.state.open,
                        onRequestClose: this.hideOptions },
                    this.renderOptions()
                )
            );
        };

        return Select;
    }(_InputComponent3['default']);

    exports['default'] = Select;


    Select.displayName = 'Select';

    Select.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        placeholder: _react.PropTypes.string,
        children: _react.PropTypes.node.isRequired,
        layerArchor: _react.PropTypes.oneOf(_Popover.alignments),
        mainArchor: _react.PropTypes.oneOf(_Popover.alignments),
        maxHeight: _react.PropTypes.number,
        autoWidth: _react.PropTypes.bool
    });

    Select.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        placeholder: '请选择',
        layerArchor: 'tl',
        mainArchor: 'tl',
        autoWidth: false
    });

    Select.childContextTypes = _InputComponent3['default'].childContextTypes;
    Select.contextTypes = _InputComponent3['default'].contextTypes;

    /**
     * 生成 Select 的选项
     *
     * @param  {Array<{disabled: boolean, name: string, value: string}>} dataSource 数据
     * @return {Array<ReactElement>}
     */
    function createOptions(dataSource) {

        return dataSource.map(function (option, index) {
            var disabled = option.disabled,
                value = option.value,
                name = option.name;


            return _react2['default'].createElement('option', {
                key: value,
                disabled: disabled,
                value: value,
                label: name });
        });
    }

    Select.createOptions = createOptions;

    exports.Option = _Option2['default'];
    exports.OptionGroup = _OptionGroup2['default'];
});
//# sourceMappingURL=Select.js.map
