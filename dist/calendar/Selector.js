/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', '../common/util/cxBuilder', './SelectorItem', '../common/util/date', '../common/util/array', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('../common/util/cxBuilder'), require('./SelectorItem'), require('../common/util/date'), require('../common/util/array'), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.cxBuilder, global.SelectorItem, global.date, global.array, global.babelHelpers);
        global.Selector = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _cxBuilder, _SelectorItem, _date, _array, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _SelectorItem2 = babelHelpers.interopRequireDefault(_SelectorItem);

    var DateTime = babelHelpers.interopRequireWildcard(_date);

    /**
     * @file Calendar/CalendarSelector
     * @author cxtom(cxtom2010@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('CalendarSelector');

    var CalendarSelector = function (_Component) {
        babelHelpers.inherits(CalendarSelector, _Component);

        function CalendarSelector(props) {
            babelHelpers.classCallCheck(this, CalendarSelector);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onClick = _this.onClick.bind(_this);
            return _this;
        }

        CalendarSelector.prototype.onClick = function onClick(e) {
            var onChange = this.props.onChange;


            if (onChange) {
                onChange({
                    target: this,
                    mode: e.mode,
                    date: e.date
                });
            }
        };

        CalendarSelector.prototype.componentDidMount = function componentDidMount() {
            var item = this.refs.item ? _reactDom2['default'].findDOMNode(this.refs.item) : null;

            // FIX jsdom 上没有这个方法，所以先判断一下
            item && item.scrollIntoView && item.scrollIntoView();
        };

        CalendarSelector.prototype.componentDidUpdate = function componentDidUpdate() {
            var item = this.refs.item ? _reactDom2['default'].findDOMNode(this.refs.item) : null;

            // FIX jsdom 上没有这个方法，所以先判断一下
            item && item.scrollIntoView && item.scrollIntoView();
        };

        CalendarSelector.prototype.render = function render() {
            var _this2 = this;

            var _props = this.props;
            var minDate = _props.minDate;
            var maxDate = _props.maxDate;
            var date = _props.date;
            var rest = babelHelpers.objectWithoutProperties(_props, ['minDate', 'maxDate', 'date']);


            var children = [];

            var y = date.getFullYear();
            var m = date.getMonth();
            var d = date.getDate();

            if (this.isMonthView()) {
                children = (0, _array.range)(12).map(function (month, index) {

                    var newDate = new Date(y, month, d);
                    var disabled = DateTime.isDate(minDate) && DateTime.isBeforeMonth(newDate, minDate) || DateTime.isDate(maxDate) && DateTime.isAfterMonth(newDate, maxDate);
                    var selected = month === m;

                    return _react2['default'].createElement(_SelectorItem2['default'], {
                        key: index,
                        mode: 'month',
                        ref: selected ? 'item' : null,
                        date: newDate,
                        onClick: _this2.onClick,
                        disabled: disabled,
                        selected: selected });
                });
            } else {

                var maxRange = CalendarSelector.MAX_RANGE;

                (0, _array.range)(y - maxRange, y + maxRange).forEach(function (year, index) {

                    if (DateTime.isDate(minDate) && year < minDate.getFullYear() || DateTime.isDate(maxDate) && year > maxDate.getFullYear()) {

                        return;
                    }

                    var newDate = new Date(year, m, d);
                    var selected = year === y;

                    children.push(_react2['default'].createElement(_SelectorItem2['default'], {
                        key: index,
                        mode: 'year',
                        ref: selected ? 'item' : null,
                        date: newDate,
                        onClick: _this2.onClick,
                        selected: selected }));
                });
            }

            return _react2['default'].createElement(
                'ul',
                babelHelpers['extends']({}, rest, { className: cx(this.props).build() }),
                children
            );
        };

        CalendarSelector.prototype.isMonthView = function isMonthView() {
            var _props2 = this.props;
            var minDate = _props2.minDate;
            var maxDate = _props2.maxDate;
            var mode = _props2.mode;


            var onlyOneYear = false;

            // 如果范围中只有一年，则跳过yearview，直接显示month view
            if (mode === 'year' && DateTime.isDate(minDate) && DateTime.isDate(maxDate)) {
                onlyOneYear = DateTime.yearDiff(minDate, maxDate) === 0;
            }

            return mode === 'month' || onlyOneYear;
        };

        return CalendarSelector;
    }(_react.Component);

    exports['default'] = CalendarSelector;


    CalendarSelector.displayName = 'CalendarSelector';

    CalendarSelector.MAX_RANGE = 10;

    CalendarSelector.propTypes = {
        date: _react.PropTypes.object.isRequired,
        maxDate: _react.PropTypes.object,
        minDate: _react.PropTypes.object,
        onChange: _react.PropTypes.func,
        mode: _react.PropTypes.oneOf(['month', 'year'])
    };
});