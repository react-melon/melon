/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'moment', 'melon-core/classname/cxBuilder', 'melon-core/util/array', '../common/util/dom', './ClockItem', './ClockHand', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('moment'), require('melon-core/classname/cxBuilder'), require('melon-core/util/array'), require('../common/util/dom'), require('./ClockItem'), require('./ClockHand'), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.moment, global.cxBuilder, global.array, global.dom, global.ClockItem, global.ClockHand, global.babelHelpers);
        global.Clock = mod.exports;
    }
})(this, function (exports, _react, _moment, _cxBuilder, _array, _dom, _ClockItem, _ClockHand, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _moment2 = babelHelpers.interopRequireDefault(_moment);

    var _ClockItem2 = babelHelpers.interopRequireDefault(_ClockItem);

    var _ClockHand2 = babelHelpers.interopRequireDefault(_ClockHand);

    /**
     * @file melon/TimePickerClock
     * @author cxtom(cxtom2008@qq.com)
     */

    var cx = (0, _cxBuilder.create)('TimePickerClock');
    var PI = Math.PI;
    var atan = Math.atan;

    var TimePickerClock = function (_Component) {
        babelHelpers.inherits(TimePickerClock, _Component);

        function TimePickerClock(props) {
            babelHelpers.classCallCheck(this, TimePickerClock);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onTimeChange = _this.onTimeChange.bind(_this);
            _this.onMouseDown = _this.onMouseDown.bind(_this);
            _this.onMouseUp = _this.onMouseUp.bind(_this);

            _this.onMouseChange = function () {

                var handler = _this.onMouseChange;

                return function (e) {
                    clearTimeout(_this.mouseChangeTimer);
                    _this.mouseChangeTimer = setTimeout(handler.bind(_this, e), 5);
                };
            }();
            return _this;
        }

        TimePickerClock.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            var _props = this.props;
            var time = _props.time;
            var mode = _props.mode;
            var begin = _props.begin;
            var end = _props.end;


            return !(0, _moment2['default'])(time).isSame(nextProps.time) || mode !== nextProps.mode || !(0, _moment2['default'])(begin).isSame(nextProps.begin) || !(0, _moment2['default'])(end).isSame(nextProps.end);
        };

        TimePickerClock.prototype.componentWillUnmount = function componentWillUnmount() {
            clearTimeout(this.mouseChangeTimer);
            this.mouseChangeTimer = null;
        };

        TimePickerClock.prototype.onTimeChange = function onTimeChange(_ref) {
            var time = _ref.time;

            this.props.onChange({ time: time });
        };

        TimePickerClock.prototype.onMouseDown = function onMouseDown(e) {

            if (this.props.mode === 'minute') {
                (0, _dom.on)(this.refs.main, 'mousemove', this.onMouseChange);
                (0, _dom.on)(document, 'mouseup', this.onMouseUp);
            } else {
                (0, _dom.on)(this.refs.main, 'mouseup', this.onMouseChange);
            }
        };

        TimePickerClock.prototype.onMouseUp = function onMouseUp(e) {

            if (this.props.mode === 'minute') {
                this.onMouseChange(e);
                (0, _dom.off)(this.refs.main, 'mousemove', this.onMouseChange);
                (0, _dom.off)(document, 'mouseup', this.onMouseUp);
            } else {
                (0, _dom.off)(this.refs.main, 'mouseup', this.onMouseChange);
            }
        };

        TimePickerClock.prototype.onMouseChange = function onMouseChange(_ref2) {
            var pageX = _ref2.pageX;
            var pageY = _ref2.pageY;


            var mainPosition = (0, _dom.getPosition)(this.refs.main);
            var radius = mainPosition.width / 2;

            var pos = {
                x: pageX - mainPosition.left - radius,
                y: pageY - mainPosition.top - radius
            };

            var deg = void 0;

            if (pos.y === 0) {
                return;
            }

            if (pos.x >= 0 && pos.y < 0) {
                deg = -180 * atan(pos.x / pos.y) / PI;
            } else if (pos.x >= 0 && pos.y > 0) {
                deg = 180 - 180 * atan(pos.x / pos.y) / PI;
            } else if (pos.x < 0 && pos.y > 0) {
                deg = 180 - 180 * atan(pos.x / pos.y) / PI;
            } else if (pos.x < 0 && pos.y < 0) {
                deg = 360 - 180 * atan(pos.x / pos.y) / PI;
            }

            var _props2 = this.props;
            var time = _props2.time;
            var mode = _props2.mode;


            var single = mode === 'minute' ? 6 : 30;
            var number = Math.round(deg / single);
            number = mode === 'hour' && number === 0 ? 12 : number;
            number = mode === 'hour' && time.getHours() > 12 ? number + 12 : number;

            if ((0, _moment2['default'])(time)[mode](number).isSame(time)) {
                return;
            }

            this.onTimeChange({
                time: (0, _moment2['default'])(time)[mode](number).toDate()
            });
        };

        TimePickerClock.prototype.renderItems = function renderItems() {
            var _props3 = this.props;
            var time = _props3.time;
            var mode = _props3.mode;
            var begin = _props3.begin;
            var end = _props3.end;


            var items = mode === 'hour' ? (0, _array.range)(1, 13) : (0, _array.range)(0, 60, 5);

            return items.map(function (number) {

                var timeMoment = void 0;
                var selected = false;
                if (mode === 'hour') {
                    var hour = (0, _moment2['default'])(time).hour();
                    hour = hour === 0 ? 12 : hour;
                    selected = (hour > 12 ? hour - 12 : hour) === number;
                    var itemHour = hour > 12 ? number + 12 : number;
                    timeMoment = (0, _moment2['default'])(time).hour(itemHour);
                } else {
                    selected = (0, _moment2['default'])(time).minute() === number;
                    timeMoment = (0, _moment2['default'])(time).minute(number);
                }

                var disabled = false;
                disabled = begin ? timeMoment.isBefore(begin) : false;
                disabled = end ? timeMoment.isAfter(end) : false;

                return _react2['default'].createElement(_ClockItem2['default'], {
                    key: mode + number,
                    time: timeMoment.toDate(),
                    mode: mode,
                    selected: selected,
                    disabled: disabled });
            });
        };

        TimePickerClock.prototype.render = function render() {
            var _props4 = this.props;
            var time = _props4.time;
            var mode = _props4.mode;


            var className = cx(this.props).addVariants(mode).build();

            return _react2['default'].createElement(
                'div',
                { className: className },
                _react2['default'].createElement(
                    'div',
                    {
                        className: cx().part('main').build(),
                        ref: 'main',
                        onMouseDown: this.onMouseDown },
                    _react2['default'].createElement(_ClockHand2['default'], {
                        time: time,
                        mode: mode,
                        onChange: this.onTimeChange }),
                    this.renderItems()
                )
            );
        };

        return TimePickerClock;
    }(_react.Component);

    exports['default'] = TimePickerClock;


    TimePickerClock.displayName = 'TimePickerClock';

    TimePickerClock.propTypes = {
        time: _react.PropTypes.instanceOf(Date),
        mode: _react.PropTypes.oneOf(['hour', 'minute']),
        begin: _react.PropTypes.instanceOf(Date),
        end: _react.PropTypes.instanceOf(Date),
        format: _react.PropTypes.string,
        onChange: _react.PropTypes.func.isRequired
    };
});