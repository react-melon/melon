/**
 * @file melon date tools
 * @author cxtom(cxtom2010@gmail.com)
 */

import {compact} from './array';

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
    const newDate = this.clone(d);
    newDate.setDate(d.getDate() + days);
    return newDate;
}

/**
 * 增加N月后的日期
 *
 * @param  {Date}   d      日期对象
 * @param  {number} months 增加的月份数
 * @return {Date}   修改后的日期对象
 */
export function addMonths(d, months) {
    const newDate = this.clone(d);
    newDate.setMonth(d.getMonth() + months);
    return newDate;
}

/**
 * 增加N年后的日期
 *
 * @param  {Date}   d     日期对象
 * @param  {number} years 增加的年数
 * @return {Date}   修改后的日期对象
 */
export function addYears(d, years) {
    const newDate = this.clone(d);
    newDate.setFullYear(d.getFullYear() + years);
    return newDate;
}

/**
 * Date对象的深复制
 *
 * @param  {Date} d Date对象
 * @return {Date}   复制
 */
export function clone(d) {
    return new Date(d.getTime());
}

/**
 * Date对象的深复制，并把时间清零
 *
 * @param  {Date} d Date对象
 * @return {Date}   复制
 */
export function cloneAsDate(d) {
    const clonedDate = this.clone(d);
    clonedDate.setHours(0, 0, 0, 0);
    return clonedDate;
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
    return new Date(d.getFullYear(), d.getMonth(), 1);
}

/**
 * 获取某月最后一天的日期对象
 *
 * @param  {Date} d Date对象
 * @return {Date}   当月最后一天日期
 */
export function getLastDayOfMonth(d) {
    const date = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    return this.addDays(date, -1);
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

    const weekArray = this.getWeekArray(d);
    const firstWeek = weekArray[0] = compact(weekArray[0]);
    const lastWeek = weekArray[weekArray.length - 1];
    const preArray = [];
    const lastArray = [];

    let i = 0;
    let len = 7 - firstWeek.length;
    for (; i < len; i++) {
        preArray.push(this.addDays(firstWeek[0], i - len));
    }

    len = 7 - lastWeek.length;
    for (i = 1; i <= len; i++) {
        lastArray.push(this.addDays(lastWeek[lastWeek.length - 1], i));
    }

    return [].concat([preArray], weekArray, [lastArray]);

}

/**
 * 得到某一月所有天数按周组成若干个数组
 *
 * @param  {Date} d 日期
 * @return {Array}  数据
 */
export function getWeekArray(d) {

    const dayArray = [];
    const daysInMonth = this.getDaysInMonth(d);
    const weekArray = [];

    let week;
    let firstDayOfWeek;
    let emptyDays;
    let daysInWeek;
    let i;

    for (i = 1; i <= daysInMonth; i++) {
        dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
    }

    while (dayArray.length) {
        firstDayOfWeek = dayArray[0].getDay();
        daysInWeek = 7 - firstDayOfWeek;
        emptyDays = 7 - daysInWeek;
        week = dayArray.splice(0, daysInWeek);

        for (i = 0; i < emptyDays; i++) {
            week.unshift(null);
        }

        weekArray.push(week);
    }

    return weekArray;
}

/**
 * 字符串转日期
 *
 * @param  {string} value  日期字符串
 * @param  {string} format 转换格式
 * @return {Date}          Date对象
 */
export function parse(value, format) {

    format = format.split(/[^yMdW]+/i);
    value  = value.split(/\D+/);

    const map = {};

    for (let i = 0, l = format.length; i < l; i++) {
        if (format[i]
            && value[i]
            && (format[i].length > 1
                && value[i].length === format[i].length
                || format[i].length === 1
               )
        ) {
            map[format[i]] = value[i];
        }
    }

    const year  = map.yyyy
        || map.y
        || ((map.yy < 50 ? '20' : '19') + map.yy);

    const month = (map.m || map.mm) | 0;
    const date  = (map.d || map.dd) | 0;

    return new Date(year | 0, month - 1, date);
}

