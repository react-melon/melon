define('melon/Calendar', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './InputComponent',
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
    var Icon = require('./Icon');
    var Header = require('./calendar/Header');
    var Month = require('./calendar/Month');
    var Selector = require('./calendar/Selector');
    var Pager = require('./calendar/Pager');
    var Confirm = require('./dialog/Confirm');
    var DateTime = require('./common/util/date');
    var _ = require('underscore');
    var PropTypes = React.PropTypes;
    var Calendar = function (_InputComponent) {
        babelHelpers.inherits(Calendar, _InputComponent);
        babelHelpers.createClass(Calendar, null, [{
                key: 'displayName',
                value: 'Calendar',
                enumerable: true
            }]);
        function Calendar(props) {
            babelHelpers.classCallCheck(this, Calendar);
            babelHelpers.get(Object.getPrototypeOf(Calendar.prototype), 'constructor', this).call(this, props);
            var rawValue = this.state.rawValue;
            var begin = props.begin;
            var end = props.end;
            begin = this.parseDate(begin);
            end = this.parseDate(end);
            rawValue = _.isDate(begin) && DateTime.isAfterDate(begin, rawValue) ? begin : rawValue;
            rawValue = _.isDate(end) && DateTime.isBeforeDate(end, rawValue) ? end : rawValue;
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
            this.onLabelClick = this.onLabelClick.bind(this);
            this.onHide = this.onHide.bind(this);
            this.onConfirm = this.onConfirm.bind(this);
            this.onHeaderClick = this.onHeaderClick.bind(this);
            this.onSelectorChange = this.onSelectorChange.bind(this);
            this.onPagerChange = this.onPagerChange.bind(this);
            this.onDateChange = this.onDateChange.bind(this);
        }
        babelHelpers.createClass(Calendar, [
            {
                key: 'parseValue',
                value: function parseValue(value) {
                    return this.parseDate(value);
                }
            },
            {
                key: 'stringifyValue',
                value: function stringifyValue(rawValue) {
                    if (!_.isDate(rawValue)) {
                        return rawValue;
                    }
                    var format = this.props.dateFormat.toLowerCase();
                    return DateTime.format(rawValue, format, this.props.lang);
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
                key: 'getStates',
                value: function getStates(props) {
                    var states = babelHelpers.get(Object.getPrototypeOf(Calendar.prototype), 'getStates', this).call(this, props);
                    states.focus = this.state.open;
                    return states;
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
                    var _props = this.props;
                    var end = _props.end;
                    var begin = _props.begin;
                    begin = this.parseDate(begin);
                    end = this.parseDate(end);
                    mode = mode === 'year' ? 'month' : 'main';
                    if (_.isDate(begin) && DateTime.isBeforeDate(date, begin)) {
                        date = begin;
                    } else if (_.isDate(end) && DateTime.isAfterDate(date, end)) {
                        date = end;
                    }
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
                    var lang = props.lang;
                    var placeholder = props.placeholder;
                    var disabled = props.disabled;
                    var size = props.size;
                    var name = props.name;
                    var others = babelHelpers.objectWithoutProperties(props, [
                        'lang',
                        'placeholder',
                        'disabled',
                        'size',
                        'name'
                    ]);
                    return React.createElement('div', babelHelpers._extends({}, others, { className: this.getClassName() }), React.createElement('input', {
                        name: name,
                        ref: 'input',
                        type: 'hidden',
                        value: this.getValue(),
                        disabled: disabled,
                        size: size,
                        placeholder: placeholder
                    }), this.renderLabel(), this.renderDialog(), this.renderValidateMessage());
                }
            },
            {
                key: 'renderLabel',
                value: function renderLabel() {
                    var rawValue = this.state.rawValue;
                    var format = this.props.dateFormat.toLowerCase();
                    return React.createElement('label', { onClick: this.onLabelClick }, DateTime.format(rawValue, format, this.props.lang), React.createElement(Icon, { icon: 'expand-more' }));
                }
            },
            {
                key: 'renderDialog',
                value: function renderDialog() {
                    var _state = this.state;
                    var date = _state.date;
                    var mode = _state.mode;
                    var open = _state.open;
                    var isMain = mode === 'main';
                    return React.createElement(Confirm, {
                        open: open,
                        variants: ['calendar'],
                        onConfirm: this.onConfirm,
                        size: this.props.size,
                        buttonVariants: [
                            'secondery',
                            'calendar'
                        ]
                    }, React.createElement(Header, {
                        date: date,
                        onClick: this.onHeaderClick
                    }), isMain ? this.renderMain() : this.renderSelector());
                }
            },
            {
                key: 'renderMain',
                value: function renderMain() {
                    var _state2 = this.state;
                    var date = _state2.date;
                    var month = _state2.month;
                    var _props2 = this.props;
                    var lang = _props2.lang;
                    var begin = _props2.begin;
                    var end = _props2.end;
                    begin = this.parseDate(begin);
                    end = this.parseDate(end);
                    return React.createElement('div', { className: this.getPartClassName('main') }, React.createElement(Pager, {
                        minDate: begin,
                        maxDate: end,
                        onChange: this.onPagerChange,
                        month: month
                    }), React.createElement(Month, {
                        minDate: begin,
                        maxDate: end,
                        lang: lang,
                        month: month,
                        date: date,
                        onChange: this.onDateChange
                    }));
                }
            },
            {
                key: 'renderSelector',
                value: function renderSelector() {
                    var _state3 = this.state;
                    var date = _state3.date;
                    var mode = _state3.mode;
                    var _props3 = this.props;
                    var begin = _props3.begin;
                    var end = _props3.end;
                    begin = this.parseDate(begin);
                    end = this.parseDate(end);
                    return React.createElement(Selector, {
                        date: date,
                        minDate: begin,
                        maxDate: end,
                        mode: mode,
                        onChange: this.onSelectorChange
                    });
                }
            }
        ]);
        return Calendar;
    }(InputComponent);
    Calendar.LANG = {
        week: '\u5468',
        days: '\u65E5,\u4E00,\u4E8C,\u4E09,\u56DB,\u4E94,\u516D'
    };
    Calendar.defaultProps = babelHelpers._extends({}, InputComponent.defaultProps, {
        defaultValue: DateTime.format(new Date(), 'yyyy-mm-dd', Calendar.LANG),
        dateFormat: 'yyyy-MM-dd',
        lang: Calendar.LANG,
        validateEvents: ['change']
    });
    Calendar.propTypes = {
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        rawValue: PropTypes.object,
        value: PropTypes.string,
        autoOk: PropTypes.bool,
        dateFormat: PropTypes.string,
        end: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        begin: PropTypes.oneOfType([
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