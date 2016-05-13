/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './InputComponent', './Validity', './common/util/cxBuilder', './common/util/dom', './slider/Bar', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./InputComponent'), require('./Validity'), require('./common/util/cxBuilder'), require('./common/util/dom'), require('./slider/Bar'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.InputComponent, global.Validity, global.cxBuilder, global.dom, global.Bar, global.babelHelpers);
        global.Slider = mod.exports;
    }
})(this, function (exports, _react, _InputComponent2, _Validity, _cxBuilder, _dom, _Bar, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    var _dom2 = babelHelpers.interopRequireDefault(_dom);

    var _Bar2 = babelHelpers.interopRequireDefault(_Bar);

    /**
     * @file melon/Slider
     * @author cxtom <cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('Slider');

    var Slider = function (_InputComponent) {
        babelHelpers.inherits(Slider, _InputComponent);

        function Slider(props, context) {
            babelHelpers.classCallCheck(this, Slider);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            _this.onMouseDown = _this.onMouseDown.bind(_this);
            _this.onMouseUp = _this.onMouseUp.bind(_this);
            _this.onMouseChange = _this.onMouseChange.bind(_this);

            _this.state = babelHelpers['extends']({}, _this.state, {
                active: false
            });
            return _this;
        }

        Slider.prototype.onMouseUp = function onMouseUp() {
            var main = this.refs.main;
            _dom2['default'].off(main, 'mouseup', this.onMouseUp);
            _dom2['default'].off(main, 'mousemove', this.onMouseChange);
            this.setState({ active: false });
        };

        Slider.prototype.onMouseChange = function onMouseChange(_ref) {
            var clientX = _ref.clientX;


            var main = this.refs.main;
            var position = _dom2['default'].getPosition(main);

            var _props = this.props;
            var max = _props.max;
            var min = _props.min;
            var step = _props.step;

            var value = this.state.value;

            var percent = (clientX - position.left) / position.width;
            var newValue = min + (max - min) * percent;
            newValue = Math.round(newValue / step) * step;

            if (value === newValue || newValue > max || newValue < min) {
                return;
            }

            _InputComponent.prototype.onChange.call(this, {
                type: 'change',
                target: this,
                value: newValue + ''
            });
        };

        Slider.prototype.onMouseDown = function onMouseDown(e) {
            var main = this.refs.main;
            _dom2['default'].on(main, 'mouseup', this.onMouseUp);
            _dom2['default'].on(main, 'mousemove', this.onMouseChange);
            this.onMouseChange(e);

            this.setState({ active: true });
        };

        Slider.prototype.renderHiddenInput = function renderHiddenInput() {

            var value = this.state.value;

            return _react2['default'].createElement('input', {
                type: 'hidden',
                value: value });
        };

        Slider.prototype.renderBar = function renderBar() {

            var value = +this.state.value;

            return _react2['default'].createElement(_Bar2['default'], babelHelpers['extends']({}, this.props, {
                value: value }));
        };

        Slider.prototype.render = function render() {

            var validity = this.state.validity;

            /* eslint-disable fecs-min-vars-per-destructure */

            var _props2 = this.props;
            var width = _props2.width;
            var _props2$style = _props2.style;
            var style = _props2$style === undefined ? {} : _props2$style;


            var active = this.state.active;

            var className = cx(this.props).addStates({ active: active }).build();

            return _react2['default'].createElement(
                'div',
                {
                    ref: 'main',
                    style: babelHelpers['extends']({}, style, { width: width }),
                    onMouseDown: this.onMouseDown,
                    className: className },
                this.renderHiddenInput(),
                this.renderBar(),
                _react2['default'].createElement(_Validity2['default'], { validity: validity })
            );
        };

        return Slider;
    }(_InputComponent3['default']);

    exports['default'] = Slider;


    Slider.displayName = 'Slider';

    Slider.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        defaultValue: '0',
        max: 100,
        min: 0,
        step: 1,
        width: '100%',
        height: 2
    });

    Slider.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        max: _react.PropTypes.number,
        min: _react.PropTypes.number,
        width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
    });
});