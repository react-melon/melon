define('melon/UnitCalendar', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './InputComponent',
    './BoxGroup',
    './common/util/date'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var InputComponent = require('./InputComponent');
    var BoxGroup = require('./BoxGroup');
    var date = require('./common/util/date');
    var UnitCalendar = function (_InputComponent) {
        babelHelpers.inherits(UnitCalendar, _InputComponent);
        babelHelpers.createClass(UnitCalendar, null, [{
                key: 'displayName',
                value: 'UnitCalendar',
                enumerable: true
            }]);
        function UnitCalendar(props) {
            babelHelpers.classCallCheck(this, UnitCalendar);
            babelHelpers.get(Object.getPrototypeOf(UnitCalendar.prototype), 'constructor', this).call(this, props);
            this.onChange = this.onChange.bind(this);
        }
        babelHelpers.createClass(UnitCalendar, [
            {
                key: 'render',
                value: function render() {
                    var _this = this;
                    var _props = this.props;
                    var begin = _props.begin;
                    var end = _props.end;
                    var unit = _props.unit;
                    var rest = babelHelpers.objectWithoutProperties(_props, [
                        'begin',
                        'end',
                        'unit'
                    ]);
                    var onChange = this.onChange;
                    var rawValue = this.getRawValue().map(function (fragment) {
                        return date.format(UnitCalendar.normalize(fragment, unit), 'yyyy-mm-dd');
                    }).sort();
                    return React.createElement('div', { className: this.getClassName() }, React.createElement(BoxGroup, babelHelpers._extends({}, rest, {
                        boxModel: 'checkbox',
                        onChange: onChange,
                        rawValue: rawValue
                    }), UnitCalendar.getContinuousFragments(begin, end, unit).map(function (fragment) {
                        var begin = _this.format(fragment);
                        var end = UnitCalendar.getNextTime(fragment, unit);
                        end.setDate(end.getDate() - 1);
                        end = _this.format(end);
                        return React.createElement('option', {
                            key: begin,
                            value: begin,
                            label: begin + ' ~ ' + end
                        });
                    })));
                }
            },
            {
                key: 'onChange',
                value: function onChange(_ref) {
                    var rawValue = _ref.rawValue;
                    var current = this.getRawValue();
                    var continuous = this.props.continuous;
                    rawValue = continuous ? this.calculate(current, rawValue).map(this.parse) : rawValue;
                    if (this.isControlled()) {
                        this.props.onChange({
                            target: this,
                            rawValue: rawValue,
                            value: this.stringifyValue(rawValue)
                        });
                        return;
                    }
                    this.setState({ rawValue: rawValue });
                }
            },
            {
                key: 'calculate',
                value: function calculate(current, next) {
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
                }
            },
            {
                key: 'parse',
                value: function parse(time) {
                    return new Date(time);
                }
            },
            {
                key: 'format',
                value: function format(time) {
                    return date.format(time, 'yyyy-mm-dd');
                }
            },
            {
                key: 'parseValue',
                value: function parseValue() {
                    var _this2 = this;
                    var value = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
                    return value.split(',').map(function (date) {
                        return _this2.parse(date);
                    });
                }
            },
            {
                key: 'stringifyValue',
                value: function stringifyValue() {
                    var _this3 = this;
                    var rawValue = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
                    return rawValue.map(function (term) {
                        return _this3.format(term);
                    }).join(',');
                }
            }
        ]);
        return UnitCalendar;
    }(InputComponent);
    var PropTypes = React.PropTypes;
    UnitCalendar.propTypes = babelHelpers._extends({}, InputComponent.propTypes, {
        begin: PropTypes.instanceOf(Date),
        end: PropTypes.instanceOf(Date),
        unit: PropTypes.oneOf([
            'week',
            'month',
            'year'
        ]).isRequired,
        rawValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
        continuous: PropTypes.bool.isRequired,
        defaultValue: PropTypes.arrayOf(PropTypes.string)
    });
    UnitCalendar.defaultProps = babelHelpers._extends({}, InputComponent.defaultProps, {
        continuous: true,
        rawValue: [],
        defaultValue: []
    });
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