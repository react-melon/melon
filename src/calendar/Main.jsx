/**
 * @file CalendarMain
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Dialog = require('../Dialog.jsx');
var Button = require('../Button.jsx');
var Icon = require('../Icon.jsx');
var Component = require('../Component.jsx');

var _ = require('underscore');
var cx = require('../common/util/classname');
var DateTime = require('../common/util/date');

var PropTypes = React.PropTypes;

class CalendarMain extends Component {

    constructor(props) {

        super(props);

        this.state = {
            month: props.date,
            date: props.date,
            minDate: props.minDate,
            maxDate: props.maxDate
        };

        this.type = 'calendar-main';
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            date: nextProps.date,
            month: nextProps.month,
            minDate: nextProps.minDate,
            maxDate: nextProps.maxDate
        });
    }

    renderPager() {
        var date = this.state.month;

        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        var {
            maxDate,
            minDate
        } = this.props;

        var beforeState = {
            disabled: _.isDate(minDate) && DateTime.isBeforeMonth(DateTime.addMonths(date, -1), minDate)
        };

        var nextState = {
            disabled: _.isDate(maxDate) && DateTime.isAfterMonth(DateTime.addMonths(date, 1), maxDate)
        };

        return (
            <div className={this.getPartClassName('pager')}>
                <Icon icon='navigate-before' data-role='pager' states={beforeState} data-action="prev" />
                <Icon icon='navigate-next' data-role='pager' states={nextState} data-action="next" />
                {year + ' 年 ' + month + ' 月 '}
            </div>
        );

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
        var state = this.state;
        var month = state.month;
        var date = state.date;

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
            <ul className={this.getPartClassName('month')}>
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

    renderDay(array, variants, month) {

        var state = this.state;

        var date = state.date;
        var minDate = state.minDate;
        var maxDate = state.maxDate;

        return _.map(array, function (day, index) {

            var states = {};

            if (DateTime.isEqualDate(day, date)) {
                states.selected = true;
            }

            if ((_.isDate(minDate) && DateTime.isBeforeDate(day, minDate))
                || (_.isDate(maxDate) && DateTime.isAfterDate(day, maxDate))) {
                states.disabled = true;
            }

            var classNames = cx.create(
                this.getPartClassName('day'),
                cx.createVariantClass(variants),
                cx.createStateClass(states)
            );

            return (
                <a
                    className={classNames}
                    href="#"
                    key={day}
                    data-month={month}
                    data-role="day" >
                    {day.getDate()}
                </a>
            );
        }, this)
    }

    render() {
        var props = this.props;

        return (
            <div className={this.getClassName()}>
                {this.renderPager()}
                {this.renderWeekHeader()}
                {this.renderDates()}
            </div>
        );
    }

}

CalendarMain.propTypes = {
    date: PropTypes.object.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onChange: PropTypes.func,
    lang: PropTypes.shape({
        week: PropTypes.string,
        days: PropTypes.string,
        title: PropTypes.string
    }).isRequired
};

module.exports = CalendarMain;
