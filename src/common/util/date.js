/**
 * @file melon date tools
 * @author cxtom(cxtom2010@gmail.com)
 */

import moment from 'moment';

/**
 * 是否为 Date 实例
 *
 * @param {Date} date 一个对象
 * @return {boolean}
 */
export function isDate(date) {
    return date instanceof Date;
}

/**
 * 增加N天后的日期
 *
 * @param  {Date}   d    日期对象
 * @param  {number} days 增加的天数
 * @return {Date}   修改后的日期
 */
export function addDays(d, days) {
    if (days === 0) {
        return d;
    }
    return moment(d).add(days, 'days').toDate();
}

/**
 * 增加N月后的日期
 *
 * @param  {Date}   d      日期对象
 * @param  {number} months 增加的月份数
 * @return {Date}   修改后的日期对象
 */
export function addMonths(d, months) {
    return moment(d).add(months, 'months').toDate();
}

/**
 * 增加N年后的日期
 *
 * @param  {Date}   d     日期对象
 * @param  {number} years 增加的年数
 * @return {Date}   修改后的日期对象
 */
export function addYears(d, years) {
    return moment(d).add(years, 'years').toDate();
}

/**
 * 获取某一月的天数
 *
 * @param  {Date} d   日期
 * @return {number}   当月的天数
 */
export function getDaysInMonth(d) {
    const resultDate = this.getFirstDayOfMonth(d);

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
export function getFirstDayOfMonth(d) {
    return moment(d).date(1).toDate();
}

export function getShortMonth(d) {
    const month = d.getMonth();
    return (month + 1) + '月';
}

export function getDayOfWeek(d) {
    const dow = d.getDay();
    const lang = ['日', '一', '二', '三', '四', '五', '六'];
    return '星期' + lang[dow];
}

/**
 * 得到某一月所有天数按周组成若干个数组
 * 第一周和最后一周不在本月的天数
 *
 * @param  {Date} d 日期
 * @return {Array}  数据
 */
export function getFullWeekArray(d) {

    const daysInMonth = this.getDaysInMonth(d);
    const firstDay = this.getFirstDayOfMonth(d);

    const firstDayOfWeek = moment(firstDay).day();

    let days = [];
    let i;

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

    const lastDay = days[days.length - 1].date;
    const lastDayOfWeek = moment(lastDay).day();

    if (lastDayOfWeek < 7) {
        for (i = 0; i < 6 - lastDayOfWeek; i++) {
            days.push({
                date: this.addDays(lastDay, i + 1),
                variants: 'next-month'
            });
        }
    }

    let weeks = [];

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
export function parse(value, format) {
    return moment(value, format).toDate();
}

/**
 * 日期转字符串
 *
 * @param  {Date}   date   日期
 * @param  {string} format 转换格式
 * @return {string}        转换以后的日期
 */
export function format(date, format) {
    return moment(date).format(format);
}

/**
 * 判断两个日期对象是否为同一天
 *
 * @param  {Date}  d1 日期1
 * @param  {Date}  d2 日期2
 * @return {boolean}  是否为同一天
 */
export function isEqualDate(d1, d2) {
    return moment(d1).isSame(d2, 'date')
        && moment(d1).isSame(d2, 'month')
        && moment(d1).isSame(d2, 'year');
}

/**
 * 判断两个日期对象的大小
 *
 * @param  {Date}  d1 日期1
 * @param  {Date}  d2 日期2
 * @return {boolean}  d1 < d2
 */
export function isBeforeDate(d1, d2) {
    return moment(d1).isBefore(d2, 'date');
}

/**
 * 判断两个日期对象的大小
 *
 * @param  {Date}  d1 日期1
 * @param  {Date}  d2 日期2
 * @return {boolean}  d1 > d2
 */
export function isAfterDate(d1, d2) {
    return moment(d1).isAfter(d2, 'date');
}

export function isEqualMonth(d1, d2) {
    return moment(d1).isSame(d2, 'month')
        && moment(d1).isSame(d2, 'year');
}


export function isBeforeMonth(d1, d2) {
    return moment(d1).isBefore(d2, 'month');
}

export function isAfterMonth(d1, d2) {
    return moment(d1).isAfter(d2, 'month');
}

/**
 * 判断日期之间相差的月数
 *
 * @param  {Date}  d1 日期1
 * @param  {Date}  d2 日期2
 * @return {number} 相差的月数
 */
export function monthDiff(d1, d2) {
    let m = (d1.getFullYear() - d2.getFullYear()) * 12;
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
export function yearDiff(d1, d2) {
    return ~~(this.monthDiff(d1, d2) / 12);
}
