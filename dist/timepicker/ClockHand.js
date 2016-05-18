/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'moment', '../common/util/cxBuilder', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('moment'), require('../common/util/cxBuilder'), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.moment, global.cxBuilder, global.babelHelpers);
        global.ClockHand = mod.exports;
    }
})(this, function (exports, _react, _moment, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _moment2 = babelHelpers.interopRequireDefault(_moment);

    /**
     * @file melon/TimePickerClockHand
     * @author cxtom(cxtom2008@qq.com)
     */

    var cx = (0, _cxBuilder.create)('TimePickerClockHand');

    var TimePickerClockHand = function (_Component) {
        babelHelpers.inherits(TimePickerClockHand, _Component);

        function TimePickerClockHand() {
            babelHelpers.classCallCheck(this, TimePickerClockHand);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        TimePickerClockHand.prototype.getStyle = function getStyle() {
            var _props = this.props;
            var time = _props.time;
            var mode = _props.mode;


            var number = (0, _moment2['default'])(time)[mode]();
            var single = mode === 'minute' ? 6 : 30;
            var deg = (180 + single * number) % 360;

            return ['Webkit', 'Moz', 'ms', ''].reduce(function (result, prefix) {
                var _babelHelpers$extends;

                return babelHelpers['extends']({}, result, (_babelHelpers$extends = {}, _babelHelpers$extends['' + prefix + (prefix ? 'T' : 't') + 'ransform'] = 'translate(-50%, 0) rotate(' + deg + 'deg)', _babelHelpers$extends));
            }, {});
        };

        TimePickerClockHand.prototype.render = function render() {
            var _props2 = this.props;
            var time = _props2.time;
            var mode = _props2.mode;


            var className = cx(this.props).addVariants(mode === 'minute' && (0, _moment2['default'])(time).minute() % 5 !== 0 ? 'end' : null).build();

            return _react2['default'].createElement(
                'div',
                { className: className, style: this.getStyle() },
                _react2['default'].createElement('div', { className: cx().part('end').build() })
            );
        };

        return TimePickerClockHand;
    }(_react.Component);

    exports['default'] = TimePickerClockHand;


    TimePickerClockHand.displayName = 'TimePickerClockHand';

    TimePickerClockHand.propTypes = {
        time: _react.PropTypes.instanceOf(Date).isRequired,
        mode: _react.PropTypes.oneOf(['hour', 'minute']).isRequired,
        onChange: _react.PropTypes.func
    };
});