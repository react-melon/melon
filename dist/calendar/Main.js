define('melon/calendar/Main', [
    'exports',
    '../babelHelpers',
    'react',
    '../Dialog',
    '../Button',
    '../Icon',
    '../Component',
    'underscore',
    '../common/util/classname',
    '../common/util/date'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Dialog = require('../Dialog');
    var Button = require('../Button');
    var Icon = require('../Icon');
    var Component = require('../Component');
    var _ = require('underscore');
    var cx = require('../common/util/classname');
    var DateTime = require('../common/util/date');
    var PropTypes = React.PropTypes;
    var CalendarMain = function (_Component) {
        babelHelpers.inherits(CalendarMain, _Component);
        function CalendarMain(props) {
            babelHelpers.classCallCheck(this, CalendarMain);
            babelHelpers.get(Object.getPrototypeOf(CalendarMain.prototype), 'constructor', this).call(this, props);
            this.state = {
                month: props.date,
                date: props.date,
                minDate: props.minDate,
                maxDate: props.maxDate
            };
            this.type = 'calendar-main';
        }
        babelHelpers.createClass(CalendarMain, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({
                        date: nextProps.date,
                        month: nextProps.month,
                        minDate: nextProps.minDate,
                        maxDate: nextProps.maxDate
                    });
                }
            },
            {
                key: 'renderPager',
                value: function renderPager() {
                    var date = this.state.month;
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear();
                    var _props = this.props;
                    var maxDate = _props.maxDate;
                    var minDate = _props.minDate;
                    var beforeState = { disabled: _.isDate(minDate) && DateTime.isBeforeMonth(DateTime.addMonths(date, -1), minDate) };
                    var nextState = { disabled: _.isDate(maxDate) && DateTime.isAfterMonth(DateTime.addMonths(date, 1), maxDate) };
                    return React.createElement('div', { className: this.getPartClassName('pager') }, React.createElement(Icon, {
                        icon: 'navigate-before',
                        'data-role': 'pager',
                        states: beforeState,
                        'data-action': 'prev'
                    }), React.createElement(Icon, {
                        icon: 'navigate-next',
                        'data-role': 'pager',
                        states: nextState,
                        'data-action': 'next'
                    }), year + ' \u5E74 ' + month + ' \u6708 ');
                }
            },
            {
                key: 'renderWeekHeader',
                value: function renderWeekHeader() {
                    var days = this.props.lang.days.split(',');
                    return React.createElement('div', { className: this.getPartClassName('weekheader') }, _.map(days, function (day, index) {
                        return React.createElement('span', { key: index }, day);
                    }));
                }
            },
            {
                key: 'renderDates',
                value: function renderDates() {
                    var state = this.state;
                    var month = state.month;
                    var date = state.date;
                    var weekArray = DateTime.getFullWeekArray(month);
                    var weeks = [];
                    var len = weekArray.length;
                    weeks.push(this.renderDay(weekArray[0], ['pre-month'], -1));
                    weeks[0] = weeks[0].concat(this.renderDay(weekArray[1], [], 0));
                    for (var i = 2; i < len - 1; i++) {
                        weeks.push(this.renderDay(weekArray[i], [], 0));
                    }
                    weeks[len - 3] = weeks[len - 3].concat(this.renderDay(weekArray[len - 1], ['next-month'], 1));
                    return React.createElement('ul', { className: this.getPartClassName('month') }, _.map(weeks, this.renderWeek, this));
                }
            },
            {
                key: 'renderWeek',
                value: function renderWeek(week, index) {
                    return React.createElement('li', {
                        key: index,
                        className: this.getPartClassName('week')
                    }, week);
                }
            },
            {
                key: 'renderDay',
                value: function renderDay(array, variants, month) {
                    var state = this.state;
                    var date = state.date;
                    var minDate = state.minDate;
                    var maxDate = state.maxDate;
                    return _.map(array, function (day, index) {
                        var states = {};
                        if (DateTime.isEqualDate(day, date)) {
                            states.selected = true;
                        }
                        if (_.isDate(minDate) && DateTime.isBeforeDate(day, minDate) || _.isDate(maxDate) && DateTime.isAfterDate(day, maxDate)) {
                            states.disabled = true;
                        }
                        var classNames = cx.create(this.getPartClassName('day'), cx.createVariantClass(variants), cx.createStateClass(states));
                        return React.createElement('a', {
                            className: classNames,
                            href: '#',
                            key: day,
                            'data-month': month,
                            'data-role': 'day'
                        }, day.getDate());
                    }, this);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return React.createElement('div', { className: this.getClassName() }, this.renderPager(), this.renderWeekHeader(), this.renderDates());
                }
            }
        ]);
        return CalendarMain;
    }(Component);
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
});