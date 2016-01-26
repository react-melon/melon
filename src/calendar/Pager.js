/**
 * @file Calendar/CalendarPager
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');
const cx = require('../common/util/cxBuilder').create('CalendarPager');
const Icon = require('../Icon');

const _ = require('underscore');
const DateTime = require('../common/util/date');

const PropTypes = React.PropTypes;

const CalendarPager = React.createClass({

    displayName: 'CalendarPager',

    render() {

        const {
            maxDate,
            minDate,
            month
        } = this.props;

        const m = month.getMonth() + 1;
        const y = month.getFullYear();

        const beforeState = {
            disabled: _.isDate(minDate) && DateTime.isBeforeMonth(DateTime.addMonths(month, -1), minDate)
        };

        const nextState = {
            disabled: _.isDate(maxDate) && DateTime.isAfterMonth(DateTime.addMonths(month, 1), maxDate)
        };

        return (
            <div className={cx(this.props).build()}>
                <Icon
                    icon="navigate-before"
                    data-role="pager"
                    states={beforeState}
                    data-action="prev"
                    onClick={beforeState.disabled ? null : this.onClick} />
                <Icon
                    icon="navigate-next"
                    data-role="pager"
                    states={nextState}
                    data-action="next"
                    onClick={nextState.disabled ? null : this.onClick} />
                {y + ' 年 ' + m + ' 月'}
            </div>
        );
    },

    onClick(e) {

        const target = e.currentTarget;
        const month = this.props.month;

        const action = target.getAttribute('data-action');
        const newMonth = DateTime.addMonths(month, action === 'next' ? 1 : -1);

        const onChange = this.props.onChange;

        if (onChange) {
            onChange({
                target: this,
                month: newMonth
            });
        }

    }

});


CalendarPager.propTypes = {
    month: PropTypes.instanceOf(Date).isRequired,
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    onChange: PropTypes.func
};

module.exports = CalendarPager;
