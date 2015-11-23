/**
 * @file Calendar/CalendarDay
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');
const cx = require('../common/util/cxBuilder').create('CalendarDay');
const DateTime = require('../common/util/date');

const PropTypes = React.PropTypes;

const CalendarDay = React.createClass({

    displayName: 'CalendarDay',

    shouldComponentUpdate(nextProps) {

        const {
            disabled,
            selected
        } = this.props;

        return nextProps.disabled !== disabled
            || nextProps.selected !== selected;

    },

    onClick(e) {

        e.preventDefault();

        var {
            disabled,
            onClick,
            date
        } = this.props;

        if (disabled) {
            return;
        }

        if (onClick) {
            onClick({
                target: this,
                date: date
            });
        }
    },

    render() {

        const {
            date,
            onClick,
            selected,
            ...others
        } = this.props;

        const className = cx(this.props)
            .addVariants(DateTime.isEqualDate(date, new Date()) ? 'today' : null)
            .addStates({selected})
            .build();


        return (
            <a
                {...others}
                className={className}
                href="#"
                onClick={this.onClick} >
                {date.getDate()}
            </a>
        );
    }

});


CalendarDay.propTypes = {
    date: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    selected: PropTypes.bool
};

module.exports = CalendarDay;
