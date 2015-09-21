/**
 * @file CalendarMain
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');
var Dialog = require('../Dialog.jsx');
var createControl = require('../common/util/createControl');
var Button = require('../Button.jsx');
var _ = require('underscore');
var cx = require('../common/util/classname');
var DateTime = require('../common/util/date');
var Icon = require('../Icon.jsx');


var PropTypes = React.PropTypes;

var CalendarMain = React.createClass({

    propTypes: {
        value: PropTypes.object.isRequired,
        maxDate: PropTypes.object,
        minDate: PropTypes.object,
        onChange: PropTypes.func,
        lang: PropTypes.shape({
            week: PropTypes.string,
            days: PropTypes.string,
            title: PropTypes.string
        }).isRequired
    },

    getInitialState: function () {
        var props = this.props;
        return {
            month: props.value,
            value: props.value,
            minDate: props.minDate,
            maxDate: props.maxDate
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            value: nextProps.value,
            month: nextProps.month
        });
    },

    getPager: function () {
        var date = this.state.month;

        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        return (
            <div className={cx.createComponentClass('calendar-dialog-pager')}>
                <Icon icon='navigate-before' data-role='pager' data-action="prev" />
                <Icon icon='navigate-next' data-role='pager' data-action="next" />
                {year + ' 年 ' + month + ' 月 '}
            </div>
        );

    },

    getWeekHeader: function () {
        var days = this.props.lang.days.split(',');

        return (
            <div className={cx.createComponentClass('calendar-dialog-weekheader')}>
                {_.map(days, function (day, index) {
                    return <span key={index}>{day}</span>;
                })}
            </div>
        );
    },

    getDates: function () {
        var state = this.state;
        var month = state.month;
        var value = state.value;

        var weekArray = DateTime.getFullWeekArray(month);

        var weeks = [];
        var len = weekArray.length;

        weeks.push(
            this.renderDay(weekArray[0], ['pre-month'], -1)
        );
        weeks[0] = weeks[0].concat(
            this.renderDay(weekArray[1], [], 0)
        );

        for (var i = 2; i < len - 1; i++) {
            weeks.push(
                this.renderDay(weekArray[i], [], 0)
            );
        }

        weeks[len - 3] = weeks[len - 3].concat(
            this.renderDay(weekArray[len - 1], ['next-month'], 1)
        );

        return (
            <ul className={cx.createComponentClass('calendar-dialog-month')}>
                {_.map(weeks, this.renderWeek, this)}
            </ul>
        );
    },

    renderWeek: function (week, index) {

        return (
            <li key={index} className={cx.createComponentClass('calendar-dialog-week')}>
                {week}
            </li>
        );
    },

    renderDay: function (array, variants, month) {

        var state = this.state;

        var value = state.value;
        var minDate = state.minDate;
        var maxDate = state.maxDate;

        return _.map(array, function (day, index) {

            var states = {};

            if (DateTime.isEqualDate(day, value)) {
                states.selected = true;
            }

            if (_.isDate(minDate) && DateTime.isBeforeDate(day, minDate)) {
                states.disabled = true;
            }
            else if (_.isDate(maxDate) && DateTime.isAfterDate(day, maxDate)) {
                states.disabled = true;
            }

            return (
                <a
                    className={cx.createComponentClass('calendar-dialog-day', variants, states)}
                    href="#"
                    key={day}
                    data-month={month}
                    data-role="day" >
                    {day.getDate()}
                </a>
            );
        })
    },

    render: function () {
        var props = this.props;

        return (
            <div className={cx.createComponentClass('calendar-dialog-main')}>
                {this.getPager()}
                {this.getWeekHeader()}
                {this.getDates()}
            </div>
        );
    }

});

module.exports = CalendarMain;
