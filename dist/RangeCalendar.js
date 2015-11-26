define('melon/RangeCalendar', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'underscore',
    'react',
    './Calendar',
    './Icon',
    './dialog/Confirm',
    './calendar/Panel',
    './Validity',
    './common/util/date',
    './common/util/cxBuilder',
    './createInputComponent'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var _ = require('underscore');
    var React = require('react');
    var Calendar = require('./Calendar');
    var Icon = require('./Icon');
    var Confirm = require('./dialog/Confirm');
    var Panel = require('./calendar/Panel');
    var Validity = require('./Validity');
    var DateTime = require('./common/util/date');
    var cx = require('./common/util/cxBuilder').create('RangeCalendar');
    var RangeCalendar = React.createClass({
        displayName: 'RangeCalendar',
        getInitialState: function () {
            return {
                open: false,
                date: this.getNormalizeValue(this.props)
            };
        },
        componentWillReceiveProps: function (nextProps) {
            var value = nextProps.value;
            if (value !== this.props.value) {
                this.setState({ date: this.getNormalizeValue(nextProps) });
            }
        },
        getNormalizeValue: function (props) {
            var begin = props.begin;
            var end = props.end;
            var value = props.value;
            begin = this.parseDate(begin);
            end = this.parseDate(end);
            var valueBegin = this.parseDate(value[0]);
            var valueEnd = this.parseDate(value[1]);
            value = [
                valueBegin && DateTime.isAfterDate(begin, valueBegin) ? begin : valueBegin,
                valueEnd && DateTime.isBeforeDate(end, valueEnd) ? end : valueEnd
            ];
            return value;
        },
        getValue: function () {
            var _this = this;
            return this.getNormalizeValue(this.props).map(function (date) {
                return _this.formatDate(date);
            });
        },
        onLabelClick: function () {
            var _props = this.props;
            var disabled = _props.disabled;
            var readOnly = _props.readOnly;
            if (disabled || readOnly) {
                return;
            }
            this.setState({ open: true });
        },
        onCancel: function () {
            this.setState({ open: false });
        },
        onDateChange: function (index, e) {
            var value = e.value;
            var date = [].concat(this.state.date);
            date[index] = value;
            this.setState({
                date: date,
                month: date
            });
        },
        onConfirm: function () {
            var _this2 = this;
            var date = this.state.date;
            var _props2 = this.props;
            var value = _props2.value;
            var onChange = _props2.onChange;
            this.setState({ open: false }, function () {
                if (!DateTime.isEqualDate(date[0], _this2.parseDate(value[0])) || !DateTime.isEqualDate(date[1], _this2.parseDate(value[1]))) {
                    onChange({
                        type: 'change',
                        target: _this2,
                        value: date.map(_this2.formatDate)
                    });
                }
            });
        },
        formatDate: function (date) {
            var _props3 = this.props;
            var dateFormat = _props3.dateFormat;
            var lang = _props3.lang;
            return DateTime.format(date, dateFormat.toLowerCase(), lang);
        },
        parseDate: function (date) {
            if (!_.isString(date)) {
                return date;
            }
            var format = this.props.dateFormat.toLowerCase();
            return DateTime.parse(date, format);
        },
        render: function () {
            var props = this.props;
            var lang = props.lang;
            var disabled = props.disabled;
            var size = props.size;
            var dateFormat = props.dateFormat;
            var name = props.name;
            var begin = props.begin;
            var end = props.end;
            var validity = props.validity;
            var others = babelHelpers.objectWithoutProperties(props, [
                'lang',
                'disabled',
                'size',
                'dateFormat',
                'name',
                'begin',
                'end',
                'validity'
            ]);
            var value = this.getValue();
            var _state = this.state;
            var open = _state.open;
            var date = _state.date;
            begin = this.parseDate(begin);
            end = this.parseDate(end);
            return React.createElement('div', babelHelpers._extends({}, others, { className: cx(props).addStates({ focus: open }).build() }), React.createElement('input', {
                name: name,
                ref: 'input',
                type: 'hidden',
                value: value.join(','),
                disabled: disabled
            }), React.createElement('label', { onClick: this.onLabelClick }, value[0] + ' \u81F3 ' + value[1], React.createElement(Icon, { icon: 'expand-more' })), React.createElement(Validity, { validity: validity }), React.createElement(Confirm, {
                open: open,
                variants: ['calendar'],
                onConfirm: this.onConfirm,
                onCancel: this.onCancel,
                size: size,
                buttonVariants: [
                    'secondery',
                    'calendar'
                ]
            }, React.createElement('div', { className: cx().part('row').build() }, React.createElement(Panel, {
                lang: lang,
                date: date[0],
                begin: begin,
                end: date[1],
                onChange: this.onDateChange.bind(this, 0)
            }), React.createElement(Panel, {
                lang: lang,
                date: date[1],
                begin: date[0],
                end: end,
                onChange: this.onDateChange.bind(this, 1)
            }))));
        }
    });
    RangeCalendar.defaultProps = babelHelpers._extends({}, Calendar.defaultProps, {
        value: [
            DateTime.format(new Date(), 'yyyy-mm-dd', Calendar.LANG),
            DateTime.format(DateTime.addMonths(new Date(), 1), 'yyyy-mm-dd', Calendar.LANG)
        ]
    });
    var PropTypes = React.PropTypes;
    RangeCalendar.propTypes = babelHelpers._extends({}, Calendar.propTypes, {
        value: PropTypes.arrayOf(PropTypes.string),
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
    module.exports = require('./createInputComponent').create(RangeCalendar);
});