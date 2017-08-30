(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', './navigtaion/Item', './navigtaion/Header', './Divider', 'melon-core/classname/cxBuilder', './Icon', './Zippy', './ripples/TouchRipple', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('./navigtaion/Item'), require('./navigtaion/Header'), require('./Divider'), require('melon-core/classname/cxBuilder'), require('./Icon'), require('./Zippy'), require('./ripples/TouchRipple'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.Item, global.Header, global.Divider, global.cxBuilder, global.Icon, global.Zippy, global.TouchRipple, global.babelHelpers);
        global.Navigation = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _Item, _Header, _Divider, _cxBuilder, _Icon, _Zippy, _TouchRipple, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = exports.NavigationHeader = exports.NavigationItem = undefined;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _Item2 = babelHelpers.interopRequireDefault(_Item);

    var _Header2 = babelHelpers.interopRequireDefault(_Header);

    var _Divider2 = babelHelpers.interopRequireDefault(_Divider);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _Zippy2 = babelHelpers.interopRequireDefault(_Zippy);

    var _TouchRipple2 = babelHelpers.interopRequireDefault(_TouchRipple);

    /**
     * @file Navigation
     * @author leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('Navigation');

    var Navigation = function (_Component) {
        babelHelpers.inherits(Navigation, _Component);

        function Navigation(props, context) {
            babelHelpers.classCallCheck(this, Navigation);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props, context));

            _this.onToggle = _this.onToggle.bind(_this);
            _this.state = {
                open: props.open
            };
            return _this;
        }

        Navigation.prototype.onToggle = function onToggle() {
            var _this2 = this;

            var _props = this.props,
                onClose = _props.onClose,
                onOpen = _props.onOpen,
                openable = _props.openable;


            if (!openable) {
                return;
            }

            this.setState({
                open: !this.state.open
            }, function () {
                var handler = _this2.state.open ? onOpen : onClose;
                handler && handler();
            });
        };

        Navigation.prototype.render = function render() {
            var _props2 = this.props,
                label = _props2.label,
                children = _props2.children,
                icon = _props2.icon,
                level = _props2.level;


            if (typeof icon === 'string') {
                icon = _react2['default'].createElement(_Icon2['default'], { name: icon });
            }

            if (children) {
                children = _react.Children.toArray(children).filter(function (child) {
                    return child.type === _Item2['default'] || child.type === _Header2['default'] || child.type === _Divider2['default'] || child.type === Navigation;
                }).map(function (child) {
                    return child.type === Navigation ? (0, _react.cloneElement)(child, { level: level + 1 }) : child.type === _Item2['default'] ? (0, _react.cloneElement)(child, { level: level }) : child;
                });
            }

            if (label && level > 0) {
                label = _react2['default'].createElement(
                    'div',
                    {
                        onClick: this.onToggle,
                        className: cx.getPartClassName('touchable') },
                    icon,
                    _react2['default'].createElement(
                        'span',
                        { className: cx.getPartClassName('label') },
                        label
                    ),
                    _react2['default'].createElement(_TouchRipple2['default'], null)
                );
                children = _react2['default'].createElement(
                    _Zippy2['default'],
                    {
                        direction: 'vertical',
                        style: { transformOrigin: level + 'em top' },
                        expand: this.state.open },
                    children
                );
            }

            var className = cx(this.props).addVariants(['level-' + level]).build();

            return _react2['default'].createElement(
                'div',
                { className: className },
                label,
                children
            );
        };

        return Navigation;
    }(_react.Component);

    Navigation.propTypes = {
        icon: _propTypes2['default'].node,
        open: _propTypes2['default'].bool,
        openable: _propTypes2['default'].bool,
        onOpen: _propTypes2['default'].func,
        onClose: _propTypes2['default'].func,
        label: _propTypes2['default'].string,
        active: _propTypes2['default'].bool,
        level: _propTypes2['default'].number
    };

    /* eslint-disable fecs-valid-map-set */
    Navigation.defaultProps = {
        openable: true,
        open: true,
        level: 0
    };
    /* eslint-enable fecs-valid-map-set */

    exports.NavigationItem = _Item2['default'];
    exports.NavigationHeader = _Header2['default'];
    exports.default = Navigation;
});
//# sourceMappingURL=Navigation.js.map
