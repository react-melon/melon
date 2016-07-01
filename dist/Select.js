/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', './Icon', './select/SeparatePopup', 'melon-core/Validity', 'melon-core/InputComponent', './select/OptionGroup', './select/Option', 'melon-core/classname/cxBuilder', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('./Icon'), require('./select/SeparatePopup'), require('melon-core/Validity'), require('melon-core/InputComponent'), require('./select/OptionGroup'), require('./select/Option'), require('melon-core/classname/cxBuilder'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.Icon, global.SeparatePopup, global.Validity, global.InputComponent, global.OptionGroup, global.Option, global.cxBuilder, global.babelHelpers);
        global.Select = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _Icon, _SeparatePopup, _Validity, _InputComponent2, _OptionGroup, _Option, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.createOptions = createOptions;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _SeparatePopup2 = babelHelpers.interopRequireDefault(_SeparatePopup);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _OptionGroup2 = babelHelpers.interopRequireDefault(_OptionGroup);

    var _Option2 = babelHelpers.interopRequireDefault(_Option);

    /**
     * @file melon/Select
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Select');

    var Select = function (_InputComponent) {
        babelHelpers.inherits(Select, _InputComponent);

        function Select(props, context) {
            babelHelpers.classCallCheck(this, Select);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            _this.state = babelHelpers['extends']({}, _this.state, {
                open: false
            });

            _this.onClick = _this.onClick.bind(_this);
            _this.onClickOption = _this.onClickOption.bind(_this);
            _this.onPopupHide = _this.onPopupHide.bind(_this);

            return _this;
        }

        Select.prototype.componentDidMount = function componentDidMount() {

            _InputComponent.prototype.componentDidMount.call(this);

            var container = this.container = document.createElement('div');

            container.className = cx().part('popup').build();

            document.body.appendChild(container);

            this.popup = _reactDom2['default'].render(_react2['default'].createElement(
                _SeparatePopup2['default'],
                {
                    target: _reactDom2['default'].findDOMNode(this),
                    open: false,
                    onHide: this.onPopupHide },
                _react.Children.map(this.props.children, this.renderItem, this)
            ), container);
        };

        Select.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            var children = nextProps.children;

            if (children !== this.props.children) {
                this.popup = _reactDom2['default'].render(_react2['default'].createElement(
                    _SeparatePopup2['default'],
                    {
                        target: _reactDom2['default'].findDOMNode(this),
                        open: this.state.open,
                        onHide: this.onPopupHide },
                    _react.Children.map(children, this.renderItem, this)
                ), this.container);
            }

            _InputComponent.prototype.componentWillReceiveProps.call(this, nextProps);
        };

        Select.prototype.componentWillUnmount = function componentWillUnmount() {

            var container = this.container;

            if (container) {
                _reactDom2['default'].unmountComponentAtNode(container);
                container.parentElement.removeChild(container);
                this.container = container = null;
            }
        };

        Select.prototype.showOptions = function showOptions() {
            var _this2 = this;

            this.setState({
                open: true
            }, function () {
                _reactDom2['default'].render(_react2['default'].createElement(
                    _SeparatePopup2['default'],
                    {
                        target: _reactDom2['default'].findDOMNode(_this2),
                        open: true,
                        onHide: _this2.onPopupHide },
                    _react.Children.map(_this2.props.children, _this2.renderItem, _this2)
                ), _this2.container);
            });
        };

        Select.prototype.hideOptions = function hideOptions() {
            var _this3 = this;

            this.setState({
                open: false
            }, function () {
                _reactDom2['default'].render(_react2['default'].createElement(
                    _SeparatePopup2['default'],
                    {
                        target: _reactDom2['default'].findDOMNode(_this3),
                        open: false,
                        onHide: _this3.onPopupHide },
                    _react.Children.map(_this3.props.children, _this3.renderItem, _this3)
                ), _this3.container);
            });
        };

        Select.prototype.onClick = function onClick() {
            var _props = this.props;
            var disabled = _props.disabled;
            var readOnly = _props.readOnly;


            if (disabled || readOnly) {
                return;
            }

            if (this.isOpen()) {
                this.hideOptions();
            } else {
                this.showOptions();
            }
        };

        Select.prototype.onClickOption = function onClickOption(_ref) {
            var value = _ref.value;


            this.hideOptions();

            _InputComponent.prototype.onChange.call(this, {
                type: 'change',
                target: this,
                value: value
            });
        };

        Select.prototype.onPopupHide = function onPopupHide(e) {
            this.hideOptions();
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
            var _props2 = this.props;
            var name = _props2.name;
            var value = _props2.value;


            return name ? _react2['default'].createElement('input', {
                name: name,
                type: 'hidden',
                value: value }) : null;
        };

        Select.prototype.renderLabel = function renderLabel() {

            var value = this.state.value;
            var _props3 = this.props;
            var children = _props3.children;
            var placeholder = _props3.placeholder;


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

        Select.prototype.render = function render() {

            return _react2['default'].createElement(
                'div',
                {
                    onClick: this.onClick,
                    className: cx(this.props).addStates(this.getStyleStates()).build() },
                this.renderLabel(),
                this.renderHiddenInput(),
                this.renderIcon(),
                _react2['default'].createElement(_Validity2['default'], { validity: this.state.validity })
            );
        };

        return Select;
    }(_InputComponent3['default']);

    exports['default'] = Select;


    Select.displayName = 'Select';

    Select.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        placeholder: '请选择',
        defaultValue: ''
    });

    Select.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        placeholder: _react.PropTypes.string,
        children: _react.PropTypes.node.isRequired
    });

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