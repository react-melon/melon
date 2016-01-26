define('melon/calendar/Month', [
    'require',
    'exports',
    'module',
    'react',
    '../common/util/cxBuilder',
    './Day',
    'underscore',
    '../common/util/date'
], function (require, exports, module) {
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('CalendarMonth');
    var Day = require('./Day');
    var _ = require('underscore');
    var DateTime = require('../common/util/date');
    var PropTypes = React.PropTypes;
    var CalendarMonth = React.createClass({
        displayName: 'CalendarMonth',
        onClick: function (e) {
            var onChange = this.props.onChange;
            if (onChange) {
                onChange({
                    target: this,
                    date: e.date
                });
            }
        },
        renderWeekHeader: function () {
            var days = this.props.lang.days.split(',');
            return React.createElement('div', { className: cx().part('weekheader').build() }, _.map(days, function (day, index) {
                return React.createElement('span', { key: index }, day);
            }));
        },
        renderDates: function () {
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
            return React.createElement('ul', null, _.map(weeks, this.renderWeek, this));
        },
        renderWeek: function (week, index) {
            return React.createElement('li', {
                key: index,
                className: cx().part('week').build()
            }, week);
        },
        renderDay: function (array, constiants) {
            var props = this.props;
            var date = props.date;
            var minDate = props.minDate;
            var maxDate = props.maxDate;
            return _.map(array, function (day, index) {
                var selected = DateTime.isEqualDate(day, date);
                var disabled = _.isDate(minDate) && DateTime.isBeforeDate(day, minDate) || _.isDate(maxDate) && DateTime.isAfterDate(day, maxDate);
                return React.createElement(Day, {
                    key: day,
                    date: day,
                    constiants: constiants,
                    disabled: disabled,
                    selected: selected,
                    onClick: this.onClick
                });
            }, this);
        },
        render: function () {
            return React.createElement('div', { className: cx(this.props).build() }, this.renderWeekHeader(), this.renderDates());
        }
    });
    CalendarMonth.propTypes = {
        date: PropTypes.instanceOf(Date).isRequired,
        month: PropTypes.instanceOf(Date).isRequired,
        maxDate: PropTypes.instanceOf(Date),
        minDate: PropTypes.instanceOf(Date),
        onChange: PropTypes.func,
        lang: PropTypes.shape({
            week: PropTypes.string,
            days: PropTypes.string,
            title: PropTypes.string
        }).isRequired
    };
    module.exports = CalendarMonth;
});