/**
 * @file Calendar/CalendarSelect
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

class CalendarSelect extends Component {

    constructor(props) {

        super(props);

        this.state = {
            date: props.date,
            mode: props.mode || 'year'
        };

        this.onClick = this.onClick.bind(this);

        this.type = 'calendar-selector';
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            date: nextProps.date
        });
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
            mode
        } = this.props;

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
                    disabled: (_.isDate(minDate) && DateTime.isBeforeMonth(newDate, minDate))
                        || (_.isDate(maxDate) && DateTime.isAfterMonth(newDate, maxDate)),
                    selected: month === m
                };
            });
        }
        else {
            var range = CalendarSelect.MAX_RANGE;
            _.range(y - range, y + range).forEach(function (year, index) {

                var newDate = new Date(year, m, d);

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
                onClick={item.disabled ? null : this.onClick}
                data-mode={item.mode}
                data-value={item.value}
                ref={item.selected ? null : "item"}
                className={className} >
                <a href="#">{item.text}</a>
            </li>
        );
    }

    onClick(e) {
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
                date: mode === 'month'
                    ? new Date(y, value, d)
                    : new Date(value, m, d)
            });
        }

        if (mode === 'year') {
            this.setState({
                mode: 'month'
            });
        }
    }

    isMonthView() {

        var {
            minDate,
            maxDate
        } = this.props;

        var mode = this.state.mode;

        var onlyOnYear = false;

        if (mode === 'year' && _.isDate(minDate) && _.isDate(maxDate)) {
            onlyOnYear = DateTime.yearDiff(minDate, maxDate) <= 1;
        }

        return mode === 'month' || onlyOnYear;

    }
}

CalendarSelect.MAX_RANGE = 10;

CalendarSelect.propTypes = {
    date: PropTypes.object.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onChange: PropTypes.func,
    mode: PropTypes.oneOf(['month', 'year'])
};

module.exports = CalendarSelect;
