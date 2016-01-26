/**
 * @file CalendarMonth
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');
const cx = require('../common/util/cxBuilder').create('CalendarMonth');
const Day = require('./Day');

const _ = require('underscore');
const DateTime = require('../common/util/date');

const PropTypes = React.PropTypes;

const CalendarMonth = React.createClass({

    displayName: 'CalendarMonth',

    onClick(e) {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange({
                target: this,
                date: e.date
            });
        }
    },

    renderWeekHeader() {
        const days = this.props.lang.days.split(',');

        return (
            <div className={cx().part('weekheader').build()}>
                {_.map(days, function (day, index) {
                    return <span key={index}>{day}</span>;
                })}
            </div>
        );
    },

    renderDates() {
        const props = this.props;
        const month = props.month;

        const weekArray = DateTime.getFullWeekArray(month);

        let weeks = [];
        const len = weekArray.length;

        weeks.push(
            this.renderDay(weekArray[0], ['pre-month'])
        );
        weeks[0] = weeks[0].concat(
            this.renderDay(weekArray[1], [])
        );

        for (let i = 2; i < len - 1; i++) {
            weeks.push(
                this.renderDay(weekArray[i], [])
            );
        }

        weeks[len - 3] = weeks[len - 3].concat(
            this.renderDay(weekArray[len - 1], ['next-month'])
        );

        return (
            <ul>
                {_.map(weeks, this.renderWeek, this)}
            </ul>
        );
    },

    renderWeek(week, index) {

        return (
            <li key={index} className={cx().part('week').build()}>
                {week}
            </li>
        );
    },

    renderDay(array, constiants) {

        const props = this.props;

        const date = props.date;
        const minDate = props.minDate;
        const maxDate = props.maxDate;

        return _.map(array, function (day, index) {

            const selected = DateTime.isEqualDate(day, date);
            const disabled = (_.isDate(minDate) && DateTime.isBeforeDate(day, minDate))
                            || (_.isDate(maxDate) && DateTime.isAfterDate(day, maxDate));

            return (
                <Day
                    key={day}
                    date={day}
                    constiants={constiants}
                    disabled={disabled}
                    selected={selected}
                    onClick={this.onClick} />
            );
        }, this);
    },

    render() {

        return (
            <div className={cx(this.props).build()}>
                {this.renderWeekHeader()}
                {this.renderDates()}
            </div>
        );
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
