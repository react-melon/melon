/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../common/util/cxBuilder', './Day', '../common/util/date', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../common/util/cxBuilder'), require('./Day'), require('../common/util/date'), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Day, global.date, global.babelHelpers);
        global.Month = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Day, _date, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Day2 = babelHelpers.interopRequireDefault(_Day);

    var DateTime = babelHelpers.interopRequireWildcard(_date);

    /**
     * @file CalendarMonth
     * @author cxtom(cxtom2010@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('CalendarMonth');

    var CalendarMonth = function (_Component) {
        babelHelpers.inherits(CalendarMonth, _Component);

        function CalendarMonth(props) {
            babelHelpers.classCallCheck(this, CalendarMonth);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onClick = _this.onClick.bind(_this);
            return _this;
        }

        CalendarMonth.prototype.onClick = function onClick(e) {
            var onChange = this.props.onChange;
            if (onChange) {
                onChange({
                    target: this,
                    date: e.date
                });
            }
        };

        CalendarMonth.prototype.renderWeekHeader = function renderWeekHeader() {
            var days = this.props.lang.days.split(',');

            return _react2['default'].createElement(
                'div',
                { className: cx().part('weekheader').build() },
                days.map(function (day, index) {
                    return _react2['default'].createElement(
                        'span',
                        { key: day },
                        day
                    );
                })
            );
        };

        CalendarMonth.prototype.renderDates = function renderDates() {
            var props = this.props;
            var month = props.month;

            var weekArray = DateTime.getFullWeekArray(month);

            var weeks = [];
            var len = weekArray.length;

            weeks.push(this.renderDay(weekArray[0], ['pre-month']));
            weeks[0] = weeks[0].concat(this.renderDay(weekArray[1], []));

            for (var i = 2; i < len - 1; i++) {
                weeks.push(this.renderDay(weekArray[i], []));
            }

            weeks[len - 3] = weeks[len - 3].concat(this.renderDay(weekArray[len - 1], ['next-month']));

            return _react2['default'].createElement(
                'ul',
                null,
                weeks.map(this.renderWeek)
            );
        };

        CalendarMonth.prototype.renderWeek = function renderWeek(week, index) {

            return _react2['default'].createElement(
                'li',
                { key: index, className: cx().part('week').build() },
                week
            );
        };

        CalendarMonth.prototype.renderDay = function renderDay(arr, variants) {
            var _this2 = this;

            var _props = this.props;
            var date = _props.date;
            var minDate = _props.minDate;
            var maxDate = _props.maxDate;


            return arr.map(function (day, index) {

                var selected = DateTime.isEqualDate(day, date);
                var disabled = DateTime.isDate(minDate) && DateTime.isBeforeDate(day, minDate) || DateTime.isDate(maxDate) && DateTime.isAfterDate(day, maxDate);

                return _react2['default'].createElement(_Day2['default'], {
                    key: day,
                    date: day,
                    variants: variants,
                    disabled: disabled,
                    selected: selected,
                    onClick: _this2.onClick });
            });
        };

        CalendarMonth.prototype.render = function render() {

            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).build() },
                this.renderWeekHeader(),
                this.renderDates()
            );
        };

        return CalendarMonth;
    }(_react.Component);

    exports['default'] = CalendarMonth;


    CalendarMonth.displayName = 'CalendarMonth';

    CalendarMonth.propTypes = {
        date: _react.PropTypes.object.isRequired,
        month: _react.PropTypes.object.isRequired,
        maxDate: _react.PropTypes.object,
        minDate: _react.PropTypes.object,
        onChange: _react.PropTypes.func,
        lang: _react.PropTypes.shape({
            week: _react.PropTypes.string,
            days: _react.PropTypes.string,
            title: _react.PropTypes.string
        }).isRequired
    };
});