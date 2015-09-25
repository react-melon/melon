define('melon/calendar/CalendarDialog', [
    'exports',
    '../babelHelpers',
    'react',
    '../Dialog',
    '../Button',
    './Main',
    './Select',
    '../MainClickAware',
    'underscore',
    '../common/util/date'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Dialog = require('../Dialog');
    var Button = require('../Button');
    var CalendarMain = require('./Main');
    var CalendarSelect = require('./Select');
    var MainClickAware = require('../MainClickAware');
    var _ = require('underscore');
    var DateTime = require('../common/util/date');
    var PropTypes = React.PropTypes;
    var CalendarDialog = function (_MainClickAware) {
        babelHelpers.inherits(CalendarDialog, _MainClickAware);
        function CalendarDialog(props) {
            babelHelpers.classCallCheck(this, CalendarDialog);
            babelHelpers.get(Object.getPrototypeOf(CalendarDialog.prototype), 'constructor', this).call(this, props);
            this.state = {
                open: props.open || false,
                date: props.date,
                month: props.date,
                mode: 'main'
            };
            this.handleCancelclick = this.handleCancelclick.bind(this);
            this.handleSubmitclick = this.handleSubmitclick.bind(this);
            this.onSelectorChange = this.onSelectorChange.bind(this);
            this.onHeaderClick = this.onHeaderClick.bind(this);
            this.type = 'calendar-dialog';
        }
        babelHelpers.createClass(CalendarDialog, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var open = nextProps.open;
                    var date = nextProps.date;
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
                        newState.mode = 'main';
                    }
                    if (_.isEmpty(newState)) {
                        return;
                    }
                    this.setState(newState, function () {
                        if (_.isBoolean(newState.open)) {
                            onEvent();
                        }
                    });
                }
            },
            {
                key: 'handleCancelclick',
                value: function handleCancelclick() {
                    this.setState({ open: false }, function () {
                        _.isFunction(this.props.onHide) ? this.props.onHide() : null;
                    });
                }
            },
            {
                key: 'handleSubmitclick',
                value: function handleSubmitclick() {
                    var date = this.state.date;
                    var onChange = this.props.onChange;
                    if (onChange) {
                        onChange({
                            target: this,
                            date: date
                        });
                    }
                }
            },
            {
                key: 'onHeaderClick',
                value: function onHeaderClick(e) {
                    var mode = this.state.mode;
                    this.setState({ mode: mode === 'main' ? 'selector' : 'main' });
                }
            },
            {
                key: 'onSelectorChange',
                value: function onSelectorChange(e) {
                    var mode = e.mode;
                    var date = e.date;
                    var newState = {
                        date: date,
                        month: date
                    };
                    if (mode === 'month') {
                        newState.mode = 'main';
                    }
                    this.setState(newState);
                }
            },
            {
                key: 'onMainClick',
                value: function onMainClick(e) {
                    e = e || window.event;
                    var target = e.target || e.srcElement;
                    var target = e.target;
                    var role = target.getAttribute('data-role');
                    if (!role) {
                        return;
                    }
                    var month = this.state.month;
                    if (role === 'pager') {
                        var _props = this.props;
                        var minDate = _props.minDate;
                        var maxDate = _props.maxDate;
                        var action = target.getAttribute('data-action');
                        var newMonth = DateTime.addMonths(month, action === 'next' ? 1 : -1);
                        if (_.isDate(minDate) && DateTime.isBeforeMonth(newMonth, minDate) || _.isDate(maxDate) && DateTime.isAfterMonth(newMonth, maxDate)) {
                            return;
                        }
                        this.setState({ month: newMonth });
                    } else if (role === 'day') {
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
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var actions = [
                        React.createElement(Button, {
                            label: '\u53D6\u6D88',
                            variants: [
                                'secondery',
                                'calendar'
                            ],
                            key: 'cancel',
                            onClick: this.handleCancelclick
                        }),
                        React.createElement(Button, {
                            label: '\u786E\u5B9A',
                            variants: [
                                'secondery',
                                'calendar'
                            ],
                            key: 'submit',
                            onClick: this.handleSubmitclick
                        })
                    ];
                    var lang = props.lang;
                    var others = babelHelpers.objectWithoutProperties(props, ['lang']);
                    var isMain = this.state.mode === 'main';
                    return React.createElement(Dialog, babelHelpers._extends({}, others, {
                        open: this.state.open,
                        variants: ['calendar'],
                        actions: actions
                    }), this.renderHeader(), isMain ? React.createElement(CalendarMain, {
                        ref: 'main',
                        minDate: props.minDate,
                        maxDate: props.maxDate,
                        lang: lang,
                        month: this.state.month,
                        date: this.state.date
                    }) : React.createElement(CalendarSelect, {
                        ref: 'selector',
                        date: this.state.date,
                        minDate: props.minDate,
                        maxDate: props.maxDate,
                        onChange: this.onSelectorChange
                    }));
                }
            },
            {
                key: 'renderHeader',
                value: function renderHeader() {
                    var date = this.state.date;
                    var year = date.getFullYear();
                    var week = DateTime.getDayOfWeek(date);
                    var month = DateTime.getShortMonth(date);
                    var day = date.getDate();
                    var fullDate = week + '  ' + month + day + '\u65E5';
                    return React.createElement('div', {
                        className: this.getPartClassName('header'),
                        onClick: this.onHeaderClick
                    }, React.createElement('p', { className: this.getPartClassName('header-year') }, year), React.createElement('p', { className: this.getPartClassName('header-date') }, fullDate));
                }
            }
        ]);
        return CalendarDialog;
    }(MainClickAware);
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
    };
    module.exports = CalendarDialog;
});