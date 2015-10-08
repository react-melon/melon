/**
 * @file Calendar/CalendarSelectorItem
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Component = require('../Component');
var DateTime = require('../common/util/date');

var PropTypes = React.PropTypes;

class CalendarSelectorItem extends Component {

    constructor(props) {

        super(props);

        this.onClick = this.onClick.bind(this);

        this.type = 'calendar-selector-item';
    }

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

    }

    getStates(props) {
        var states = super.getStates(props);
        states.selected = props.selected;

        return states;
    }

    render() {

        var props = this.props;

        var {
            date,
            onClick,
            mode,
            disabled,
            ...others
        } = props;


        return (
            <li
                {...others}
                onClick={disabled ? null : this.onClick}
                data-mode={mode}
                data-value={date}
                className={this.getClassName()} >
                <a href="#">
                    {mode === 'year' ? date.getFullYear() : DateTime.getShortMonth(date)}
                </a>
            </li>
        );
    }

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

}


CalendarSelectorItem.propTypes = {
    date: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    mode: PropTypes.oneOf(['month', 'year'])
};

module.exports = CalendarSelectorItem;
