define('melon/UnitCalendar', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './BoxGroup',
    './common/util/date',
    './common/util/cxBuilder',
    './createInputComponent'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var BoxGroup = require('./BoxGroup');
    var date = require('./common/util/date');
    var cx = require('./common/util/cxBuilder').create('UnitCalendar');
    var UnitCalendar = React.createClass({
        displayName: 'UnitCalendar',
        onChange: function (e) {
            var nextValue = e.value;
            var _props = this.props;
            var continuous = _props.continuous;
            var value = _props.value;
            this.props.onChange({
                target: this,
                value: continuous ? this.calculate(value, nextValue).map(this.parse) : value
            });
        },
        calculate: function (current, next) {
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
            if (cLength < nLength) {
                var firtNext = new Date(next[0]);
                var firstCurrent = new Date(current[0]);
                if (firtNext < firstCurrent) {
                    return UnitCalendar.getContinuousFragments(firtNext, firstCurrent, unit).map(this.format).concat(current);
                }
                var lastNext = new Date(next[nLength - 1]);
                lastNext.setDate(lastNext.getDate() + 1);
                var lastCurrent = new Date(current[cLength - 1]);
                return current.concat(UnitCalendar.getContinuousFragments(lastCurrent, lastNext, unit).slice(1).map(this.format));
            }
            for (var i = 0; i < nLength; ++i) {
                if (current[i] < next[i]) {
                    if (i === 0) {
                        return current.slice(1);
                    }
                    return current.slice(0, i);
                }
            }
            return current.slice(0, -1);
        },
        parse: function (time) {
            return new Date(time);
        },
        format: function (time) {
            return date.format(time, 'yyyy-mm-dd');
        },
        parseValue: function () {
            var _this = this;
            var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            return value.split(',').map(function (date) {
                return _this.parse(date);
            });
        },
        stringifyValue: function () {
            var _this2 = this;
            var value = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
            return value.map(function (term) {
                return _this2.format(term);
            }).join(',');
        },
        render: function () {
            var _this3 = this;
            var _props2 = this.props;
            var begin = _props2.begin;
            var end = _props2.end;
            var unit = _props2.unit;
            var value = _props2.value;
            var rest = babelHelpers.objectWithoutProperties(_props2, [
                'begin',
                'end',
                'unit',
                'value'
            ]);
            var onChange = this.onChange;
            value = value.map(function (fragment) {
                return date.format(UnitCalendar.normalize(fragment, unit), 'yyyy-mm-dd');
            }).sort();
            return React.createElement('div', { className: cx(this.props).build() }, React.createElement(BoxGroup, babelHelpers._extends({}, rest, {
                boxModel: 'checkbox',
                onChange: onChange,
                value: value
            }), UnitCalendar.getContinuousFragments(begin, end, unit).map(function (fragment) {
                var begin = _this3.format(fragment);
                var end = UnitCalendar.getNextTime(fragment, unit);
                end.setDate(end.getDate() - 1);
                end = _this3.format(end);
                return React.createElement('option', {
                    key: begin,
                    value: begin,
                    label: begin + ' ~ ' + end
                });
            })));
        }
    });
    UnitCalendar = require('./createInputComponent').create(UnitCalendar);
    var PropTypes = React.PropTypes;
    UnitCalendar.propTypes = {
        begin: PropTypes.instanceOf(Date),
        end: PropTypes.instanceOf(Date),
        unit: PropTypes.oneOf([
            'week',
            'month',
            'year'
        ]).isRequired,
        value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
        continuous: PropTypes.bool.isRequired,
        defaultValue: PropTypes.arrayOf(PropTypes.string)
    };
    UnitCalendar.defaultProps = {
        continuous: true,
        defaultValue: []
    };
    UnitCalendar.normalize = function (time, unit) {
        time = new Date(time);
        if (unit === 'week') {
            time.setDate(time.getDate() - time.getDay() + 1);
        } else if (unit === 'month') {
            time.setDate(1);
        } else {
            time.setMonth(0);
            time.setDate(1);
        }
        return time;
    };
    UnitCalendar.getNextTime = function (time, unit) {
        time = UnitCalendar.normalize(time, unit);
        if (unit === 'week') {
            time.setDate(time.getDate() + 7);
        } else if (unit === 'month') {
            time.setMonth(time.getMonth() + 1);
        } else {
            time.setFullYear(time.getFullYear() + 1);
        }
        return time;
    };
    UnitCalendar.getContinuousFragments = function (begin, end, unit) {
        begin = UnitCalendar.normalize(begin, unit);
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
    };
    module.exports = UnitCalendar;
});