/**
 * 日期转字符串
 *
 * @param  {Date}   date   日期
 * @param  {string} format 转换格式
 * @param  {Object} lang   [description]
 * @return {string}        [description]
 */
export function format(date, format, lang) {

    const year      = date.getFullYear();
    const month     = date.getMonth() + 1;
    const day       = date.getDate();

    let week      = date.getDay();

    if (lang && lang.days) {
        week = lang.days.split(',')[week];
    }

    const map = {
        yyyy: year,
        yy: year % 100,
        y: year,
        mm: this.datePad(month),
        m: month,
        dd: this.datePad(day),
        d: day,
        w: week,
        ww: lang ? (lang.week + week) : ''
    };

    return format.replace(
        /y+|M+|d+|W+/gi,
        function ($0) {
            return map[$0] || '';
        }
    );
}

/**
 * 日期补零
 *
 * @param  {number} num 月/日
 * @return {string}     补零以后
 */
export function datePad(num) {
    num = num < 10 ? '0' + num : num;
    return num;
}

/**
 * 判断两个日期对象是否为同一天
 *
 * @param  {Date}  d1 日期1
 * @param  {Date}  d2 日期2
 * @return {boolean}  是否为同一天
 */
export function isEqualDate(d1, d2) {
    return d1 && d2
      && (d1.getFullYear() === d2.getFullYear())
      && (d1.getMonth() === d2.getMonth())
      && (d1.getDate() === d2.getDate());
}

/**
 * 判断两个日期对象是否为同一月
 *
 * @param  {Date}  d1 日期1
 * @param  {Date}  d2 日期2
 * @return {boolean}  是否为同一月
 */
export function isEqualMonth(d1, d2) {
    return d1 && d2
      && (d1.getFullYear() === d2.getFullYear())
      && (d1.getMonth() === d2.getMonth());
}

/**
 * 判断两个日期对象的大小
 *
 * @param  {Date}  d1 日期1
 * @param  {Date}  d2 日期2
 * @return {boolean}  d1 < d2
 */
export function isBeforeDate(d1, d2) {
    const date1 = this.cloneAsDate(d1);
    const date2 = this.cloneAsDate(d2);

    return (date1.getTime() < date2.getTime());
}

/**
 * 判断两个日期对象的大小
 *
 * @param  {Date}  d1 日期1
 * @param  {Date}  d2 日期2
 * @return {boolean}  d1 > d2
 */
export function isAfterDate(d1, d2) {
    const date1 = this.cloneAsDate(d1);
    const date2 = this.cloneAsDate(d2);

    return (date1.getTime() > date2.getTime());
}

export function isBeforeMonth(d1, d2) {
    const date1 = this.cloneAsDate(d1);
    const date2 = this.cloneAsDate(d2);

    return (date1.getFullYear() <= date2.getFullYear()
        && date1.getMonth() < date2.getMonth());
}

export function isAfterMonth(d1, d2) {
    const date1 = this.cloneAsDate(d1);
    const date2 = this.cloneAsDate(d2);

    return (date1.getFullYear() >= date2.getFullYear()
        && date1.getMonth() > date2.getMonth());
}

/**
 * 判断日期是否在两个日期之间
 *
 * @param  {Date} dateToCheck 待判断的日期
 * @param  {Date}  startDate   开始日期
 * @param  {Date}  endDate     结束日期
 * @return {boolean}           是否在startDate和endDate之间
 */
export function isBetweenDates(dateToCheck, startDate, endDate) {
    return (!(this.isBeforeDate(dateToCheck, startDate))
        && !(this.isAfterDate(dateToCheck, endDate)));
}

/**
 * 判断是否为Date对象
 *
 * @param  {Date}  d 日期1
 * @return {boolean}
 */
export function isDateObject(d) {
    return d instanceof Date;
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
