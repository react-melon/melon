(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'melon-core/classname/cxBuilder', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('melon-core/classname/cxBuilder'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.cxBuilder, global.babelHelpers);
        global.Item = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = BreadcrumbItem;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    /**
     * @file melon/breadcrumb/item
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('BreadcrumbItem');

    /**
     * 面包屑项
     *
     * @class
     * @param {*} props 属性
     */
    function BreadcrumbItem(props) {
        var level = props.level,
            rest = babelHelpers.objectWithoutProperties(props, ['level']);


        return _react2['default'].createElement('a', babelHelpers['extends']({}, rest, {
            'data-level': level,
            className: cx(props).addVariants('level-' + level).build() }));
    }

    BreadcrumbItem.propTypes = {
        href: _propTypes2['default'].string
    };
});
//# sourceMappingURL=Item.js.map
