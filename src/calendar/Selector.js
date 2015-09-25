/**
 * @file Calendar/CalendarSelector
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Component = require('../Component');

var _ = require('underscore');
var cx = require('../common/util/classname');
var DateTime = require('../common/util/date');

var PropTypes = React.PropTypes;

class CalendarSelector extends Component {

    constructor(props) {

        super(props);

        this.onClick = this.onClick.bind(this);

        this.type = 'calendar-selector';
    }

    componentDidMount() {
        this.refs.item && this.refs.item.scrollIntoView();
    }

    componentDidUpdate() {
        this.refs.item && this.refs.item.scrollIntoView();
    }

    render() {

        var {
            minDate,
            maxDate,
            date
        } = this.props;

        var datasource = [];

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
                    disabled: (_.isDate(minDate) && DateTime.isBeforeMonth(newDate, minDate))
                        || (_.isDate(maxDate) && DateTime.isAfterMonth(newDate, maxDate)),
                    selected: month === m
                };
            });
        }
        else {
            var range = CalendarSelector.MAX_RANGE;
            _.range(y - range, y + range).forEach(function (year, index) {

                if ((_.isDate(minDate) && year < minDate.getFullYear())
                    || (_.isDate(maxDate) && year > maxDate.getFullYear())) {

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

        return (
            <ul className={this.getClassName()}>
                {datasource.map(this.renderItem, this)}
            </ul>
        );
    }

    renderItem(item, index) {

        var className = cx.create(
            this.getPartClassName('item'),
            cx.createStateClass({
                disabled: item.disabled,
                selected: item.selected
            })
        );

        return (
            <li
                key={index}
                onClick={this.onClick.bind(this, item.disabled)}
                data-mode={item.mode}
                data-value={item.value}
                ref={item.selected ? 'item' : null}
                className={className} >
                <a href="#">{item.text}</a>
            </li>
        );
    }

    onClick(disabled, e) {

        e.preventDefault();

        if (disabled) {
            return;
        }

        var target = e.currentTarget;

        var mode = target.getAttribute('data-mode');
        var value = target.getAttribute('data-value') - 0;

        var date = this.props.date;

        var y = date.getFullYear();
        var m = date.getMonth();
        var d = date.getDate();

        var onChange = this.props.onChange;

        if (onChange) {
            onChange({
                target: this,
                mode: mode,
                date: mode === 'month'
                    ? new Date(y, value, d)
                    : new Date(value, m, d)
            });
        }
    }

    /**
     * 是否显示日期
     *
     * @return {boolean}
     * @private
     */
    isMonthView() {

        var {
            minDate,
            maxDate,
            mode
        } = this.props;

        var onlyOneYear = false;

        // 如果范围中只有一年，则跳过yearview，直接显示month view
        if (mode === 'year' && _.isDate(minDate) && _.isDate(maxDate)) {
            onlyOneYear = DateTime.yearDiff(minDate, maxDate) <= 1;
        }

        return mode === 'month' || onlyOneYear;

    }
}

CalendarSelector.MAX_RANGE = 10;

CalendarSelector.propTypes = {
    date: PropTypes.object.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onChange: PropTypes.func,
    mode: PropTypes.oneOf(['month', 'year'])
};

module.exports = CalendarSelector;
