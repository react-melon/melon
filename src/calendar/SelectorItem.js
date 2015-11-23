/**
 * @file Calendar/CalendarSelectorItem
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');
const cx = require('../common/util/cxBuilder').create('CalendarSelectorItem');

const DateTime = require('../common/util/date');

const PropTypes = React.PropTypes;

const CalendarSelectorItem = React.createClass({

    displayName: 'CalendarSelectorItem',

    shouldComponentUpdate(nextProps, nextState) {

        var {
            disabled,
            selected
        } = this.props;

        if (nextProps.disabled !== disabled
            || nextProps.selected !== selected) {
            return true;
        }

        return false;

    },

    render() {

        var props = this.props;

        var {
            date,
            onClick,
            mode,
            disabled,
            selected,
            ...others
        } = props;


        return (
            <li
                {...others}
                data-mode={mode}
                data-value={date}
                onClick={disabled ? null : this.onClick}
                className={cx(props).addStates({selected}).build()} >
                <span>
                    {mode === 'year' ? date.getFullYear() : DateTime.getShortMonth(date)}
                </span>
            </li>
        );
    },

    onClick(e) {

        e.preventDefault();

        var {
            disabled,
            onClick,
            date,
            mode
        } = this.props;

        if (disabled) {
            return;
        }

        if (onClick) {
            onClick({
                target: this,
                date: date,
                mode: mode
            });
        }
    }

});


CalendarSelectorItem.propTypes = {
    date: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    mode: PropTypes.oneOf(['month', 'year'])
};

module.exports = CalendarSelectorItem;
