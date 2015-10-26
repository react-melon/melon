/**
 * @file Calendar/CalendarDay
 * @author cxtom(cxtom2010@gmail.com)
 */

var React = require('react');

var Component = require('../Component');
var DateTime = require('../common/util/date');

var PropTypes = React.PropTypes;

class CalendarDay extends Component {

    static displayName = 'CalendarDay';

    constructor(props) {

        super(props);

        this.onClick = this.onClick.bind(this);

        this.type = 'calendar-day';
    }

    shouldComponentUpdate(nextProps) {

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

    getVariants(props) {

        var variants = super.getVariants(props);

        var date = props.date;

        if (DateTime.isEqualDate(date, new Date())) {
            variants.push('today');
        }

        return variants;
    }

    render() {

        var props = this.props;

        var {
            date,
            onClick,
            ...others
        } = props;


        return (
            <a
                {...others}
                className={this.getClassName()}
                href="#"
                onClick={this.onClick} >
                {date.getDate()}
            </a>
        );
    }

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
    }

}


CalendarDay.propTypes = {
    date: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    selected: PropTypes.bool
};

module.exports = CalendarDay;
