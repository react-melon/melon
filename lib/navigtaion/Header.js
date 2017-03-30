(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../Title', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../Title'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Title, global.babelHelpers);
        global.Header = mod.exports;
    }
})(this, function (exports, _react, _Title, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Title2 = babelHelpers.interopRequireDefault(_Title);

    var NavigationHeader = function (_Component) {
        babelHelpers.inherits(NavigationHeader, _Component);

        function NavigationHeader() {
            babelHelpers.classCallCheck(this, NavigationHeader);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        NavigationHeader.prototype.render = function render() {
            var _props = this.props,
                children = _props.children,
                _props$variants = _props.variants,
                variants = _props$variants === undefined ? [] : _props$variants,
                rest = babelHelpers.objectWithoutProperties(_props, ['children', 'variants']);


            return _react2['default'].createElement(
                _Title2['default'],
                babelHelpers['extends']({}, rest, {
                    level: 4,
                    variants: [].concat(variants, ['navigation-header']) }),
                children
            );
        };

        return NavigationHeader;
    }(_react.Component);

    exports['default'] = NavigationHeader;
});
//# sourceMappingURL=Header.js.map
