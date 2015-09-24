/**
 * @file CalendarDialog
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');
var Dialog = require('../Dialog.jsx');
var Button = require('../Button.jsx');
var CalendarMain = require('./Main.jsx');
var MainClickAware = require('../MainClickAware.jsx');

var _ = require('underscore');
var DateTime = require('../common/util/date');

var PropTypes = React.PropTypes;

class CalendarDialog extends MainClickAware {

    constructor(props) {

        super(props);

        this.state = {
            open: props.open || false,
            date: props.date,
            month: props.date
        };

        this.handleCancelclick = this.handleCancelclick.bind(this);
        this.handleSubmitclick = this.handleSubmitclick.bind(this);

        this.type = 'calendar-dialog';
    }

    componentWillReceiveProps(nextProps) {

        var {
            open,
            date
        } = nextProps;

        var newState = {};
        var onEvent;

        if (open == !this.state.open) {
            onEvent = open ? this.props.onShow : this.props.onHide;
            onEvent = _.isFunction(onEvent) ? onEvent : _.noop;
            newState.open = open;
        }

        if (open) {
            newState.date = date;
            newState.month = date;
        }

        if (_.isEmpty(newState)) {
            return;
        }

        this.setState(newState, function () {
            if (_.isBoolean(newState.open)) {
                onEvent();
            }
        })
    }

    handleCancelclick() {
        this.setState({open: false}, function () {
            _.isFunction(this.props.onHide) ? this.props.onHide() : null;
        });
    }

    handleSubmitclick() {
        var date = this.state.date;
        var onChange = this.props.onChange;
        if (onChange) {
            onChange({
                target: this,
                date: date
            });
        }
    }

    onMainClick(e) {

        e = e || window.event;
        var target = e.target || e.srcElement;

        // if (!this.isMounted()) {
        //     return;
        // }

        var target = e.target;
        var role = target.getAttribute('data-role');

        if (!role) {
            return;
        }

        var month = this.state.month;

        if (role === 'pager') {
            var {
                minDate,
                maxDate
            } = this.props;

            var action = target.getAttribute('data-action');
            var newMonth = DateTime.addMonths(month, action === 'next' ? 1 : -1);

            if ((_.isDate(minDate) && DateTime.isBeforeMonth(newMonth, minDate))
                || (_.isDate(maxDate) && DateTime.isAfterMonth(newMonth, maxDate))) {
                return;
            }

            this.setState({
                month: newMonth
            });
        }
        else if (role === 'day') {
            if (target.className.indexOf('state-disabled') >= 0) {
                return;
            }

            var d = target.innerHTML - 0;
            var m = target.getAttribute('data-month') - 0;

            var newMonth = DateTime.addMonths(month, m);

            this.setState({
                date: new Date(newMonth.getFullYear(), newMonth.getMonth(), d),
                month: newMonth
            });
        }
    }

    render() {
        let props = this.props;

        let actions = [
            <Button label="取消" variants={['secondery', 'calendar']} key="cancel" onClick={this.handleCancelclick} />,
            <Button label="确定" variants={['secondery', 'calendar']} key="submit" onClick={this.handleSubmitclick}  />
        ];

        let {
            lang,
            ...others
        } = props;

        return (
            <Dialog
                {...others}
                open={this.state.open}
                variants={['calendar']}
                actions={actions} >
                {this.renderHeader()}
                <CalendarMain
                    ref="main"
                    minDate={props.minDate}
                    maxDate={props.maxDate}
                    lang={lang}
                    month={this.state.month}
                    date={this.state.date} />
            </Dialog>
        );
    }

    renderHeader() {
        var date = this.state.date

        var year = date.getFullYear();

        var week = DateTime.getDayOfWeek(date);
        var month = DateTime.getShortMonth(date);
        var day = date.getDate();

        var fullDate = week + '  ' + month + day + '日';

        return (
            <div className={this.getPartClassName('header')}>
                <p className={this.getPartClassName('header-year')}>{year}</p>
                <p className={this.getPartClassName('header-date')}>{fullDate}</p>
            </div>
        );
    }
}

CalendarDialog.propTypes = {
    date: PropTypes.object.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onHide: PropTypes.func,
    onChange: PropTypes.func,
    onShow: PropTypes.func,
    lang: PropTypes.shape({
        week: PropTypes.string,
        days: PropTypes.string,
        title: PropTypes.string
    })
}

module.exports = CalendarDialog;
