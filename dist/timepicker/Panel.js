/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../common/util/cxBuilder', './Header', './Clock', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../common/util/cxBuilder'), require('./Header'), require('./Clock'), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Header, global.Clock, global.babelHelpers);
        global.Panel = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Header, _Clock, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Header2 = babelHelpers.interopRequireDefault(_Header);

    var _Clock2 = babelHelpers.interopRequireDefault(_Clock);

    /**
     * @file melon/TimePickerPanel
     * @author cxtom(cxtom2008@qq.com)
     */

    var cx = (0, _cxBuilder.create)('TimePickerPanel');

    var TimePickerPanel = function (_Component) {
        babelHelpers.inherits(TimePickerPanel, _Component);

        function TimePickerPanel(props) {
            babelHelpers.classCallCheck(this, TimePickerPanel);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onModeChange = _this.onModeChange.bind(_this);
            _this.onTimeChange = _this.onTimeChange.bind(_this);

            _this.state = {
                time: props.time,
                mode: props.mode
            };
            return _this;
        }

        TimePickerPanel.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            var time = nextProps.time;

            if (this.props.time !== time) {
                this.setState({ time: time });
            }
        };

        TimePickerPanel.prototype.onModeChange = function onModeChange(_ref) {
            var mode = _ref.mode;

            this.setState({ mode: mode });
        };

        TimePickerPanel.prototype.onTimeChange = function onTimeChange(_ref2) {
            var _this2 = this;

            var time = _ref2.time;
            var _ref2$isModeChange = _ref2.isModeChange;
            var isModeChange = _ref2$isModeChange === undefined ? false : _ref2$isModeChange;


            var nextState = { time: time };

            if (this.props.mode === 'hour' && isModeChange) {
                nextState.mode = 'minute';
            }

            this.setState(nextState, function () {
                _this2.props.onChange({ time: time });
            });
        };

        TimePickerPanel.prototype.render = function render() {
            var _state = this.state;
            var time = _state.time;
            var mode = _state.mode;


            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).build() },
                _react2['default'].createElement(_Header2['default'], {
                    time: time,
                    mode: mode,
                    onModeChange: this.onModeChange,
                    onChange: this.onTimeChange }),
                _react2['default'].createElement(_Clock2['default'], {
                    time: time,
                    mode: mode,
                    onChange: this.onTimeChange })
            );
        };

        return TimePickerPanel;
    }(_react.Component);

    exports['default'] = TimePickerPanel;


    TimePickerPanel.displayName = 'TimePickerPanel';

    TimePickerPanel.defaultProps = {
        time: new Date(),
        mode: 'hour'
    };

    TimePickerPanel.propTypes = {
        time: _react.PropTypes.instanceOf(Date),
        mode: _react.PropTypes.oneOf(['hour', 'minute']),
        begin: _react.PropTypes.instanceOf(Date),
        end: _react.PropTypes.instanceOf(Date),
        format: _react.PropTypes.string,
        onChange: _react.PropTypes.func.isRequired
    };
});