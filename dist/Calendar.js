define('melon/Calendar', [
    'exports',
    './babelHelpers',
    'react',
    './InputComponent',
    './TextBox',
    './calendar/Header',
    './calendar/Main',
    './calendar/Selector',
    './calendar/Pager',
    './dialog/Confirm',
    './common/util/date',
    'underscore'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var InputComponent = require('./InputComponent');
    var TextBox = require('./TextBox');
    var Header = require('./calendar/Header');
    var Main = require('./calendar/Main');
    var Selector = require('./calendar/Selector');
    var Pager = require('./calendar/Pager');
    var Confirm = require('./dialog/Confirm');
    var DateTime = require('./common/util/date');
    var _ = require('underscore');
    var PropTypes = React.PropTypes;
    var Calendar = function (_InputComponent) {
        babelHelpers.inherits(Calendar, _InputComponent);
        function Calendar(props) {
            babelHelpers.classCallCheck(this, Calendar);
            babelHelpers.get(Object.getPrototypeOf(Calendar.prototype), 'constructor', this).call(this, props);
            var rawValue = this.state.rawValue;
            var open = false;
            var month = rawValue;
            var mode = 'main';
            var date = rawValue;
            this.state = babelHelpers._extends({}, this.state, {
                open: open,
                month: month,
                mode: mode,
                date: date
            });
            this.onInputFocus = this.onInputFocus.bind(this);
            this.onHide = this.onHide.bind(this);
            this.onConfirm = this.onConfirm.bind(this);
            this.onHeaderClick = this.onHeaderClick.bind(this);
            this.onSelectorChange = this.onSelectorChange.bind(this);
            this.onPagerChange = this.onPagerChange.bind(this);
            this.onDateChange = this.onDateChange.bind(this);
        }
        babelHelpers.createClass(Calendar, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({
                        date: nextProps.date,
                        month: nextProps.date
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
                    return DateTime.parse(value, format);
                }
            },
            {
                key: 'stringifyValue',
                value: function stringifyValue(rawValue) {
                    if (!_.isDate(rawValue)) {
                        return value;
                    }
                    var format = this.props.dateFormat.toLowerCase();
                    return DateTime.format(rawValue, format, this.props.lang);
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
                        mode: 'main'
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
                key: 'onConfirm',
                value: function onConfirm(e) {
                    var _this = this;
                    var date = this.state.date;
                    var value = e.value;
                    if (!value || DateTime.isEqualDate(date, this.state.rawValue)) {
                        this.setState({ open: false });
                        return;
                    }
                    this.setState({
                        rawValue: date,
                        open: false
                    }, function () {
                        var e = {
                            type: 'change',
                            target: this,
                            value: this.stringifyValue(date),
                            rawValue: date
                        };
                        babelHelpers.get(Object.getPrototypeOf(Calendar.prototype), 'onChange', _this).call(_this, e);
                        var onChange = this.props.onChange;
                        if (_.isFunction(onChange)) {
                            onChange(e);
                        }
                    });
                }
            },
            {
                key: 'onHeaderClick',
                value: function onHeaderClick(e) {
                    var mode = this.state.mode;
                    this.setState({ mode: mode === 'main' ? 'year' : 'main' });
                }
            },
            {
                key: 'onSelectorChange',
                value: function onSelectorChange(e) {
                    var mode = e.mode;
                    var date = e.date;
                    mode = mode === 'year' ? 'month' : 'main';
                    this.setState({
                        date: date,
                        month: date,
                        mode: mode
                    });
                }
            },
            {
                key: 'onPagerChange',
                value: function onPagerChange(e) {
                    var month = e.month;
                    this.setState({ month: month });
                }
            },
            {
                key: 'onDateChange',
                value: function onDateChange(e) {
                    var date = e.date;
                    var autoOk = this.props.autoOk;
                    this.setState({
                        date: date,
                        month: date
                    }, function () {
                        if (autoOk) {
                            this.onConfirm({ value: true });
                        }
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var state = this.state;
                    var lang = props.lang;
                    var placeholder = props.placeholder;
                    var disabled = props.disabled;
                    var others = babelHelpers.objectWithoutProperties(props, [
                        'lang',
                        'placeholder',
                        'disabled'
                    ]);
                    var date = state.date;
                    var mode = state.mode;
                    var open = state.open;
                    var isMain = mode === 'main';
                    return React.createElement('div', babelHelpers._extends({}, others, { className: this.getClassName() }), React.createElement(TextBox, {
                        ref: 'input',
                        readOnly: true,
                        variants: ['calendar'],
                        value: this.getValue(),
                        disabled: disabled,
                        placeholder: placeholder,
                        onFocus: this.onInputFocus
                    }), React.createElement(Confirm, {
                        open: open,
                        variants: ['calendar'],
                        onConfirm: this.onConfirm,
                        buttonVariants: [
                            'secondery',
                            'calendar'
                        ]
                    }, React.createElement(Header, {
                        date: date,
                        onClick: this.onHeaderClick
                    }), isMain ? this.renderMain() : this.renderSelector()));
                }
            },
            {
                key: 'renderMain',
                value: function renderMain() {
                    var _props = this.props;
                    var lang = _props.lang;
                    var min = _props.min;
                    var max = _props.max;
                    var _state = this.state;
                    var date = _state.date;
                    var month = _state.month;
                    return [
                        React.createElement(Pager, {
                            minDate: this.parseValue(min),
                            maxDate: this.parseValue(max),
                            key: 'pager',
                            onChange: this.onPagerChange,
                            month: month
                        }),
                        React.createElement(Main, {
                            minDate: this.parseValue(min),
                            maxDate: this.parseValue(max),
                            key: 'main',
                            lang: lang,
                            month: month,
                            date: date,
                            onChange: this.onDateChange
                        })
                    ];
                }
            },
            {
                key: 'renderSelector',
                value: function renderSelector() {
                    var _props2 = this.props;
                    var min = _props2.min;
                    var max = _props2.max;
                    var _state2 = this.state;
                    var date = _state2.date;
                    var mode = _state2.mode;
                    return React.createElement(Selector, {
                        date: date,
                        minDate: this.parseValue(min),
                        maxDate: this.parseValue(max),
                        mode: mode,
                        onChange: this.onSelectorChange
                    });
                }
            }
        ]);
        return Calendar;
    }(InputComponent);
    var lang = {
        week: '\u5468',
        days: '\u65E5,\u4E00,\u4E8C,\u4E09,\u56DB,\u4E94,\u516D'
    };
    Calendar.defaultProps = babelHelpers._extends({}, InputComponent.defaultProps, {
        defaultValue: DateTime.format(new Date(), 'yyyy-mm-dd', lang),
        dateFormat: 'yyyy-MM-dd',
        showYearSelector: false,
        lang: lang,
        validateEvents: ['change']
    });
    Calendar.propTypes = {
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        rawValue: PropTypes.object,
        value: PropTypes.string,
        autoOk: PropTypes.bool,
        dateFormat: PropTypes.string,
        max: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        min: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        onHide: PropTypes.func,
        onChange: PropTypes.func,
        onShow: PropTypes.func,
        placeholder: PropTypes.string,
        lang: PropTypes.shape({
            week: PropTypes.string,
            days: PropTypes.string
        })
    };
    module.exports = Calendar;
});