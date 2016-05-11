/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Calendar', './Icon', './Confirm', './calendar/Panel', './Validity', './common/util/cxBuilder', './InputComponent', './common/util/date', './common/util/syncPropsToState', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Calendar'), require('./Icon'), require('./Confirm'), require('./calendar/Panel'), require('./Validity'), require('./common/util/cxBuilder'), require('./InputComponent'), require('./common/util/date'), require('./common/util/syncPropsToState'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Calendar, global.Icon, global.Confirm, global.Panel, global.Validity, global.cxBuilder, global.InputComponent, global.date, global.syncPropsToState, global.babelHelpers);
        global.RangeCalendar = mod.exports;
    }
})(this, function (exports, _react, _Calendar, _Icon, _Confirm, _Panel, _Validity, _cxBuilder, _InputComponent2, _date, _syncPropsToState, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Calendar2 = babelHelpers.interopRequireDefault(_Calendar);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _Confirm2 = babelHelpers.interopRequireDefault(_Confirm);

    var _Panel2 = babelHelpers.interopRequireDefault(_Panel);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var DateTime = babelHelpers.interopRequireWildcard(_date);

    /**
     * @file melon/RangeCalendar
     * @author cxtom <cxtom2010@gmail.com>
     * @author leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('RangeCalendar');

    var RangeCalendar = function (_InputComponent) {
        babelHelpers.inherits(RangeCalendar, _InputComponent);

        function RangeCalendar(props, context) {
            babelHelpers.classCallCheck(this, RangeCalendar);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            var begin = props.begin;
            var end = props.end;


            _this.state = babelHelpers['extends']({}, _this.state, {
                open: false,
                date: _this.getNormalizeValue(_this.state.value, begin, end)
            });

            _this.onLabelClick = _this.onLabelClick.bind(_this);
            _this.onConfirm = _this.onConfirm.bind(_this);
            _this.onLabelClick = _this.onLabelClick.bind(_this);
            _this.onCancel = _this.onCancel.bind(_this);
            _this.onDateChange = _this.onDateChange.bind(_this);
            _this.formatDate = _this.formatDate.bind(_this);

            return _this;
        }

        RangeCalendar.prototype.getSyncUpdates = function getSyncUpdates(nextProps) {
            var disabled = nextProps.disabled;
            var customValidity = nextProps.customValidity;
            var _nextProps$value = nextProps.value;
            var value = _nextProps$value === undefined ? nextProps.defaultValue : _nextProps$value;
            var begin = nextProps.begin;
            var end = nextProps.end;


            // 如果有值，那么就试着解析一下；否则设置为 null
            var date = value ? this.getNormalizeValue(value, begin, end) : null;

            var vilidity = (0, _syncPropsToState.getNextValidity)(this, { value: value, disabled: disabled, customValidity: customValidity });

            return {
                date: date,
                vilidity: vilidity,
                value: value
            };
        };

        RangeCalendar.prototype.getNormalizeValue = function getNormalizeValue(value, begin, end) {

            if (value.length === 0) {
                return value;
            }

            begin = this.parseDate(begin);
            end = this.parseDate(end);

            var valueBegin = this.parseDate(value[0]);
            var valueEnd = this.parseDate(value[1]);

            // 这里我们需要一个全新的 value
            value = [valueBegin && DateTime.isAfterDate(begin, valueBegin) ? begin : valueBegin, valueEnd && DateTime.isBeforeDate(end, valueEnd) ? end : valueEnd];

            // 下边这种做法是错误的，不能直接修改 props 中的值
            // value[0] = _.isDate(begin) && DateTime.isAfterDate(begin, value[0]) ? begin : value[0];
            // value[1] = _.isDate(end) && DateTime.isBeforeDate(end, value[1]) ? end : value[1];

            return value;
        };

        RangeCalendar.prototype.getValue = function getValue() {
            var _this2 = this;

            var _props = this.props;
            var begin = _props.begin;
            var end = _props.end;

            var value = this.state.value;

            return this.getNormalizeValue(value, begin, end).map(function (date) {
                return _this2.formatDate(date);
            });
        };

        RangeCalendar.prototype.onLabelClick = function onLabelClick() {
            var _props2 = this.props;
            var disabled = _props2.disabled;
            var readOnly = _props2.readOnly;


            if (disabled || readOnly) {
                return;
            }

            this.setState({ open: true });
        };

        RangeCalendar.prototype.onCancel = function onCancel() {
            this.setState({
                open: false
            });
        };

        RangeCalendar.prototype.onDateChange = function onDateChange(index, _ref) {
            var value = _ref.value;


            var date = [].concat(this.state.date);

            if (date.length === 0) {
                date = [new Date(), new Date()];
            }

            date[index] = value;

            this.setState({
                date: date,
                month: date
            });
        };

        RangeCalendar.prototype.onConfirm = function onConfirm() {
            var _this3 = this;

            var _state = this.state;
            var date = _state.date;
            var value = _state.value;


            // 不管怎么样，先把窗口关了
            this.setState({
                open: false
            }, function () {

                // 如果值发生了变化，那么释放一个 change 事件
                if (!DateTime.isEqualDate(date[0], _this3.parseDate(value[0])) || !DateTime.isEqualDate(date[1], _this3.parseDate(value[1]))) {
                    _InputComponent.prototype.onChange.call(_this3, {
                        type: 'change',
                        target: _this3,
                        value: date.map(_this3.formatDate)
                    });
                }
            });
        };

        RangeCalendar.prototype.formatDate = function formatDate(date) {

            return DateTime.format(date, this.props.dateFormat);
        };

        RangeCalendar.prototype.parseDate = function parseDate(date) {

            if (typeof date !== 'string') {
                return date;
            }

            var format = this.props.dateFormat;

            return DateTime.parse(date, format);
        };

        RangeCalendar.prototype.render = function render() {

            var props = this.props;

            var lang = props.lang;
            var disabled = props.disabled;
            var size = props.size;
            var name = props.name;
            var begin = props.begin;
            var end = props.end;
            var validity = props.validity;
            var placeholder = props.placeholder;
            var others = babelHelpers.objectWithoutProperties(props, ['lang', 'disabled', 'size', 'name', 'begin', 'end', 'validity', 'placeholder']);


            var value = this.getValue();

            var _state2 = this.state;
            var open = _state2.open;
            var date = _state2.date;


            begin = begin ? this.parseDate(begin) : null;
            end = end ? this.parseDate(end) : null;

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, others, {
                    className: cx(props).addStates({ focus: open }).build() }),
                _react2['default'].createElement('input', {
                    name: name,
                    ref: 'input',
                    type: 'hidden',
                    value: value.join(','),
                    disabled: disabled }),
                _react2['default'].createElement(
                    'label',
                    { onClick: this.onLabelClick },
                    value.length === 0 ? _react2['default'].createElement(
                        'span',
                        { className: cx().part('label-placeholder').build() },
                        placeholder
                    ) : value[0] + ' 至 ' + value[1],
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
                    _react2['default'].createElement(
                        'div',
                        { className: cx().part('row').build() },
                        _react2['default'].createElement(_Panel2['default'], {
                            lang: lang,
                            date: date[0] || new Date(),
                            begin: begin,
                            end: date[1] || new Date(),
                            onChange: this.onDateChange.bind(this, 0) }),
                        _react2['default'].createElement(_Panel2['default'], {
                            lang: lang,
                            date: date[1] || new Date(),
                            begin: date[0] || new Date(),
                            end: end,
                            onChange: this.onDateChange.bind(this, 1) })
                    )
                )
            );
        };

        return RangeCalendar;
    }(_InputComponent3['default']);

    exports['default'] = RangeCalendar;


    RangeCalendar.displayName = 'RangeCalendar';

    RangeCalendar.defaultProps = babelHelpers['extends']({}, _Calendar2['default'].defaultProps, {
        defaultValue: [],
        placeholder: '请选择'
    });

    RangeCalendar.propTypes = babelHelpers['extends']({}, _Calendar2['default'].propTypes, {
        defaultValue: _react.PropTypes.arrayOf(_react.PropTypes.string),
        autoOk: _react.PropTypes.bool,
        dateFormat: _react.PropTypes.string,
        begin: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]),
        end: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string])
    });
});