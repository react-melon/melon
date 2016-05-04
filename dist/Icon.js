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
        global.Icon = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Icon;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file melon/Icon
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Icon');

    /* eslint-disable fecs-prefer-class */
    function Icon(props) {
        var icon = props.icon;
        var rest = babelHelpers.objectWithoutProperties(props, ['icon']);


        return _react2['default'].createElement('i', babelHelpers['extends']({}, rest, { 'data-icon': icon, className: cx(props).build() }));
    }
    /* eslint-enable fecs-prefer-class */

    Icon.propTypes = {
        icon: _react.PropTypes.string.isRequired
    };

    Icon.displayName = 'Icon';
});