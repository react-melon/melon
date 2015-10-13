/**
 * @file Calendar/CalendarPager
 * @author cxtom(cxtom2010@gmail.com)
 */

var React = require('react');

var Component = require('../Component');
var Icon = require('../Icon');

var _ = require('underscore');
var DateTime = require('../common/util/date');

var PropTypes = React.PropTypes;

class CalendarPager extends Component {

    constructor(props) {

        super(props);

        this.onClick = this.onClick.bind(this);

        this.type = 'calendar-pager';
    }

    render() {

        var {
            maxDate,
            minDate,
            month
        } = this.props;

        var m = month.getMonth() + 1;
        var y = month.getFullYear();

        var beforeState = {
            disabled: _.isDate(minDate) && DateTime.isBeforeMonth(DateTime.addMonths(month, -1), minDate)
        };

        var nextState = {
            disabled: _.isDate(maxDate) && DateTime.isAfterMonth(DateTime.addMonths(month, 1), maxDate)
        };

        return (
            <div className={this.getClassName()}>
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
    }

    onClick(e) {

        var target = e.currentTarget;
        var month = this.props.month;

        var action = target.getAttribute('data-action');
        var newMonth = DateTime.addMonths(month, action === 'next' ? 1 : -1);

        var onChange = this.props.onChange;
        if (onChange) {
            onChange({
                target: this,
                month: newMonth
            });
        }
    }

}


CalendarPager.propTypes = {
    month: PropTypes.object.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onChange: PropTypes.func
};

module.exports = CalendarPager;
