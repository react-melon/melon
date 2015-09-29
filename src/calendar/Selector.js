/**
 * @file Calendar/CalendarSelector
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');
var ReactDOM = require('react-dom');

var Component = require('../Component');
var Item = require('./SelectorItem');

var _ = require('underscore');
var DateTime = require('../common/util/date');

var PropTypes = React.PropTypes;

class CalendarSelector extends Component {

    constructor(props) {

        super(props);

        this.onClick = this.onClick.bind(this);

        this.type = 'calendar-selector';
    }

    componentDidMount() {
        this.refs.item
        && ReactDOM.findDOMNode(this.refs.item).scrollIntoView();
    }

    componentDidUpdate() {
        this.refs.item
        && ReactDOM.findDOMNode(this.refs.item).scrollIntoView();
    }

    render() {

        var {
            minDate,
            maxDate,
            date
        } = this.props;

        var children = [];

        var y = date.getFullYear();
        var m = date.getMonth();
        var d = date.getDate();

        if (this.isMonthView()) {
            children = _.range(12).map(function (month, index) {

                var newDate = new Date(y, month, d);
                var disabled = (_.isDate(minDate) && DateTime.isBeforeMonth(newDate, minDate))
                                || (_.isDate(maxDate) && DateTime.isAfterMonth(newDate, maxDate));
                var selected = month === m;

                return (
                    <Item
                        key={index}
                        mode="month"
                        ref={selected ? 'item' : null}
                        date={newDate}
                        onClick={this.onClick}
                        disabled={disabled}
                        selected={selected} />
                );
            }, this);
        }
        else {
            var range = CalendarSelector.MAX_RANGE;
            _.range(y - range, y + range).forEach(function (year, index) {

                if ((_.isDate(minDate) && year < minDate.getFullYear())
                    || (_.isDate(maxDate) && year > maxDate.getFullYear())) {

                    return;
                }

                var newDate = new Date(year, m, d);
                var selected = year === y;

                children.push(
                    <Item
                        key={index}
                        mode="year"
                        ref={selected ? 'item' : null}
                        date={newDate}
                        onClick={this.onClick}
                        selected={selected} />
                );
            }, this);

        }

        return (
            <ul className={this.getClassName()}>
                {children}
            </ul>
        );
    }

    onClick(e) {

        var onChange = this.props.onChange;

        if (onChange) {
            onChange({
                target: this,
                mode: e.mode,
                date: e.date
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
