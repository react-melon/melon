define('melon/RangeCalendar', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './InputComponent',
    './Calendar',
    './Icon',
    './calendar/Header',
    './calendar/Month',
    './calendar/Selector',
    './calendar/Pager',
    './dialog/Confirm',
    './common/util/date',
    'underscore'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var InputComponent = require('./InputComponent');
    var Calendar = require('./Calendar');
    var Icon = require('./Icon');
    var Header = require('./calendar/Header');
    var Month = require('./calendar/Month');
    var Selector = require('./calendar/Selector');
    var Pager = require('./calendar/Pager');
    var Confirm = require('./dialog/Confirm');
    var DateTime = require('./common/util/date');
    var _ = require('underscore');
    var PropTypes = React.PropTypes;
    var RangeCalendar = function (_InputComponent) {
        babelHelpers.inherits(RangeCalendar, _InputComponent);
        function RangeCalendar(props) {
            babelHelpers.classCallCheck(this, RangeCalendar);
            babelHelpers.get(Object.getPrototypeOf(RangeCalendar.prototype), 'constructor', this).call(this, props);
            var rawValue = this.state.rawValue;
            var begin = props.begin;
            var end = props.end;
            begin = this.parseDate(begin);
            end = this.parseDate(end);
            rawValue[0] = _.isDate(begin) && DateTime.isAfterDate(begin, rawValue[0]) ? begin : rawValue[0];
            rawValue[1] = _.isDate(end) && DateTime.isBeforeDate(end, rawValue[1]) ? end : rawValue[0];
            this.state = babelHelpers._extends({}, this.state, {
                open: false,
                month: _.clone(rawValue),
                date: rawValue,
                mode: [
                    'main',
                    'main'
                ]
            });
            this.onLabelClick = this.onLabelClick.bind(this);
            this.onHide = this.onHide.bind(this);
            this.onConfirm = this.onConfirm.bind(this);
        }
        babelHelpers.createClass(RangeCalendar, [
            {
                key: 'onHeaderClick',
                value: function onHeaderClick(index, e) {
                    var mode = this.state.mode;
                    mode[index] = mode[index] === 'main' ? 'year' : 'main';
                    this.setState({ mode: mode });
                }
            },
            {
                key: 'onLabelClick',
                value: function onLabelClick() {
                    if (this.props.disabled || this.props.readOnly) {
                        return;
                    }
                    this.setState({
                        open: true,
                        mode: [
                            'main',
                            'main'
                        ]
                    }, function () {
                        var onShow = this.props.onShow;
                        if (_.isFunction(onShow)) {
                            onShow({ target: this });
                        }
                    });
                }
            },
            {
                key: 'onHide',
                value: function onHide() {
                    this.setState({ open: false }, function () {
                        var onHide = this.props.onHide;
                        if (_.isFunction(onHide)) {
                            onHide({ target: this });
                        }
                    });
                }
            },
            {
                key: 'onDateChange',
                value: function onDateChange(index, e) {
                    var newDate = e.date;
                    var date = _.clone(this.state.date);
                    date[index] = newDate;
                    this.setState({
                        date: date,
                        month: date
                    });
                }
            },
            {
                key: 'onPagerChange',
                value: function onPagerChange(index, e) {
                    var newMonth = e.month;
                    var month = _.clone(this.state.month);
                    month[index] = newMonth;
                    this.setState({ month: month });
                }
            },
            {
                key: 'onSelectorChange',
                value: function onSelectorChange(index, e) {
                    var _state = this.state;
                    var mode = _state.mode;
                    var date = _state.date;
                    var _props = this.props;
                    var end = _props.end;
                    var begin = _props.begin;
                    begin = index === 0 ? this.parseDate(begin) : date[0];
                    end = index === 0 ? date[1] : this.parseDate(end);
                    mode[index] = e.mode === 'year' ? 'month' : 'main';
                    if (_.isDate(begin) && DateTime.isBeforeDate(e.date, begin)) {
                        date[index] = begin;
                    } else if (_.isDate(end) && DateTime.isAfterDate(e.date, end)) {
                        date[index] = end;
                    } else {
                        date[index] = e.date;
                    }
                    this.setState({
                        date: date,
                        month: date,
                        mode: mode
                    });
                }
            },
            {
                key: 'onConfirm',
                value: function onConfirm(e) {
                    var _this = this;
                    var dates = this.state.date;
                    var value = e.value;
                    if (!value || DateTime.isEqualDate(dates[0], this.state.rawValue[0]) && DateTime.isEqualDate(dates[1], this.state.rawValue[1])) {
                        this.setState({ open: false });
                        return;
                    }
                    this.setState({
                        rawValue: dates,
                        open: false
                    }, function () {
                        var e = {
                            type: 'change',
                            target: this,
                            value: this.stringifyValue(dates),
                            rawValue: dates
                        };
                        babelHelpers.get(Object.getPrototypeOf(RangeCalendar.prototype), 'onChange', _this).call(_this, e);
                        var onChange = this.props.onChange;
                        if (_.isFunction(onChange)) {
                            onChange(e);
                        }
                    });
                }
            },
            {
                key: 'parseValue',
                value: function parseValue(value) {
                    if (!_.isString(value)) {
                        return value;
                    }
                    var format = this.props.dateFormat.toLowerCase();
                    value = value.split(',');
                    return [
                        DateTime.parse(value[0], format),
                        DateTime.parse(value[1], format)
                    ];
                }
            },
            {
                key: 'parseDate',
                value: function parseDate(date) {
                    if (!_.isString(date)) {
                        return date;
                    }
                    var format = this.props.dateFormat.toLowerCase();
                    return DateTime.parse(date, format);
                }
            },
            {
                key: 'stringifyValue',
                value: function stringifyValue(rawValue) {
                    if (!_.isArray(rawValue)) {
                        return rawValue;
                    }
                    var format = this.props.dateFormat.toLowerCase();
                    return [
                        DateTime.format(rawValue[0], format, this.props.lang),
                        ',',
                        DateTime.format(rawValue[1], format, this.props.lang)
                    ].join('');
                }
            },
            {
                key: 'getStates',
                value: function getStates(props) {
                    var states = babelHelpers.get(Object.getPrototypeOf(RangeCalendar.prototype), 'getStates', this).call(this, props);
                    states.focus = this.state.open;
                    return states;
                }
            },
            {
                key: 'renderDialog',
                value: function renderDialog() {
                    var _state2 = this.state;
                    var date = _state2.date;
                    var mode = _state2.mode;
                    var open = _state2.open;
                    return React.createElement(Confirm, {
                        open: open,
                        variants: ['calendar'],
                        onConfirm: this.onConfirm,
                        size: this.props.size,
                        buttonVariants: [
                            'secondery',
                            'calendar'
                        ]
                    }, React.createElement('div', { className: this.getPartClassName('row') }, React.createElement(Header, {
                        date: date[0],
                        onClick: this.onHeaderClick.bind(this, 0)
                    }), React.createElement(Header, {
                        date: date[1],
                        onClick: this.onHeaderClick.bind(this, 1)
                    })), React.createElement('div', { className: this.getPartClassName('row') }, mode[0] === 'main' ? this.renderMain(0) : this.renderSelector(0), mode[1] === 'main' ? this.renderMain(1) : this.renderSelector(1)));
                }
            },
            {
                key: 'renderMain',
                value: function renderMain(index) {
                    var _state3 = this.state;
                    var date = _state3.date;
                    var month = _state3.month;
                    var _props2 = this.props;
                    var lang = _props2.lang;
                    var begin = _props2.begin;
                    var end = _props2.end;
                    begin = index === 0 ? this.parseDate(begin) : date[0];
                    end = index === 0 ? date[1] : this.parseDate(end);
                    return React.createElement('div', { className: this.getPartClassName('main') }, React.createElement(Pager, {
                        minDate: begin,
                        maxDate: end,
                        onChange: this.onPagerChange.bind(this, index),
                        month: month[index]
                    }), React.createElement(Month, {
                        minDate: begin,
                        maxDate: end,
                        lang: lang,
                        month: month[index],
                        date: date[index],
                        onChange: this.onDateChange.bind(this, index)
                    }));
                }
            },
            {
                key: 'renderSelector',
                value: function renderSelector(index) {
                    var _state4 = this.state;
                    var date = _state4.date;
                    var mode = _state4.mode;
                    var _props3 = this.props;
                    var begin = _props3.begin;
                    var end = _props3.end;
                    begin = index === 0 ? this.parseDate(begin) : date[0];
                    end = index === 0 ? date[1] : this.parseDate(end);
                    return React.createElement('div', { className: this.getPartClassName('main') }, React.createElement(Selector, {
                        date: date[index],
                        minDate: begin,
                        maxDate: end,
                        mode: mode[index],
                        onChange: this.onSelectorChange.bind(this, index)
                    }));
                }
            },
            {
                key: 'renderLabel',
                value: function renderLabel() {
                    var rawValue = this.state.rawValue;
                    var format = this.props.dateFormat.toLowerCase();
                    var str = [
                        DateTime.format(rawValue[0], format, this.props.lang),
                        ' \u81F3 ',
                        DateTime.format(rawValue[1], format, this.props.lang)
                    ].join(' ');
                    return React.createElement('label', { onClick: this.onLabelClick }, str, React.createElement(Icon, { icon: 'expand-more' }));
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var lang = props.lang;
                    var placeholder = props.placeholder;
                    var disabled = props.disabled;
                    var size = props.size;
                    var others = babelHelpers.objectWithoutProperties(props, [
                        'lang',
                        'placeholder',
                        'disabled',
                        'size'
                    ]);
                    return React.createElement('div', babelHelpers._extends({}, others, { className: this.getClassName() }), React.createElement('input', {
                        ref: 'input',
                        type: 'hidden',
                        value: this.getValue(),
                        disabled: disabled,
                        size: size,
                        placeholder: placeholder
                    }), this.renderLabel(), this.renderDialog());
                }
            }
        ]);
        return RangeCalendar;
    }(InputComponent);
    RangeCalendar.defaultProps = babelHelpers._extends({}, Calendar.defaultProps, {
        defaultValue: [
            DateTime.format(new Date(), 'yyyy-mm-dd', Calendar.LANG),
            '\u81F3',
            DateTime.format(DateTime.addMonths(new Date(), 1), 'yyyy-mm-dd', Calendar.LANG)
        ].join(' ')
    });
    RangeCalendar.propTypes = babelHelpers._extends({}, Calendar.propTypes, {
        rawValue: PropTypes.arrayOf(PropTypes.object),
        autoOk: PropTypes.bool,
        dateFormat: PropTypes.string,
        begin: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        end: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ])
    });
    module.exports = RangeCalendar;
});