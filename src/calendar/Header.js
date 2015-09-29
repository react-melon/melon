/**
 * @file Calendar/CalendarHeader
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Component = require('../Component');

var DateTime = require('../common/util/date');

var PropTypes = React.PropTypes;

class CalendarHeader extends Component {

    constructor(props) {

        super(props);

        this.onClick = this.onClick.bind(this);

        this.type = 'calendar-header';
    }

    render() {

        var date = this.props.date;

        var year = date.getFullYear();

        var week = DateTime.getDayOfWeek(date);
        var month = DateTime.getShortMonth(date);
        var day = date.getDate();

        var fullDate = month + day + '日';

        return (
            <div className={this.getClassName('header')} onClick={this.onClick}>
                <p className={this.getPartClassName('year')}>{year}</p>
                <p className={this.getPartClassName('week')}>{week}</p>
                <p className={this.getPartClassName('date')}>{fullDate}</p>
            </div>
        );
    }

    onClick(e) {
        var onClick = this.props.onClick;
        if (onClick) {
            onClick({
                target: this
            });
        }
    }

}


CalendarHeader.propTypes = {
    date: PropTypes.object.isRequired,
    onClick: PropTypes.func
};

module.exports = CalendarHeader;
