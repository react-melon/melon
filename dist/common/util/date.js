define('melon/common/util/date', [
    'require',
    'exports',
    'module',
    'underscore'
], function (require, exports, module) {
    var _ = require('underscore');
    module.exports = {
        addDays: function (d, days) {
            var newDate = this.clone(d);
            newDate.setDate(d.getDate() + days);
            return newDate;
        },
        addMonths: function (d, months) {
            var newDate = this.clone(d);
            newDate.setMonth(d.getMonth() + months);
            return newDate;
        },
        addYears: function (d, years) {
            var newDate = this.clone(d);
            newDate.setFullYear(d.getFullYear() + years);
            return newDate;
        },
        clone: function (d) {
            return new Date(d.getTime());
        },
        cloneAsDate: function (d) {
            var clonedDate = this.clone(d);
            clonedDate.setHours(0, 0, 0, 0);
            return clonedDate;
        },
        getDaysInMonth: function (d) {
            var resultDate = this.getFirstDayOfMonth(d);
            resultDate.setMonth(resultDate.getMonth() + 1);
            resultDate.setDate(resultDate.getDate() - 1);
            return resultDate.getDate();
        },
        getFirstDayOfMonth: function (d) {
            return new Date(d.getFullYear(), d.getMonth(), 1);
        },
        getLastDayOfMonth: function (d) {
            var date = new Date(d.getFullYear(), d.getMonth() + 1, 1);
            return this.addDays(date, -1);
        },
        getShortMonth: function (d) {
            var month = d.getMonth();
            return month + 1 + '\u6708';
        },
        getDayOfWeek: function (d) {
            var dow = d.getDay();
            var lang = [
                '\u65E5',
                '\u4E00',
                '\u4E8C',
                '\u4E09',
                '\u56DB',
                '\u4E94',
                '\u516D'
            ];
            return '\u661F\u671F' + lang[dow];
        },
        getFullWeekArray: function (d) {
            var weekArray = this.getWeekArray(d);
            var firstWeek = weekArray[0] = _.compact(weekArray[0]);
            var lastWeek = weekArray[weekArray.length - 1];
            var preArray = [];
            var lastArray = [];
            var i = 0;
            var len = 7 - firstWeek.length;
            for (; i < len; i++) {
                preArray.push(this.addDays(firstWeek[0], i - len));
            }
            len = 7 - lastWeek.length;
            for (i = 1; i <= len; i++) {
                lastArray.push(this.addDays(lastWeek[lastWeek.length - 1], i));
            }
            return [].concat([preArray], weekArray, [lastArray]);
        },
        getWeekArray: function (d) {
            var dayArray = [];
            var daysInMonth = this.getDaysInMonth(d);
            var daysInWeek;
            var emptyDays;
            var firstDayOfWeek;
            var week;
            var weekArray = [];
            var i;
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
        },
        parse: function (value, format) {
            format = format.split(/[^yMdW]+/i);
            value = value.split(/\D+/);
            var map = {};
            for (var i = 0, l = format.length; i < l; i++) {
                if (format[i] && value[i] && (format[i].length > 1 && value[i].length === format[i].length || format[i].length === 1)) {
                    map[format[i]] = value[i];
                }
            }
            var year = map.yyyy || map.y || (map.yy < 50 ? '20' : '19') + map.yy;
            var month = (map.m || map.mm) | 0;
            var date = (map.d || map.dd) | 0;
            return new Date(year | 0, month - 1, date);
        },
        format: function (date, format, lang) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var week = date.getDay();
            if (lang && lang.days) {
                week = lang.days.split(',')[week];
            }
            var map = {
                yyyy: year,
                yy: year % 100,
                y: year,
                mm: this.datePad(month),
                m: month,
                dd: this.datePad(day),
                d: day,
                w: week,
                ww: lang ? lang.week + week : ''
            };
            return format.replace(/y+|M+|d+|W+/gi, function ($0) {
                return map[$0] || '';
            });
        },
        datePad: function (num) {
            num = num < 10 ? '0' + num : num;
            return num;
        },
        isEqualDate: function (d1, d2) {
            return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
        },
        isEqualMonth: function (d1, d2) {
            return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
        },
        isBeforeDate: function (d1, d2) {
            var date1 = this.cloneAsDate(d1);
            var date2 = this.cloneAsDate(d2);
            return date1.getTime() < date2.getTime();
        },
        isAfterDate: function (d1, d2) {
            var date1 = this.cloneAsDate(d1);
            var date2 = this.cloneAsDate(d2);
            return date1.getTime() > date2.getTime();
        },
        isBeforeMonth: function (d1, d2) {
            var date1 = this.cloneAsDate(d1);
            var date2 = this.cloneAsDate(d2);
            return date1.getFullYear() <= date2.getFullYear() && date1.getMonth() < date2.getMonth();
        },
        isAfterMonth: function (d1, d2) {
            var date1 = this.cloneAsDate(d1);
            var date2 = this.cloneAsDate(d2);
            return date1.getFullYear() >= date2.getFullYear() && date1.getMonth() > date2.getMonth();
        },
        isBetweenDates: function (dateToCheck, startDate, endDate) {
            return !this.isBeforeDate(dateToCheck, startDate) && !this.isAfterDate(dateToCheck, endDate);
        },
        isDateObject: function (d) {
            return d instanceof Date;
        },
        monthDiff: function (d1, d2) {
            var m;
            m = (d1.getFullYear() - d2.getFullYear()) * 12;
            m += d1.getMonth();
            m -= d2.getMonth();
            return m;
        },
        yearDiff: function (d1, d2) {
            return ~~(this.monthDiff(d1, d2) / 12);
        }
    };
});