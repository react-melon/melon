/**
 * @file CalendarDialog
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');
var Dialog = require('../Dialog.jsx');
var createControl = require('../common/util/createControl');
var Button = require('../Button.jsx');
var _ = require('underscore');
var cx = require('../common/util/classname');
var DateTime = require('../common/util/date');
var CalendarMain = require('./Main.jsx');
var mainListenable = require('../mixins/main-listenable');

var PropTypes = React.PropTypes;

var CalendarDialog = React.createClass({

    mixins: [mainListenable],

    propTypes: {
        initialDate: PropTypes.object.isRequired,
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
    },

    windowListeners: {
        click: 'onMainClick'
    },

    getInitialState: function () {

        var props = this.props;

        return {
            isOpen: props.isOpen || false,
            value: props.initialDate,
            month: props.initialDate
        };
    },

    componentWillReceiveProps: function (nextProps) {

        var {
            isOpen,
            initialDate
        } = nextProps;

        var newState = {};
        var onEvent;

        if (isOpen == !this.state.isOpen) {
            onEvent = isOpen ? this.props.onShow : this.props.onHide;
            onEvent = _.isFunction(onEvent) ? onEvent : _.noop;
            newState.isOpen = isOpen;
        }

        if (isOpen) {
            newState.value = initialDate;
            newState.month = initialDate;
        }

        if (_.isEmpty(newState)) {
            return;
        }

        this.setState(newState, function () {
            if (_.isBoolean(newState.isOpen)) {
                onEvent();
            }
        })
    },

    handleCancelclick: function () {
        this.setState({isOpen: false}, function () {
            _.isFunction(this.props.onHide) ? this.props.onHide() : null;
        });
    },

    handleSubmitclick: function () {
        var value = this.state.value;
        var onChange = this.props.onChange;
        if (onChange) {
            onChange({
                target: this,
                value: value
            });
        }
    },

    getHeader: function () {
        var date = this.state.value

        var year = date.getFullYear();

        var week = DateTime.getDayOfWeek(date);
        var month = DateTime.getShortMonth(date);
        var day = date.getDate();

        var fullDate = week + '  ' + month + day + '日';

        return (
            <div className={cx.createComponentClass('calendar-dialog-header')}>
                <p className={cx.createComponentClass('calendar-dialog-header-year')}>{year}</p>
                <p className={cx.createComponentClass('calendar-dialog-header-date')}>{fullDate}</p>
            </div>
        );
    },

    onMainClick: function (e) {

        e = e || window.event;
        var target = e.target || e.srcElement;

        if (!this.isMounted()) {
            return;
        }

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
                value: new Date(newMonth.getFullYear(), newMonth.getMonth(), d),
                month: newMonth
            });
        }
    },

    render: function () {
        var props = this.props;

        var actions = [
            <Button label="取消" variants={['secondery', 'calendar']} key="cancel" onClick={this.handleCancelclick} />,
            <Button label="确定" variants={['secondery', 'calendar']} key="submit" onClick={this.handleSubmitclick}  />
        ];

        return (
            <Dialog
                {...props}
                isOpen={this.state.isOpen}
                variants={['calendar']}
                actions={actions} >
                {this.getHeader()}
                <CalendarMain
                    ref="main"
                    minDate={props.minDate}
                    maxDate={props.maxDate}
                    lang={props.lang}
                    month={this.state.month}
                    value={this.state.value} />
            </Dialog>
        );
    }

});

module.exports = createControl(CalendarDialog);
