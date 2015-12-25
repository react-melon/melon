define('melon/Calendar', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'underscore',
    'react',
    './common/util/cxBuilder',
    './Icon',
    './dialog/Confirm',
    './calendar/Panel',
    './common/util/date',
    './Validity',
    './createInputComponent'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var _ = require('underscore');
    var React = require('react');
    var PropTypes = React.PropTypes;
    var cx = require('./common/util/cxBuilder').create('Calendar');
    var Icon = require('./Icon');
    var Confirm = require('./dialog/Confirm');
    var Panel = require('./calendar/Panel');
    var DateTime = require('./common/util/date');
    var Validity = require('./Validity');
    var Calendar = React.createClass({
        displayName: 'Calendar',
        getInitialState: function () {
            return {
                date: this.parseDate(this.props.value),
                open: false
            };
        },
        componentWillReceiveProps: function (nextProps) {
            var value = nextProps.value;
            if (value !== this.props.value) {
                this.setState({ date: this.parseDate(value) });
            }
        },
        parseValue: function (value) {
            return this.parseDate(value);
        },
        stringifyValue: function (rawValue) {
            if (!_.isDate(rawValue)) {
                return rawValue;
            }
            var format = this.props.dateFormat.toLowerCase();
            return DateTime.format(rawValue, format, this.props.lang);
        },
        parseDate: function (date) {
            if (!_.isString(date)) {
                return date;
            }
            var format = this.props.dateFormat.toLowerCase();
            return DateTime.parse(date, format);
        },
        getValue: function () {
            return this.stringifyValue(this.props.value);
        },
        onLabelClick: function () {
            if (this.props.disabled || this.props.readOnly) {
                return;
            }
            this.setState({ open: true });
        },
        onConfirm: function () {
            var _this = this;
            var _state = this.state;
            var value = _state.value;
            var date = _state.date;
            if (DateTime.isEqualDate(date, value)) {
                this.setState({ open: false });
                return;
            }
            this.setState({ open: false }, function () {
                _this.props.onChange({
                    type: 'change',
                    target: _this,
                    value: _this.stringifyValue(date)
                });
            });
        },
        onCancel: function () {
            this.setState({ open: false });
        },
        onDateChange: function (e) {
            var _this2 = this;
            var value = e.value;
            var autoConfirm = this.props.autoConfirm;
            this.setState({ date: value }, function () {
                if (autoConfirm) {
                    _this2.onConfirm();
                }
            });
        },
        render: function () {
            var state = this.state;
            var props = this.props;
            var lang = props.lang;
            var value = props.value;
            var disabled = props.disabled;
            var size = props.size;
            var name = props.name;
            var dateFormat = props.dateFormat;
            var validity = props.validity;
            var others = babelHelpers.objectWithoutProperties(props, [
                'lang',
                'value',
                'disabled',
                'size',
                'name',
                'dateFormat',
                'validity'
            ]);
            var begin = props.begin;
            var end = props.end;
            begin = this.parseDate(begin);
            end = this.parseDate(end);
            var open = state.open;
            var date = state.date;
            return React.createElement('div', babelHelpers._extends({}, others, { className: cx(props).addStates({ focus: open }).build() }), React.createElement('input', {
                name: name,
                ref: 'input',
                type: 'hidden',
                value: value,
                disabled: disabled,
                size: size
            }), React.createElement('label', { onClick: this.onLabelClick }, DateTime.format(this.parseDate(value), dateFormat.toLowerCase(), lang), React.createElement(Icon, { icon: 'expand-more' })), React.createElement(Validity, { validity: validity }), React.createElement(Confirm, {
                open: open,
                variants: ['calendar'],
                onConfirm: this.onConfirm,
                onCancel: this.onCancel,
                size: size,
                buttonVariants: [
                    'secondery',
                    'calendar'
                ]
            }, React.createElement(Panel, {
                date: date,
                begin: begin,
                end: end,
                lang: lang,
                onChange: this.onDateChange
            })));
        }
    });
    Calendar.LANG = {
        week: '\u5468',
        days: '\u65E5,\u4E00,\u4E8C,\u4E09,\u56DB,\u4E94,\u516D'
    };
    Calendar.defaultProps = {
        value: DateTime.format(new Date(), 'yyyy-mm-dd', Calendar.LANG),
        dateFormat: 'yyyy-MM-dd',
        lang: Calendar.LANG,
        validateEvents: ['change']
    };
    Calendar.propTypes = {
        value: PropTypes.string,
        autoConfirm: PropTypes.bool,
        dateFormat: PropTypes.string,
        end: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        begin: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]),
        onChange: PropTypes.func,
        lang: PropTypes.shape({
            week: PropTypes.string,
            days: PropTypes.string
        })
    };
    module.exports = require('./createInputComponent').create(Calendar);
});