define('melon/calendar/Select', [
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
    var CalendarSelect = function (_Component) {
        babelHelpers.inherits(CalendarSelect, _Component);
        function CalendarSelect(props) {
            babelHelpers.classCallCheck(this, CalendarSelect);
            babelHelpers.get(Object.getPrototypeOf(CalendarSelect.prototype), 'constructor', this).call(this, props);
            this.state = {
                date: props.date,
                mode: props.mode || 'year'
            };
            this.onClick = this.onClick.bind(this);
            this.type = 'calendar-selector';
        }
        babelHelpers.createClass(CalendarSelect, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({ date: nextProps.date });
                }
            },
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.refs.item && this.refs.item.scrollIntoView();
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    this.refs.item && this.refs.item.scrollIntoView();
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props = this.props;
                    var minDate = _props.minDate;
                    var maxDate = _props.maxDate;
                    var mode = _props.mode;
                    var datasource = [];
                    var date = this.state.date;
                    var y = date.getFullYear();
                    var m = date.getMonth();
                    var d = date.getDate();
                    if (this.isMonthView()) {
                        datasource = _.range(11).map(function (month, index) {
                            var newDate = new Date(y, month, d);
                            return {
                                text: DateTime.getShortMonth(newDate),
                                mode: 'month',
                                value: month,
                                disabled: _.isDate(minDate) && DateTime.isBeforeMonth(newDate, minDate) || _.isDate(maxDate) && DateTime.isAfterMonth(newDate, maxDate),
                                selected: month === m
                            };
                        });
                    } else {
                        var range = CalendarSelect.MAX_RANGE;
                        _.range(y - range, y + range).forEach(function (year, index) {
                            var newDate = new Date(year, m, d);
                            if (_.isDate(minDate) && year < minDate.getFullYear() || _.isDate(maxDate) && year > maxDate.getFullYear()) {
                                return;
                            }
                            datasource.push({
                                text: year,
                                mode: 'year',
                                value: year,
                                disabled: false,
                                selected: year === y
                            });
                        });
                    }
                    return React.createElement('ul', { className: this.getClassName() }, datasource.map(this.renderItem, this));
                }
            },
            {
                key: 'renderItem',
                value: function renderItem(item, index) {
                    var className = cx.create(this.getPartClassName('item'), cx.createStateClass({
                        disabled: item.disabled,
                        selected: item.selected
                    }));
                    return React.createElement('li', {
                        key: index,
                        onClick: item.disabled ? null : this.onClick,
                        'data-mode': item.mode,
                        'data-value': item.value,
                        ref: item.selected ? 'item' : null,
                        className: className
                    }, React.createElement('a', { href: '#' }, item.text));
                }
            },
            {
                key: 'onClick',
                value: function onClick(e) {
                    var target = e.currentTarget;
                    var mode = target.getAttribute('data-mode');
                    var value = target.getAttribute('data-value') - 0;
                    var date = this.state.date;
                    var y = date.getFullYear();
                    var m = date.getMonth();
                    var d = date.getDate();
                    var onChange = this.props.onChange;
                    if (onChange) {
                        onChange({
                            target: this,
                            mode: mode,
                            date: mode === 'month' ? new Date(y, value, d) : new Date(value, m, d)
                        });
                    }
                    if (mode === 'year') {
                        this.setState({ mode: 'month' });
                    }
                }
            },
            {
                key: 'isMonthView',
                value: function isMonthView() {
                    var _props2 = this.props;
                    var minDate = _props2.minDate;
                    var maxDate = _props2.maxDate;
                    var mode = this.state.mode;
                    var onlyOneYear = false;
                    if (mode === 'year' && _.isDate(minDate) && _.isDate(maxDate)) {
                        onlyOneYear = DateTime.yearDiff(minDate, maxDate) <= 1;
                    }
                    return mode === 'month' || onlyOnYear;
                }
            }
        ]);
        return CalendarSelect;
    }(Component);
    CalendarSelect.MAX_RANGE = 10;
    CalendarSelect.propTypes = {
        date: PropTypes.object.isRequired,
        maxDate: PropTypes.object,
        minDate: PropTypes.object,
        onChange: PropTypes.func,
        mode: PropTypes.oneOf([
            'month',
            'year'
        ])
    };
    module.exports = CalendarSelect;
});