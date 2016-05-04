/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './BoxGroup', './common/util/date', './common/util/cxBuilder', './InputComponent', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./BoxGroup'), require('./common/util/date'), require('./common/util/cxBuilder'), require('./InputComponent'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.BoxGroup, global.date, global.cxBuilder, global.InputComponent, global.babelHelpers);
        global.UnitCalendar = mod.exports;
    }
})(this, function (exports, _react, _BoxGroup, _date, _cxBuilder, _InputComponent2, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.normalize = normalize;
    exports.getNextTime = getNextTime;
    exports.getContinuousFragments = getContinuousFragments;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _BoxGroup2 = babelHelpers.interopRequireDefault(_BoxGroup);

    var date = babelHelpers.interopRequireWildcard(_date);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    /**
     * @file UnitCalendar
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('UnitCalendar');

    var UnitCalendar = function (_InputComponent) {
        babelHelpers.inherits(UnitCalendar, _InputComponent);

        function UnitCalendar(props) {
            babelHelpers.classCallCheck(this, UnitCalendar);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props));

            _this.onChange = _this.onChange.bind(_this);
            return _this;
        }

        UnitCalendar.prototype.onChange = function onChange(e) {

            var nextValue = e.value;

            var _props = this.props;
            var continuous = _props.continuous;
            var value = _props.value;


            this.props.onChange({

                target: this,

                // 如果是连续的，这里需要算一下，不是连续的就以新值为主
                value: continuous ? this.calculate(value, nextValue).map(this.parse) : value
            });
        };

        UnitCalendar.prototype.calculate = function calculate(current, next) {

            current = current.map(this.format).sort();

            next = next.sort();

            var cLength = current.length;
            var nLength = next.length;
            var unit = this.props.unit;


            if (cLength === nLength) {
                return current;
            }

            if (!cLength || !nLength) {
                return next;
            }

            // fill
            if (cLength < nLength) {

                var firtNext = new Date(next[0]);
                var firstCurrent = new Date(current[0]);

                if (firtNext < firstCurrent) {
                    return getContinuousFragments(firtNext, firstCurrent, unit).map(this.format).concat(current);
                }

                var lastNext = new Date(next[nLength - 1]);
                lastNext.setDate(lastNext.getDate() + 1);
                var lastCurrent = new Date(current[cLength - 1]);

                return current.concat(getContinuousFragments(lastCurrent, lastNext, unit).slice(1).map(this.format));
            }

            // cut
            for (var i = 0; i < nLength; ++i) {
                if (current[i] < next[i]) {
                    if (i === 0) {
                        return current.slice(1);
                    }
                    return current.slice(0, i);
                }
            }

            return current.slice(0, -1);
        };

        UnitCalendar.prototype.parse = function parse(time) {
            return new Date(time);
        };

        UnitCalendar.prototype.format = function format(time) {
            return date.format(time, 'yyyy-mm-dd');
        };

        UnitCalendar.prototype.parseValue = function parseValue() {
            var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

            return value.split(',').map(function (date) {
                return this.parse(date);
            });
        };

        UnitCalendar.prototype.stringifyValue = function stringifyValue() {
            var value = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            return value.map(function (term) {
                return this.format(term);
            }).join(',');
        };

        UnitCalendar.prototype.render = function render() {
            var _this2 = this;

            var _props2 = this.props;
            var begin = _props2.begin;
            var end = _props2.end;
            var unit = _props2.unit;
            var value = _props2.value;
            var format = _props2.format;
            var rest = babelHelpers.objectWithoutProperties(_props2, ['begin', 'end', 'unit', 'value', 'format']);
            var onChange = this.onChange;


            value = value.map(function (fragment) {
                return date.format(normalize(fragment, unit), format);
            }).sort();

            var options = getContinuousFragments(begin, end, unit).map(function (fragment) {
                var begin = _this2.format(fragment);
                var end = getNextTime(fragment, unit);
                end.setDate(end.getDate() - 1);
                end = _this2.format(end);
                return _react2['default'].createElement('option', { key: begin, value: begin, label: begin + ' ~ ' + end });
            });

            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).build() },
                _react2['default'].createElement(
                    _BoxGroup2['default'],
                    babelHelpers['extends']({}, rest, {
                        boxModel: 'checkbox',
                        onChange: onChange,
                        value: value }),
                    options
                )
            );
        };

        return UnitCalendar;
    }(_InputComponent3['default']);

    exports['default'] = UnitCalendar;


    UnitCalendar.propTypes = {
        begin: _react.PropTypes.instanceOf(Date),
        end: _react.PropTypes.instanceOf(Date),
        unit: _react.PropTypes.oneOf(['week', 'month', 'year']).isRequired,
        value: _react.PropTypes.arrayOf(_react.PropTypes.instanceOf(Date)),
        continuous: _react.PropTypes.bool.isRequired,
        defaultValue: _react.PropTypes.arrayOf(_react.PropTypes.string)
    };

    UnitCalendar.defaultProps = {
        continuous: true,
        value: [],
        defaultValue: [],
        format: 'yyyy-mm-dd'
    };

    function normalize(time, unit) {
        time = new Date(time);
        // 得到周一
        if (unit === 'week') {
            time.setDate(time.getDate() - time.getDay() + 1);
        }
        // 得到1日
        else if (unit === 'month') {
                time.setDate(1);
            }
            // 得到1月1日
            else {
                    time.setMonth(0);
                    time.setDate(1);
                }
        return time;
    }

    function getNextTime(time, unit) {
        time = normalize(time, unit);
        if (unit === 'week') {
            time.setDate(time.getDate() + 7);
        } else if (unit === 'month') {
            time.setMonth(time.getMonth() + 1);
        } else {
            time.setFullYear(time.getFullYear() + 1);
        }
        return time;
    }

    function getContinuousFragments(begin, end, unit) {

        begin = normalize(begin, unit);

        var result = [];

        while (begin < end) {
            result.push(new Date(begin));
            if (unit === 'week') {
                begin.setDate(begin.getDate() + 7);
            } else if (unit === 'month') {
                begin.setMonth(begin.getMonth() + 1);
            } else {
                begin.setFullYear(begin.getFullYear() + 1);
            }
        }

        return result;
    }
});