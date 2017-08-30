(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'melon-core/classname/cxBuilder', '../Icon', '../ripples/TouchRipple', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('melon-core/classname/cxBuilder'), require('../Icon'), require('../ripples/TouchRipple'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.cxBuilder, global.Icon, global.TouchRipple, global.babelHelpers);
        global.Item = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _cxBuilder, _Icon, _TouchRipple, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _TouchRipple2 = babelHelpers.interopRequireDefault(_TouchRipple);

    /**
     * @file Navigation Item
     * @author leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('NavigationItem');

    var NavigationItem = function (_Component) {
        babelHelpers.inherits(NavigationItem, _Component);

        function NavigationItem() {
            babelHelpers.classCallCheck(this, NavigationItem);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        NavigationItem.prototype.renderIcon = function renderIcon(icon) {
            return typeof icon === 'string' ? _react2['default'].createElement(_Icon2['default'], { icon: icon }) : icon;
        };

        NavigationItem.prototype.render = function render() {
            var _props = this.props,
                children = _props.children,
                label = _props.label,
                leftIcon = _props.leftIcon,
                rightIcon = _props.rightIcon,
                onClick = _props.onClick,
                href = _props.href,
                active = _props.active,
                level = _props.level;


            children = _react.Children.toArray(children);

            var className = cx(this.props).addStates({ active: active }).addVariants(['level-' + level]).build();

            if (children && children.length) {
                return _react2['default'].createElement(
                    'div',
                    {
                        className: className,
                        onClick: onClick },
                    children
                );
            }

            leftIcon = this.renderIcon(leftIcon);
            rightIcon = this.renderIcon(rightIcon);
            label = _react2['default'].createElement(
                'span',
                { className: cx.getPartClassName('label') },
                label
            );
            var touchableClassName = cx.getPartClassName('touchable');

            if (href) {
                return _react2['default'].createElement(
                    'div',
                    { className: className },
                    _react2['default'].createElement(
                        'a',
                        {
                            href: href,
                            onClick: onClick,
                            className: touchableClassName },
                        leftIcon,
                        label,
                        rightIcon,
                        _react2['default'].createElement(_TouchRipple2['default'], null)
                    )
                );
            }

            return _react2['default'].createElement(
                'div',
                { className: className },
                _react2['default'].createElement(
                    'div',
                    { onClick: onClick, className: touchableClassName },
                    leftIcon,
                    label,
                    rightIcon,
                    _react2['default'].createElement(_TouchRipple2['default'], null)
                )
            );
        };

        return NavigationItem;
    }(_react.Component);

    exports['default'] = NavigationItem;


    NavigationItem.propTypes = {
        label: _propTypes2['default'].string,
        leftIcon: _propTypes2['default'].node,
        rightIcon: _propTypes2['default'].node,
        onClick: _propTypes2['default'].func,
        level: _propTypes2['default'].number
    };
});
//# sourceMappingURL=Item.js.map
