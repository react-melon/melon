/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', './InputComponent', './Validity', './common/util/cxBuilder', './common/util/dom', './slider/Bar', './slider/getNewValue', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('./InputComponent'), require('./Validity'), require('./common/util/cxBuilder'), require('./common/util/dom'), require('./slider/Bar'), require('./slider/getNewValue'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.InputComponent, global.Validity, global.cxBuilder, global.dom, global.Bar, global.getNewValue, global.babelHelpers);
        global.Slider = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _InputComponent2, _Validity, _cxBuilder, _dom, _Bar, _getNewValue, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    var _dom2 = babelHelpers.interopRequireDefault(_dom);

    var _Bar2 = babelHelpers.interopRequireDefault(_Bar);

    var _getNewValue2 = babelHelpers.interopRequireDefault(_getNewValue);

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

        Slider.prototype.componentWillUnmount = function componentWillUnmount() {
            this.slider = null;
        };

        Slider.prototype.onMouseUp = function onMouseUp() {
            _dom2['default'].off(window, 'mouseup', this.onMouseUp);
            _dom2['default'].off(window, 'mousemove', this.onMouseChange);
            this.setState({ active: false });
        };

        Slider.prototype.onMouseChange = function onMouseChange(_ref) {
            var clientX = _ref.clientX;
            var _props = this.props;
            var maximum = _props.maximum;
            var minimum = _props.minimum;
            var step = _props.step;

            var value = this.state.value;

            var newValue = (0, _getNewValue2['default'])(this.slider, clientX, maximum, minimum, step);

            if (value === newValue || newValue > maximum || newValue < minimum) {
                return;
            }

            this.onSliderChange(newValue);
        };

        Slider.prototype.onSliderChange = function onSliderChange(newValue) {
            _InputComponent.prototype.onChange.call(this, {
                type: 'change',
                target: this,
                value: newValue
            });
        };

        Slider.prototype.onMouseDown = function onMouseDown(e) {
            _dom2['default'].on(window, 'mouseup', this.onMouseUp);
            _dom2['default'].on(window, 'mousemove', this.onMouseChange);
            this.onMouseChange(e);

            this.setState({ active: true });
        };

        Slider.prototype.getSliderValue = function getSliderValue() {
            return this.state.value;
        };

        Slider.prototype.renderHiddenInput = function renderHiddenInput() {

            var value = this.state.value;

            return _react2['default'].createElement('input', {
                type: 'hidden',
                value: value });
        };

        Slider.prototype.renderBar = function renderBar() {
            var _this2 = this;

            return _react2['default'].createElement(_Bar2['default'], babelHelpers['extends']({}, this.props, {
                ref: function ref(slider) {
                    _this2.slider = _reactDom2['default'].findDOMNode(slider);
                },
                active: this.state.active,
                onMouseDown: this.onMouseDown,
                value: this.getSliderValue() }));
        };

        Slider.prototype.render = function render() {

            var validity = this.state.validity;

            /* eslint-disable fecs-minimum-vars-per-destructure */

            var _props2 = this.props;
            var width = _props2.width;
            var _props2$style = _props2.style;
            var style = _props2$style === undefined ? {} : _props2$style;


            var className = cx(this.props).build();

            return _react2['default'].createElement(
                'div',
                {
                    style: babelHelpers['extends']({}, style, { width: width }),
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
        defaultValue: 0,
        maximum: 100,
        minimum: 0,
        step: 1,
        width: '100%',
        height: 2
    });

    Slider.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        defaultValue: _react.PropTypes.number,
        value: _react.PropTypes.number,
        maximum: _react.PropTypes.number,
        minimum: _react.PropTypes.number,
        width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        pointerSize: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
    });
});