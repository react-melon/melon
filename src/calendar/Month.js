/**
 * @file CalendarMonth
 * @author cxtom(cxtom2010@gmail.com)
 */

var React = require('react');
var Component = require('../Component');
var Day = require('./Day');

var _ = require('underscore');
var DateTime = require('../common/util/date');

var PropTypes = React.PropTypes;

class CalendarMonth extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.type = 'calendar-month';
    }

    onClick(e) {
        var onChange = this.props.onChange;
        if (onChange) {
            onChange({
                target: this,
                date: e.date
            });
        }
    }

    renderWeekHeader() {
        var days = this.props.lang.days.split(',');

        return (
            <div className={this.getPartClassName('weekheader')}>
                {_.map(days, function (day, index) {
                    return <span key={index}>{day}</span>;
                })}
            </div>
        );
    }

    renderDates() {
        var props = this.props;
        var month = props.month;

        var weekArray = DateTime.getFullWeekArray(month);

        var weeks = [];
        var len = weekArray.length;

        weeks.push(
            this.renderDay(weekArray[0], ['pre-month'])
        );
        weeks[0] = weeks[0].concat(
            this.renderDay(weekArray[1], [])
        );

        for (var i = 2; i < len - 1; i++) {
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
    }

    renderWeek(week, index) {

        return (
            <li key={index} className={this.getPartClassName('week')}>
                {week}
            </li>
        );
    }

    renderDay(array, variants) {

        var props = this.props;

        var date = props.date;
        var minDate = props.minDate;
        var maxDate = props.maxDate;

        return _.map(array, function (day, index) {

            var selected = DateTime.isEqualDate(day, date);
            var disabled = (_.isDate(minDate) && DateTime.isBeforeDate(day, minDate))
                            || (_.isDate(maxDate) && DateTime.isAfterDate(day, maxDate));

            return (
                <Day
                    key={day}
                    date={day}
                    variants={variants}
                    disabled={disabled}
                    selected={selected}
                    onClick={this.onClick} />
            );
        }, this);
    }

    render() {

        return (
            <div className={this.getClassName()}>
                {this.renderWeekHeader()}
                {this.renderDates()}
            </div>
        );
    }

}

CalendarMonth.propTypes = {
    date: PropTypes.object.isRequired,
    month: PropTypes.object.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onChange: PropTypes.func,
    lang: PropTypes.shape({
        week: PropTypes.string,
        days: PropTypes.string,
        title: PropTypes.string
    }).isRequired
};

module.exports = CalendarMonth;
