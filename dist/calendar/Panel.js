/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './Header', './Selector', './Pager', './Month', '../common/util/date', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./Header'), require('./Selector'), require('./Pager'), require('./Month'), require('../common/util/date'), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Header, global.Selector, global.Pager, global.Month, global.date, global.babelHelpers);
        global.Panel = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Header, _Selector, _Pager, _Month, _date, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Header2 = babelHelpers.interopRequireDefault(_Header);

    var _Selector2 = babelHelpers.interopRequireDefault(_Selector);

    var _Pager2 = babelHelpers.interopRequireDefault(_Pager);

    var _Month2 = babelHelpers.interopRequireDefault(_Month);

    var DateTime = babelHelpers.interopRequireWildcard(_date);

    /**
     * @file melon/CalendarPanel
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('CalendarPanel');

    var CalendarPanel = function (_Component) {
        babelHelpers.inherits(CalendarPanel, _Component);

        function CalendarPanel(props) {
            babelHelpers.classCallCheck(this, CalendarPanel);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onHeaderClick = _this.onHeaderClick.bind(_this);
            _this.onSelectorChange = _this.onSelectorChange.bind(_this);
            _this.onPagerChange = _this.onPagerChange.bind(_this);
            _this.onDateChange = _this.onDateChange.bind(_this);

            _this.state = {
                selectorType: 'main',
                month: props.date,
                date: props.date
            };

            return _this;
        }

        CalendarPanel.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            var date = nextProps.date;

            if (!DateTime.isEqualDate(date, this.props.date)) {
                this.setState({ date: date, month: date });
            }
        };

        CalendarPanel.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
            return !DateTime.isEqualDate(nextState.date, this.state.date) || !DateTime.isEqualMonth(nextState.month, this.state.month) || nextState.selectorType !== this.state.selectorType || nextProps.begin && this.props.begin && !DateTime.isEqualDate(nextProps.begin, this.props.begin) || nextProps.end && this.props.end && !DateTime.isEqualDate(nextProps.end, this.props.end) || !nextProps.begin && this.props.begin || !nextProps.end && this.props.end || nextProps.begin && !this.props.begin || nextProps.end && !this.props.end;
        };

        CalendarPanel.prototype.onHeaderClick = function onHeaderClick(e) {

            var selectorType = this.state.selectorType;

            this.setState({
                selectorType: selectorType === 'main' ? 'year' : 'main'
            });
        };

        CalendarPanel.prototype.onSelectorChange = function onSelectorChange(e) {
            var mode = e.mode;
            var date = e.date;
            var _props = this.props;
            var end = _props.end;
            var begin = _props.begin;


            mode = mode === 'year' ? 'month' : 'main';

            if (begin && DateTime.isBeforeDate(date, begin)) {
                date = begin;
            } else if (end && DateTime.isAfterDate(date, end)) {
                date = end;
            }

            this.setState({
                date: date,
                month: date,
                selectorType: mode
            });
        };

        CalendarPanel.prototype.onPagerChange = function onPagerChange(_ref) {
            var month = _ref.month;


            this.setState({ month: month });
        };

        CalendarPanel.prototype.onDateChange = function onDateChange(_ref2) {
            var date = _ref2.date;


            var month = this.state.month;
            var monthDiff = DateTime.monthDiff(date, month);

            if (monthDiff !== 0) {
                this.setState({
                    month: DateTime.addMonths(month, monthDiff)
                });
            }

            this.props.onChange({
                value: date
            });
        };

        CalendarPanel.prototype.render = function render() {
            var _props2 = this.props;
            var date = _props2.date;
            var lang = _props2.lang;
            var begin = _props2.begin;
            var end = _props2.end;
            var _state = this.state;
            var selectorType = _state.selectorType;
            var month = _state.month;


            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).build() },
                _react2['default'].createElement(_Header2['default'], {
                    date: date,
                    onClick: this.onHeaderClick }),
                _react2['default'].createElement(
                    'div',
                    { className: cx().part('main').build() },
                    _react2['default'].createElement(_Pager2['default'], {
                        minDate: begin,
                        maxDate: end,
                        onChange: this.onPagerChange,
                        month: month }),
                    _react2['default'].createElement(_Month2['default'], {
                        minDate: begin,
                        maxDate: end,
                        lang: lang,
                        month: month,
                        date: date,
                        onChange: this.onDateChange }),
                    _react2['default'].createElement(_Selector2['default'], {
                        style: { display: selectorType === 'main' ? 'none' : null },
                        date: date,
                        mode: selectorType === 'year' ? 'year' : 'month',
                        minDate: begin,
                        maxDate: end,
                        onChange: this.onSelectorChange })
                )
            );
        };

        return CalendarPanel;
    }(_react.Component);

    exports['default'] = CalendarPanel;


    CalendarPanel.displayName = 'CalendarPanel';

    CalendarPanel.defaultProps = {
        date: new Date()
    };

    CalendarPanel.propTypes = {
        date: _react.PropTypes.instanceOf(Date),
        begin: _react.PropTypes.instanceOf(Date),
        end: _react.PropTypes.instanceOf(Date)
    };
});