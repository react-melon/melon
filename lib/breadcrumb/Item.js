(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.babelHelpers);
        global.Item = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = BreadcrumbItem;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file melon/breadcrumb/item
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('BreadcrumbItem');

    function BreadcrumbItem(props) {
        return _react2['default'].createElement('a', babelHelpers['extends']({}, props, { className: cx(props).build() }));
    }

    BreadcrumbItem.propTypes = {
        href: _react2['default'].PropTypes.string
    };
});
//# sourceMappingURL=Item.js.map
