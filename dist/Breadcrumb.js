/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './breadcrumb/Item', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./breadcrumb/Item'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Item, global.babelHelpers);
        global.Breadcrumb = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Item, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Breadcrumb;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Item2 = babelHelpers.interopRequireDefault(_Item);

    /**
     * @file melon/Breadcrumb
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Breadcrumb');

    /* eslint-disable fecs-prefer-class */
    function Breadcrumb(props) {
        var children = props.children;
        var rest = babelHelpers.objectWithoutProperties(props, ['children']);


        return _react2['default'].createElement(
            'div',
            babelHelpers['extends']({}, rest, { className: cx(props).build() }),
            _react2['default'].Children.map(children, function (child, index) {
                return child && child.type === _Item2['default'] ? _react2['default'].cloneElement(child, {
                    key: index,
                    level: index
                }) : null;
            })
        );
    }
    /* eslint-enable fecs-prefer-class */

    Breadcrumb.Item = _Item2['default'];

    Breadcrumb.createCrumbs = function (crumbs) {

        return crumbs.map(function (crumb, index) {
            var text = crumb.text;
            var rest = babelHelpers.objectWithoutProperties(crumb, ['text']);


            return _react2['default'].createElement(
                _Item2['default'],
                babelHelpers['extends']({}, rest, {
                    key: index,
                    level: index }),
                text
            );
        });
    };
});