define('melon/Calendar', [
    'exports',
    './babelHelpers',
    'react',
    './InputComponent',
    './common/util/date',
    './TextBox',
    './calendar/CalendarDialog',
    'underscore'
], function (exports) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var InputComponent = require('./InputComponent');
    var DateTime = require('./common/util/date');
    var TextBox = require('./TextBox');
    var CalendarDialog = require('./calendar/CalendarDialog');
    var _ = require('underscore');
    var PropTypes = React.PropTypes;
    var Calendar = function (_InputComponent) {
        babelHelpers.inherits(Calendar, _InputComponent);
        function Calendar(props) {
            babelHelpers.classCallCheck(this, Calendar);
            babelHelpers.get(Object.getPrototypeOf(Calendar.prototype), 'constructor', this).call(this, props);
            var open = false;
            this.state = babelHelpers._extends({}, this.state, { open: open });
            this.handleInputFocus = this.handleInputFocus.bind(this);
            this.handleDialogHide = this.handleDialogHide.bind(this);
            this.handleOnChange = this.handleOnChange.bind(this);
        }
        babelHelpers.createClass(Calendar, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.setState({
                        date: nextProps.date,
                        month: nextProps.month
                    });
                }
            },
            {
                key: 'getStates',
                value: function getStates(props) {
                    var states = babelHelpers.get(Object.getPrototypeOf(Calendar.prototype), 'getStates', this).call(this, props);
                    var disabled = props.disabled;
                    var readOnly = props.readOnly;
                    states = babelHelpers._extends({}, states, {
                        disabled: disabled,
                        readOnly: readOnly
                    });
                    return states;
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
                key: 'handleInputFocus',
                value: function handleInputFocus() {
                    if (this.props.disabled || this.props.readOnly) {
                        return;
                    }
                    this.setState({ open: true }, function () {
                        var onShow = this.props.onShow;
                        if (_.isFunction(onShow)) {
                            onShow({ target: this });
                        }
                    });
                }
            },
            {
                key: 'handleDialogHide',
                value: function handleDialogHide() {
                    this.setState({ open: false }, function () {
                        var onHide = this.props.onHide;
                        if (_.isFunction(onHide)) {
                            onHide({ target: this });
                        }
                    });
                }
            },
            {
                key: 'handleOnChange',
                value: function handleOnChange(e) {
                    var _this = this;
                    var date = e.date;
                    if (DateTime.isEqualDate(date, this.state.rawValue)) {
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
                        onFocus: this.handleInputFocus
                    }), React.createElement(CalendarDialog, {
                        ref: 'dialogWindow',
                        open: this.state.open,
                        date: this.state.rawValue,
                        onHide: this.handleDialogHide,
                        minDate: this.parseValue(props.min),
                        maxDate: this.parseValue(props.max),
                        lang: lang,
                        onChange: this.handleOnChange
                    }));
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