/**
 * @file Calendar/CalendarSelector
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');
const ReactDOM = require('react-dom');
const cx = require('../common/util/cxBuilder').create('CalendarSelector');

const Item = require('./SelectorItem');

const _ = require('underscore');
const DateTime = require('../common/util/date');

const PropTypes = React.PropTypes;

const CalendarSelector = React.createClass({

    displayName: 'CalendarSelector',

    componentDidMount() {
        this.refs.item
        && ReactDOM.findDOMNode(this.refs.item).scrollIntoView();
    },

    componentDidUpdate() {
        this.refs.item
        && ReactDOM.findDOMNode(this.refs.item).scrollIntoView();
    },

    render() {

        const {
            minDate,
            maxDate,
            date,
            ...rest
        } = this.props;

        let children = [];

        const y = date.getFullYear();
        const m = date.getMonth();
        const d = date.getDate();

        if (this.isMonthView()) {
            children = _.range(12).map(function (month, index) {

                const newDate = new Date(y, month, d);
                const disabled = (_.isDate(minDate) && DateTime.isBeforeMonth(newDate, minDate))
                                || (_.isDate(maxDate) && DateTime.isAfterMonth(newDate, maxDate));
                const selected = month === m;

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
            const range = CalendarSelector.MAX_RANGE;
            _.range(y - range, y + range).forEach(function (year, index) {

                if ((_.isDate(minDate) && year < minDate.getFullYear())
                    || (_.isDate(maxDate) && year > maxDate.getFullYear())) {

                    return;
                }

                const newDate = new Date(year, m, d);
                const selected = year === y;

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
            <ul {...rest} className={cx(this.props).build()}>
                {children}
            </ul>
        );
    },

    onClick(e) {

        const onChange = this.props.onChange;

        if (onChange) {
            onChange({
                target: this,
                mode: e.mode,
                date: e.date
            });
        }
    },

    /**
     * 是否显示日期
     *
     * @return {boolean}
     * @private
     */
    isMonthView() {

        const {
            minDate,
            maxDate,
            mode
        } = this.props;

        let onlyOneYear = false;

        // 如果范围中只有一年，则跳过yearview，直接显示month view
        if (mode === 'year' && _.isDate(minDate) && _.isDate(maxDate)) {
            onlyOneYear = (DateTime.yearDiff(minDate, maxDate) === 0);
        }

        return mode === 'month' || onlyOneYear;

    }

});

CalendarSelector.MAX_RANGE = 10;

CalendarSelector.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
    mode: PropTypes.oneOf(['month', 'year'])
};

module.exports = CalendarSelector;
