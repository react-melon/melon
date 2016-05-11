/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './InputComponent', './common/util/cxBuilder', './Icon', './Confirm', './calendar/Panel', './common/util/date', './Validity', './common/util/syncPropsToState', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./InputComponent'), require('./common/util/cxBuilder'), require('./Icon'), require('./Confirm'), require('./calendar/Panel'), require('./common/util/date'), require('./Validity'), require('./common/util/syncPropsToState'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.InputComponent, global.cxBuilder, global.Icon, global.Confirm, global.Panel, global.date, global.Validity, global.syncPropsToState, global.babelHelpers);
        global.Calendar = mod.exports;
    }
})(this, function (exports, _react, _InputComponent2, _cxBuilder, _Icon, _Confirm, _Panel, _date, _Validity, _syncPropsToState, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _Confirm2 = babelHelpers.interopRequireDefault(_Confirm);

    var _Panel2 = babelHelpers.interopRequireDefault(_Panel);

    var DateTime = babelHelpers.interopRequireWildcard(_date);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    /**
     * @file melon/Calendar
     * @author cxtom<cxtom2010@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('Calendar');

    var Calendar = function (_InputComponent) {
        babelHelpers.inherits(Calendar, _InputComponent);

        function Calendar(props, context) {
            babelHelpers.classCallCheck(this, Calendar);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            var value = _this.state.value;

            _this.onLabelClick = _this.onLabelClick.bind(_this);
            _this.onConfirm = _this.onConfirm.bind(_this);
            _this.onLabelClick = _this.onLabelClick.bind(_this);
            _this.onCancel = _this.onCancel.bind(_this);
            _this.onDateChange = _this.onDateChange.bind(_this);

            _this.state = babelHelpers['extends']({}, _this.state, {

                // 缓存用户在 confirm 前的选中值
                date: value ? _this.parseDate(value) : new Date(),

                // 是否打开选择窗
                open: false

            });

            return _this;
        }

        Calendar.prototype.getSyncUpdates = function getSyncUpdates(nextProps) {
            var disabled = nextProps.disabled;
            var customValidity = nextProps.customValidity;
            var value = nextProps.value;


            // 如果有值，那么就试着解析一下；否则设置为 null
            var date = value ? this.parseValue(value) : null;

            // 如果 date 为 null 或者是 invalid date，那么就用上默认值；
            // 否则就用解析出来的这个值
            date = !date || isNaN(date.getTime()) ? new Date() : date;

            var vilidity = (0, _syncPropsToState.getNextValidity)(this, { value: value, disabled: disabled, customValidity: customValidity });

            return {
                date: date,
                vilidity: vilidity,
                value: this.stringifyValue(date)
            };
        };

        Calendar.prototype.parseValue = function parseValue(value) {
            return this.parseDate(value);
        };

        Calendar.prototype.stringifyValue = function stringifyValue(rawValue) {

            if (!DateTime.isDate(rawValue)) {
                return rawValue;
            }

            var dateFormat = this.props.dateFormat;

            return DateTime.format(rawValue, dateFormat);
        };

        Calendar.prototype.parseDate = function parseDate(date) {

            if (typeof date !== 'string') {
                return date;
            }

            var format = this.props.dateFormat;

            return DateTime.parse(date, format);
        };

        Calendar.prototype.getValue = function getValue() {
            return this.stringifyValue(this.state.value);
        };

        Calendar.prototype.onLabelClick = function onLabelClick() {
            var _props = this.props;
            var disabled = _props.disabled;
            var readOnly = _props.readOnly;


            if (disabled || readOnly) {
                return;
            }

            this.setState({ open: true });
        };

        Calendar.prototype.onConfirm = function onConfirm() {
            var _this2 = this;

            var _state = this.state;
            var value = _state.value;
            var date = _state.date;


            value = this.parseDate(value);

            if (DateTime.isEqualDate(date, this.parseDate(value))) {
                this.setState({ open: false });
                return;
            }

            this.setState({ open: false }, function () {

                _InputComponent.prototype.onChange.call(_this2, {
                    type: 'change',
                    target: _this2,
                    value: _this2.stringifyValue(date)
                });
            });
        };

        Calendar.prototype.onCancel = function onCancel() {
            this.setState({ open: false });
        };

        Calendar.prototype.onDateChange = function onDateChange(_ref) {
            var _this3 = this;

            var value = _ref.value;


            this.setState({ date: this.parseDate(value) }, this.props.autoConfirm ? function () {
                return _this3.onConfirm();
            } : null);
        };

        Calendar.prototype.render = function render() {
            var state = this.state;
            var props = this.props;
            var lang = props.lang;
            var disabled = props.disabled;
            var size = props.size;
            var name = props.name;
            var dateFormat = props.dateFormat;
            var placeholder = props.placeholder;
            var others = babelHelpers.objectWithoutProperties(props, ['lang', 'disabled', 'size', 'name', 'dateFormat', 'placeholder']);
            var value = state.value;
            var validity = state.validity;
            var begin = props.begin;
            var end = props.end;


            begin = begin ? this.parseDate(begin) : null;
            end = end ? this.parseDate(end) : null;

            var open = state.open;
            var date = state.date;

            var className = cx(props).addStates({ focus: open }).addStates(this.getStyleStates()).build();

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, others, { className: className }),
                _react2['default'].createElement('input', {
                    name: name,
                    ref: 'input',
                    type: 'hidden',
                    value: value,
                    disabled: disabled,
                    size: size }),
                _react2['default'].createElement(
                    'label',
                    { onClick: this.onLabelClick },
                    value ? DateTime.format(this.parseDate(value), dateFormat) : _react2['default'].createElement(
                        'span',
                        { className: cx().part('label-placeholder').build() },
                        placeholder
                    ),
                    _react2['default'].createElement(_Icon2['default'], { icon: 'expand-more' })
                ),
                _react2['default'].createElement(_Validity2['default'], { validity: validity }),
                _react2['default'].createElement(
                    _Confirm2['default'],
                    {
                        open: open,
                        variants: ['calendar'],
                        onConfirm: this.onConfirm,
                        onCancel: this.onCancel,
                        size: size,
                        buttonVariants: ['secondery', 'calendar'] },
                    _react2['default'].createElement(_Panel2['default'], {
                        date: date,
                        begin: begin,
                        end: end,
                        lang: lang,
                        onChange: this.onDateChange })
                )
            );
        };

        return Calendar;
    }(_InputComponent3['default']);

    exports['default'] = Calendar;


    Calendar.displayName = 'Calendar';

    Calendar.LANG = {

        // 对于 '周' 的称呼
        week: '周',

        // 星期对应的顺序表示
        days: '日,一,二,三,四,五,六'

    };

    Calendar.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        defaultValue: '',
        dateFormat: 'YYYY-MM-DD',
        lang: Calendar.LANG,
        placeholder: '请选择'
    });

    Calendar.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {

        value: _react.PropTypes.string,

        autoConfirm: _react.PropTypes.bool,

        dateFormat: _react.PropTypes.string,

        end: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]),

        begin: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]),

        lang: _react.PropTypes.shape({
            week: _react.PropTypes.string,
            days: _react.PropTypes.string
        })

    });
});