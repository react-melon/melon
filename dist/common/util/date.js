/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'moment', "../../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('moment'), require("../../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.moment, global.babelHelpers);
        global.date = mod.exports;
    }
})(this, function (exports, _moment, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.isDate = isDate;
    exports.addDays = addDays;
    exports.addMonths = addMonths;
    exports.addYears = addYears;
    exports.getDaysInMonth = getDaysInMonth;
    exports.getFirstDayOfMonth = getFirstDayOfMonth;
    exports.getShortMonth = getShortMonth;
    exports.getDayOfWeek = getDayOfWeek;
    exports.getFullWeekArray = getFullWeekArray;
    exports.parse = parse;
    exports.format = format;
    exports.isEqualDate = isEqualDate;
    exports.isBeforeDate = isBeforeDate;
    exports.isAfterDate = isAfterDate;
    exports.isEqualMonth = isEqualMonth;
    exports.isBeforeMonth = isBeforeMonth;
    exports.isAfterMonth = isAfterMonth;
    exports.monthDiff = monthDiff;
    exports.yearDiff = yearDiff;

    var _moment2 = babelHelpers.interopRequireDefault(_moment);

    /**
     * 是否为 Date 实例
     *
     * @param {Date} date 一个对象
     * @return {boolean}
     */

    /**
     * @file melon date tools
     * @author cxtom(cxtom2010@gmail.com)
     */

    function isDate(date) {
        return date instanceof Date;
    }

    /**
     * 增加N天后的日期
     *
     * @param  {Date}   d    日期对象
     * @param  {number} days 增加的天数
     * @return {Date}   修改后的日期
     */
    function addDays(d, days) {
        if (days === 0) {
            return d;
        }
        return (0, _moment2['default'])(d).add(days, 'days').toDate();
    }

    /**
     * 增加N月后的日期
     *
     * @param  {Date}   d      日期对象
     * @param  {number} months 增加的月份数
     * @return {Date}   修改后的日期对象
     */
    function addMonths(d, months) {
        return (0, _moment2['default'])(d).add(months, 'months').toDate();
    }

    /**
     * 增加N年后的日期
     *
     * @param  {Date}   d     日期对象
     * @param  {number} years 增加的年数
     * @return {Date}   修改后的日期对象
     */
    function addYears(d, years) {
        return (0, _moment2['default'])(d).add(years, 'years').toDate();
    }

    /**
     * 获取某一月的天数
     *
     * @param  {Date} d   日期
     * @return {number}   当月的天数
     */
    function getDaysInMonth(d) {
        var resultDate = this.getFirstDayOfMonth(d);

        resultDate.setMonth(resultDate.getMonth() + 1);
        resultDate.setDate(resultDate.getDate() - 1);

        return resultDate.getDate();
    }

    /**
     * 获取某月第一天的日期对象
     *
     * @param  {Date} d Date对象
     * @return {Date}   当月第一天日期
     */
    function getFirstDayOfMonth(d) {
        return (0, _moment2['default'])(d).date(1).toDate();
    }

    function getShortMonth(d) {
        var month = d.getMonth();
        return month + 1 + '月';
    }

    function getDayOfWeek(d) {
        var dow = d.getDay();
        var lang = ['日', '一', '二', '三', '四', '五', '六'];
        return '星期' + lang[dow];
    }

    /**
     * 得到某一月所有天数按周组成若干个数组
     * 第一周和最后一周不在本月的天数
     *
     * @param  {Date} d 日期
     * @return {Array}  数据
     */
    function getFullWeekArray(d) {

        var daysInMonth = this.getDaysInMonth(d);
        var firstDay = this.getFirstDayOfMonth(d);

        var firstDayOfWeek = (0, _moment2['default'])(firstDay).day();

        var days = [];
        var i = void 0;

        if (firstDayOfWeek > 1) {
            for (i = firstDayOfWeek - 1; i >= 0; i--) {
                days.push({
                    date: this.addDays(firstDay, -(i + 1)),
                    variants: 'pre-month'
                });
            }
        }

        for (i = 0; i < daysInMonth; i++) {
            days.push({
                date: this.addDays(firstDay, i)
            });
        }

        var lastDay = days[days.length - 1].date;
        var lastDayOfWeek = (0, _moment2['default'])(lastDay).day();

        if (lastDayOfWeek < 7) {
            for (i = 0; i < 6 - lastDayOfWeek; i++) {
                days.push({
                    date: this.addDays(lastDay, i + 1),
                    variants: 'next-month'
                });
            }
        }

        var weeks = [];

        for (i = 0; i < days.length / 7; i++) {
            weeks.push(days.slice(i * 7, (i + 1) * 7));
        }

        return weeks;
    }

    /**
     * 字符串转日期
     *
     * @param  {string} value  日期字符串
     * @param  {string} format 转换格式
     * @return {Date}          Date对象
     */
    function parse(value, format) {
        return (0, _moment2['default'])(value, format).toDate();
    }

    /**
     * 日期转字符串
     *
     * @param  {Date}   date   日期
     * @param  {string} format 转换格式
     * @return {string}        转换以后的日期
     */
    function format(date, format) {
        return (0, _moment2['default'])(date).format(format);
    }

    /**
     * 判断两个日期对象是否为同一天
     *
     * @param  {Date}  d1 日期1
     * @param  {Date}  d2 日期2
     * @return {boolean}  是否为同一天
     */
    function isEqualDate(d1, d2) {
        return (0, _moment2['default'])(d1).isSame(d2, 'date') && (0, _moment2['default'])(d1).isSame(d2, 'month') && (0, _moment2['default'])(d1).isSame(d2, 'year');
    }

    /**
     * 判断两个日期对象的大小
     *
     * @param  {Date}  d1 日期1
     * @param  {Date}  d2 日期2
     * @return {boolean}  d1 < d2
     */
    function isBeforeDate(d1, d2) {
        return (0, _moment2['default'])(d1).isBefore(d2, 'date');
    }

    /**
     * 判断两个日期对象的大小
     *
     * @param  {Date}  d1 日期1
     * @param  {Date}  d2 日期2
     * @return {boolean}  d1 > d2
     */
    function isAfterDate(d1, d2) {
        return (0, _moment2['default'])(d1).isAfter(d2, 'date');
    }

    function isEqualMonth(d1, d2) {
        return (0, _moment2['default'])(d1).isSame(d2, 'month') && (0, _moment2['default'])(d1).isSame(d2, 'year');
    }

    function isBeforeMonth(d1, d2) {
        return (0, _moment2['default'])(d1).isBefore(d2, 'month');
    }

    function isAfterMonth(d1, d2) {
        return (0, _moment2['default'])(d1).isAfter(d2, 'month');
    }

    /**
     * 判断日期之间相差的月数
     *
     * @param  {Date}  d1 日期1
     * @param  {Date}  d2 日期2
     * @return {number} 相差的月数
     */
    function monthDiff(d1, d2) {
        var m = (d1.getFullYear() - d2.getFullYear()) * 12;
        m += d1.getMonth();
        m -= d2.getMonth();
        return m;
    }

    /**
     * 判断日期之间相差的年数
     *
     * @param  {Date}  d1 日期1
     * @param  {Date}  d2 日期2
     * @return {number} 相差的年数
     */
    function yearDiff(d1, d2) {
        return ~ ~(this.monthDiff(d1, d2) / 12);
    }
});