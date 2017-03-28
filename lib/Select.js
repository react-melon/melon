(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Icon', 'melon-core/InputComponent', './select/OptionGroup', './select/Option', 'melon-core/classname/cxBuilder', './Layer', 'dom-align', 'react-motion', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Icon'), require('melon-core/InputComponent'), require('./select/OptionGroup'), require('./select/Option'), require('melon-core/classname/cxBuilder'), require('./Layer'), require('dom-align'), require('react-motion'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Icon, global.InputComponent, global.OptionGroup, global.Option, global.cxBuilder, global.Layer, global.domAlign, global.reactMotion, global.babelHelpers);
        global.Select = mod.exports;
    }
})(this, function (exports, _react, _Icon, _InputComponent2, _OptionGroup, _Option, _cxBuilder, _Layer, _domAlign, _reactMotion, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.createOptions = createOptions;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _OptionGroup2 = babelHelpers.interopRequireDefault(_OptionGroup);

    var _Option2 = babelHelpers.interopRequireDefault(_Option);

    var _Layer2 = babelHelpers.interopRequireDefault(_Layer);

    var _domAlign2 = babelHelpers.interopRequireDefault(_domAlign);

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

            return _this;
        }

        Select.prototype.componentDidUpdate = function componentDidUpdate() {

            if (this.state.open && this.layer && this.main) {
                var _props = this.props,
                    mainArchor = _props.mainArchor,
                    layerArchor = _props.layerArchor;


                (0, _domAlign2['default'])(this.layer, this.main, {
                    points: [layerArchor, mainArchor],
                    overflow: {
                        adjustX: true,
                        adjustY: true
                    }
                });
            }
        };

        Select.prototype.componentWillUnmount = function componentWillUnmount() {

            if (this.closeingTimer) {
                clearTimeout(this.closeingTimer);
            }
        };

        Select.prototype.onClick = function onClick() {
            var _props2 = this.props,
                disabled = _props2.disabled,
                readOnly = _props2.readOnly;


            if (disabled || readOnly) {
                return;
            }

            var open = this.state.open;

            if (open) {
                this.hideOptions();
            } else {
                this.setState({
                    open: true
                });
            }
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

        Select.prototype.renderOptions = function renderOptions() {
            var _this2 = this;

            var children = _react.Children.map(this.props.children, this.renderItem, this);

            var className = cx.getPartClassName('popup');
            var _state = this.state,
                open = _state.open,
                closing = _state.closing;

            var begin = open && !closing ? 0 : 1;
            var end = open && !closing ? 1 : 0;

            return _react2['default'].createElement(
                _reactMotion.Motion,
                {
                    defaultStyle: {
                        opacity: begin,
                        scale: begin
                    },
                    style: {
                        opacity: (0, _reactMotion.spring)(end),
                        scale: (0, _reactMotion.spring)(end, { stiffness: 260, damping: 20 })
                    } },
                function (_ref) {
                    var scale = _ref.scale,
                        opacity = _ref.opacity;
                    return _react2['default'].createElement(
                        'div',
                        {
                            className: className,
                            style: {
                                opacity: opacity,
                                transform: 'scale(' + scale + ', ' + scale + ')'
                            },
                            ref: function ref(layer) {
                                _this2.layer = layer;
                            } },
                        children
                    );
                }
            );
        };

        Select.prototype.renderItem = function renderItem(child, index) {

            if (!child) {
                return null;
            }

            if (child.type === 'option') {
                return _react2['default'].createElement(_Option2['default'], babelHelpers['extends']({}, child.props, {
                    onClick: this.onClickOption,
                    key: index }));
            }

            if (child.type === 'optgroup') {
                return _react2['default'].createElement(_OptionGroup2['default'], babelHelpers['extends']({}, child.props, {
                    onClick: this.onClickOption,
                    key: index }));
            }

            return null;
        };

        Select.prototype.renderHiddenInput = function renderHiddenInput() {
            var _props3 = this.props,
                name = _props3.name,
                value = _props3.value;


            return name ? _react2['default'].createElement('input', {
                name: name,
                type: 'hidden',
                value: value }) : null;
        };

        Select.prototype.renderLabel = function renderLabel() {

            var value = this.state.value;
            var _props4 = this.props,
                children = _props4.children,
                placeholder = _props4.placeholder;


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

        Select.prototype.hideOptions = function hideOptions() {
            var _this3 = this;

            this.setState({
                closing: true
            });

            this.closeingTimer = setTimeout(function () {

                _this3.setState({
                    open: false,
                    closing: false
                });

                _this3.closeingTimer = null;
            }, 500);
        };

        Select.prototype.render = function render() {
            var _this4 = this;

            var className = cx(this.props).addStates(this.getStyleStates()).build();
            var _state2 = this.state,
                open = _state2.open,
                closing = _state2.closing;


            return _react2['default'].createElement(
                'div',
                {
                    onClick: this.onClick,
                    className: className,
                    ref: function ref(main) {
                        _this4.main = main;
                    } },
                this.renderLabel(),
                this.renderHiddenInput(),
                this.renderIcon(),
                _react2['default'].createElement(_Layer2['default'], {
                    open: open || closing,
                    onClickAway: this.hideOptions,
                    render: this.renderOptions })
            );
        };

        return Select;
    }(_InputComponent3['default']);

    exports['default'] = Select;


    Select.displayName = 'Select';

    var archor = _react.PropTypes.oneOf(['tl', 'tc', 'tr', 'cl', 'cc', 'cr', 'bl', 'bc', 'br']);

    Select.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        placeholder: _react.PropTypes.string,
        children: _react.PropTypes.node.isRequired,
        layerArchor: archor,
        mainArchor: archor
    });

    Select.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        placeholder: '请选择',
        layerArchor: 'tl',
        mainArchor: 'tl'
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

            return _react2['default'].createElement('option', {
                key: index,
                disabled: option.disabled,
                value: option.value,
                label: option.name });
        });
    }

    Select.createOptions = createOptions;
});
//# sourceMappingURL=Select.js.map
