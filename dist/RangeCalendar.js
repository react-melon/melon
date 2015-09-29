define('melon/RangeCalendar', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './InputComponent',
    './Calendar',
    './TextBox',
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
    var TextBox = require('./TextBox');
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
            this.state = babelHelpers._extends({}, this.state, {
                open: false,
                month: _.clone(rawValue),
                date: rawValue,
                mode: [
                    'main',
                    'main'
                ]
            });
            this.onInputFocus = this.onInputFocus.bind(this);
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
                key: 'onInputFocus',
                value: function onInputFocus() {
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
                    var max = _props.max;
                    var min = _props.min;
                    min = index === 0 ? this.parseDate(min) : date[0];
                    max = index === 0 ? date[1] : this.parseDate(max);
                    mode[index] = e.mode === 'year' ? 'month' : 'main';
                    if (_.isDate(min) && DateTime.isBeforeDate(e.date, min)) {
                        date[index] = min;
                    } else if (_.isDate(max) && DateTime.isAfterDate(e.date, max)) {
                        date[index] = max;
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
                    value = value.split(' ');
                    return [
                        DateTime.parse(value[0], format),
                        DateTime.parse(value[2], format)
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
                        return value;
                    }
                    var format = this.props.dateFormat.toLowerCase();
                    return [
                        DateTime.format(rawValue[0], format, this.props.lang),
                        '\u81F3',
                        DateTime.format(rawValue[1], format, this.props.lang)
                    ].join(' ');
                }
            },
            {
                key: 'renderDialog',
                value: function renderDialog() {
                    var _state2 = this.state;
                    var date = _state2.date;
                    var month = _state2.month;
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
                    var min = _props2.min;
                    var max = _props2.max;
                    min = index === 0 ? this.parseDate(min) : date[0];
                    max = index === 0 ? date[1] : this.parseDate(max);
                    return React.createElement('div', { className: this.getPartClassName('main') }, React.createElement(Pager, {
                        minDate: min,
                        maxDate: max,
                        onChange: this.onPagerChange.bind(this, index),
                        month: month[index]
                    }), React.createElement(Month, {
                        minDate: min,
                        maxDate: max,
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
                    var min = _props3.min;
                    var max = _props3.max;
                    min = index === 0 ? this.parseDate(min) : date[0];
                    max = index === 0 ? date[1] : this.parseDate(max);
                    return React.createElement('div', { className: this.getPartClassName('main') }, React.createElement(Selector, {
                        date: date[index],
                        minDate: min,
                        maxDate: max,
                        mode: mode[index],
                        onChange: this.onSelectorChange.bind(this, index)
                    }));
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var lang = props.lang;
                    var placeholder = props.placeholder;
                    var disabled = props.disabled;
                    var others = babelHelpers.objectWithoutProperties(props, [
                        'lang',
                        'placeholder',
                        'disabled'
                    ]);
                    return React.createElement('div', babelHelpers._extends({}, others, { className: this.getClassName() }), React.createElement(TextBox, {
                        ref: 'input',
                        readOnly: true,
                        variants: ['calendar'],
                        value: this.getValue(),
                        disabled: disabled,
                        placeholder: placeholder,
                        onFocus: this.onInputFocus
                    }), this.renderDialog());
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
        max: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        min: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ])
    });
    module.exports = RangeCalendar;
});