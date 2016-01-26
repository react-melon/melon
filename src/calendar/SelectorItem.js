/**
 * @file Calendar/CalendarSelectorItem
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');
const cx = require('../common/util/cxBuilder').create('CalendarSelectorItem');

const ItemMixin = require('./ItemMixin');
const DateTime = require('../common/util/date');

const PropTypes = React.PropTypes;

const CalendarSelectorItem = React.createClass({

    displayName: 'CalendarSelectorItem',

    mixins: [ItemMixin],

    render() {

        const props = this.props;

        const {
            date,
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
    }
});


CalendarSelectorItem.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    mode: PropTypes.oneOf(['month', 'year'])
};

module.exports = CalendarSelectorItem;
