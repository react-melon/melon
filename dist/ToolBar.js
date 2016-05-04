/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './common/util/cxBuilder', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./common/util/cxBuilder'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.babelHelpers);
        global.ToolBar = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = ToolBar;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file ToolBar
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('ToolBar');

    function ToolBar(props) {
        var children = props.children;


        return _react2['default'].createElement(
            'div',
            { className: cx(props).build() },
            children
        );
    }
});