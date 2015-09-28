define('melon/calendar/Main', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component',
    'underscore',
    '../common/util/classname',
    '../common/util/date'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
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
            this.type = 'calendar-main';
        }
        babelHelpers.createClass(CalendarMain, [
            {
                key: 'onClick',
                value: function onClick(day, disabled, e) {
                    e.preventDefault();
                    if (disabled) {
                        return;
                    }
                    var onChange = this.props.onChange;
                    if (onChange) {
                        onChange({
                            target: this,
                            date: day
                        });
                    }
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
                    var props = this.props;
                    var month = props.month;
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
                    var props = this.props;
                    var date = props.date;
                    var minDate = props.minDate;
                    var maxDate = props.maxDate;
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
                            onClick: this.onClick.bind(this, day, states.disabled),
                            'data-role': 'day'
                        }, day.getDate());
                    }, this);
                }
            },
            {
                key: 'render',
                value: function render() {
                    return React.createElement('div', { className: this.getClassName() }, this.renderWeekHeader(), this.renderDates());
                }
            }
        ]);
        return CalendarMain;
    }(Component);
    CalendarMain.propTypes = {
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
    module.exports = CalendarMain;
});