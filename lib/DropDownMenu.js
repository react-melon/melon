(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Menu', './Popover', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Menu'), require('./Popover'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Menu, global.Popover, global.cxBuilder, global.babelHelpers);
        global.DropDownMenu = mod.exports;
    }
})(this, function (exports, _react, _Menu, _Popover, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Menu2 = babelHelpers.interopRequireDefault(_Menu);

    var _Popover2 = babelHelpers.interopRequireDefault(_Popover);

    /**
     * @file DropDownMenu
     * @author leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('DropDownMenu');

    var DropDownMenu = function (_Component) {
        babelHelpers.inherits(DropDownMenu, _Component);

        function DropDownMenu(props, context) {
            babelHelpers.classCallCheck(this, DropDownMenu);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props, context));

            _this.onClose = _this.onClose.bind(_this);
            _this.onOpen = _this.onOpen.bind(_this);
            _this.state = {
                open: false
            };
            return _this;
        }

        DropDownMenu.prototype.onOpen = function onOpen() {
            this.setState({
                open: true
            });
        };

        DropDownMenu.prototype.onClose = function onClose() {
            this.setState({
                open: false
            });
        };

        DropDownMenu.prototype.render = function render() {
            var _props = this.props,
                label = _props.label,
                children = _props.children,
                maxHeight = _props.maxHeight,
                style = _props.style,
                anchorAlignment = _props.anchorAlignment,
                layerAlignment = _props.layerAlignment,
                anchorOffset = _props.anchorOffset,
                layerOffset = _props.layerOffset;


            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).build(),
                    ref: 'main',
                    style: style,
                    onClick: this.onOpen },
                label,
                _react2['default'].createElement(
                    _Popover2['default'],
                    {
                        autoWidth: true,
                        maxHeight: maxHeight,
                        open: this.state.open,
                        anchor: this.refs.main,
                        onRequestClose: this.onClose,
                        anchorOffset: anchorOffset,
                        layerOffset: layerOffset,
                        anchorAlignment: anchorAlignment,
                        layerAlignment: layerAlignment },
                    _react2['default'].createElement(
                        _Menu2['default'],
                        { onClose: this.onClose },
                        children
                    )
                )
            );
        };

        return DropDownMenu;
    }(_react.Component);

    exports['default'] = DropDownMenu;


    DropDownMenu.propTypes = {
        label: _react.PropTypes.element.isRequired,
        maxHeight: _react.PropTypes.number
    };
});
//# sourceMappingURL=DropDownMenu.js.map
