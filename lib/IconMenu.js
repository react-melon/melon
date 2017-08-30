(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', './Button', './Icon', './Menu', './Popover', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('./Button'), require('./Icon'), require('./Menu'), require('./Popover'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.Button, global.Icon, global.Menu, global.Popover, global.babelHelpers);
        global.IconMenu = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _Button, _Icon, _Menu, _Popover, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _Button2 = babelHelpers.interopRequireDefault(_Button);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _Menu2 = babelHelpers.interopRequireDefault(_Menu);

    var _Popover2 = babelHelpers.interopRequireDefault(_Popover);

    var IconMenu = function (_Component) {
        babelHelpers.inherits(IconMenu, _Component);

        function IconMenu(props, context) {
            babelHelpers.classCallCheck(this, IconMenu);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props, context));

            _this.onClose = _this.onClose.bind(_this);
            _this.onOpen = _this.onOpen.bind(_this);
            _this.state = {
                open: false
            };
            return _this;
        }

        IconMenu.prototype.onOpen = function onOpen() {
            this.setState({
                open: true
            });
        };

        IconMenu.prototype.onClose = function onClose() {
            this.setState({
                open: false
            });
        };

        IconMenu.prototype.render = function render() {
            var _props = this.props,
                icon = _props.icon,
                children = _props.children,
                style = _props.style,
                maxHeight = _props.maxHeight;


            return _react2['default'].createElement(
                'div',
                { className: 'ui-icon-menu', ref: 'main', style: style },
                _react2['default'].createElement(
                    _Button2['default'],
                    { onClick: this.onOpen },
                    _react2['default'].createElement(_Icon2['default'], { icon: icon })
                ),
                _react2['default'].createElement(
                    _Popover2['default'],
                    {
                        autoWidth: true,
                        maxHeight: maxHeight,
                        open: this.state.open,
                        anchor: this.refs.main,
                        onRequestClose: this.onClose },
                    _react2['default'].createElement(
                        _Menu2['default'],
                        { onClose: this.onClose },
                        children
                    )
                )
            );
        };

        return IconMenu;
    }(_react.Component);

    exports['default'] = IconMenu;


    IconMenu.propTypes = {
        icon: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].element]),
        children: _propTypes2['default'].arrayOf(_propTypes2['default'].element),
        maxHeight: _propTypes2['default'].number
    };
});
//# sourceMappingURL=IconMenu.js.map
