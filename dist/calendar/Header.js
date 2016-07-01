/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../common/util/date', 'melon-core/classname/cxBuilder', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../common/util/date'), require('melon-core/classname/cxBuilder'), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.date, global.cxBuilder, global.babelHelpers);
        global.Header = mod.exports;
    }
})(this, function (exports, _react, _date, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = CalendarHeader;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var DateTime = babelHelpers.interopRequireWildcard(_date);

    /**
     * @file Calendar/CalendarHeader
     * @author cxtom(cxtom2010@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('CalendarHeader');

    function CalendarHeader(props) {
        var date = props.date;
        var rest = babelHelpers.objectWithoutProperties(props, ['date']);


        var year = date.getFullYear();

        var week = DateTime.getDayOfWeek(date);
        var month = DateTime.getShortMonth(date);
        var day = date.getDate();

        var fullDate = month + day + '日';

        return _react2['default'].createElement(
            'div',
            babelHelpers['extends']({}, rest, {
                className: cx(props).build() }),
            _react2['default'].createElement(
                'p',
                { className: cx().part('year').build() },
                year
            ),
            _react2['default'].createElement(
                'p',
                { className: cx().part('week').build() },
                week
            ),
            _react2['default'].createElement(
                'p',
                { className: cx().part('date').build() },
                fullDate
            )
        );
    }

    CalendarHeader.displayName = 'CalendarHeader';

    CalendarHeader.propTypes = {
        date: _react.PropTypes.object.isRequired
    };
});