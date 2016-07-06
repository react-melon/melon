/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.babelHelpers);
        global.Link = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Link;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file melon/Link
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Link');

    /* eslint-disable fecs-prefer-class */

    function Link(props) {

        return _react2['default'].createElement('a', babelHelpers['extends']({}, props, { className: cx(props).build() }));
    }

    /* eslint-enable fecs-prefer-class */
});