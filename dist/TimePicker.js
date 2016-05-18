/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'moment', './InputComponent', './common/util/cxBuilder', './Icon', './Confirm', './timepicker/Panel', './Validity', './common/util/syncPropsToState', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('moment'), require('./InputComponent'), require('./common/util/cxBuilder'), require('./Icon'), require('./Confirm'), require('./timepicker/Panel'), require('./Validity'), require('./common/util/syncPropsToState'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.moment, global.InputComponent, global.cxBuilder, global.Icon, global.Confirm, global.Panel, global.Validity, global.syncPropsToState, global.babelHelpers);
        global.TimePicker = mod.exports;
    }
})(this, function (exports, _react, _moment, _InputComponent2, _cxBuilder, _Icon, _Confirm, _Panel, _Validity, _syncPropsToState, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _moment2 = babelHelpers.interopRequireDefault(_moment);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _Confirm2 = babelHelpers.interopRequireDefault(_Confirm);

    var _Panel2 = babelHelpers.interopRequireDefault(_Panel);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    /**
     * @file melon/TimePicker
     * @author cxtom <cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('TimePicker');

    var TimePicker = function (_InputComponent) {
        babelHelpers.inherits(TimePicker, _InputComponent);

        function TimePicker(props, context) {
            babelHelpers.classCallCheck(this, TimePicker);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            var value = _this.state.value;

            _this.onLabelClick = _this.onLabelClick.bind(_this);
            _this.onConfirm = _this.onConfirm.bind(_this);
            _this.onCancel = _this.onCancel.bind(_this);
            _this.onTimeChange = _this.onTimeChange.bind(_this);

            _this.state = babelHelpers['extends']({}, _this.state, {

                // 缓存用户在 confirm 前的选中值
                time: value ? _this.parseValue(value) : new Date(),

                // 是否打开选择窗
                open: false
            });

            return _this;
        }

        TimePicker.prototype.getSyncUpdates = function getSyncUpdates(nextProps) {
            var disabled = nextProps.disabled;
            var customValidity = nextProps.customValidity;
            var value = nextProps.value;


            // 如果有值，那么就试着解析一下；否则设置为 null
            var time = value ? this.parseValue(value) : null;

            // 如果 time 为 null 或者是 invalid time，那么就用上默认值；
            // 否则就用解析出来的这个值
            time = !time || isNaN(time.getTime()) ? new Date() : time;

            var vilidity = (0, _syncPropsToState.getNextValidity)(this, { value: value, disabled: disabled, customValidity: customValidity });

            return {
                time: time,
                vilidity: vilidity,
                value: this.stringifyValue(time)
            };
        };

        TimePicker.prototype.stringifyValue = function stringifyValue(time) {

            if (typeof time === 'string') {
                return time;
            }

            var timeFormat = this.props.timeFormat;

            return (0, _moment2['default'])(time).format(timeFormat);
        };

        TimePicker.prototype.parseValue = function parseValue(date) {

            if (typeof date !== 'string') {
                return date;
            }

            return (0, _moment2['default'])(date, this.props.timeFormat).toDate();
        };

        TimePicker.prototype.onLabelClick = function onLabelClick(e) {
            var _props = this.props;
            var disabled = _props.disabled;
            var readOnly = _props.readOnly;


            if (disabled || readOnly) {
                return;
            }

            this.setState({ open: true });
        };

        TimePicker.prototype.onConfirm = function onConfirm() {
            var _this2 = this;

            var _state = this.state;
            var value = _state.value;
            var time = _state.time;


            value = this.parseValue(value);

            var valueMoment = (0, _moment2['default'])(value, this.timeFormat);
            var timeMoment = (0, _moment2['default'])(time);

            if (value !== '' && valueMoment.get('hour') === timeMoment.get('hour') && valueMoment.get('minute') === timeMoment.get('minute')) {
                this.setState({ open: false });
            }

            this.setState({ open: false }, function () {

                _InputComponent.prototype.onChange.call(_this2, {
                    type: 'change',
                    target: _this2,
                    value: _this2.stringifyValue(time)
                });
            });
        };

        TimePicker.prototype.onCancel = function onCancel() {
            this.setState({ open: false });
        };

        TimePicker.prototype.onTimeChange = function onTimeChange(_ref) {
            var time = _ref.time;

            this.setState({ time: time });
        };

        TimePicker.prototype.render = function render() {
            var state = this.state;
            var props = this.props;
            var disabled = props.disabled;
            var size = props.size;
            var name = props.name;
            var placeholder = props.placeholder;
            var timeFormat = props.timeFormat;
            var labelFormat = props.labelFormat;
            var others = babelHelpers.objectWithoutProperties(props, ['disabled', 'size', 'name', 'placeholder', 'timeFormat', 'labelFormat']);
            var value = state.value;
            var validity = state.validity;
            var begin = props.begin;
            var end = props.end;


            begin = begin ? this.parseValue(begin) : null;
            end = end ? this.parseValue(end) : null;

            var open = state.open;
            var time = state.time;

            var className = cx(props).addStates({ focus: open }).build();

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, others, { className: className }),
                _react2['default'].createElement('input', {
                    name: name,
                    ref: 'input',
                    type: 'hidden',
                    value: value,
                    disabled: disabled }),
                _react2['default'].createElement(
                    'label',
                    { onClick: this.onLabelClick, className: cx().part('label').build() },
                    value ? (0, _moment2['default'])(value, timeFormat).format(labelFormat) : _react2['default'].createElement(
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
                        variants: ['timepicker'],
                        onConfirm: this.onConfirm,
                        onCancel: this.onCancel,
                        onShow: this.props.onFocus,
                        onHide: this.props.onBlur,
                        size: size,
                        width: 'adaptive',
                        buttonVariants: ['secondery', 'timepicker'] },
                    _react2['default'].createElement(_Panel2['default'], {
                        time: time,
                        begin: begin,
                        end: end,
                        format: timeFormat,
                        onChange: this.onTimeChange })
                )
            );
        };

        return TimePicker;
    }(_InputComponent3['default']);

    exports['default'] = TimePicker;


    TimePicker.displayName = 'TimePicker';

    TimePicker.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        defaultValue: '',
        timeFormat: 'HH:mm:ss',
        labelFormat: 'HH:mm',
        placeholder: '请选择',
        autoConfirm: false
    });

    TimePicker.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        value: _react.PropTypes.string,
        autoConfirm: _react.PropTypes.bool,
        timeFormat: _react.PropTypes.string,
        labalFormat: _react.PropTypes.string,
        end: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]),
        begin: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string])
    });
});