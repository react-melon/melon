(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', './RippleCircle', '../common/util/dom', 'melon-core/classname/cxBuilder', 'react-motion', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('./RippleCircle'), require('../common/util/dom'), require('melon-core/classname/cxBuilder'), require('react-motion'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.RippleCircle, global.dom, global.cxBuilder, global.reactMotion, global.babelHelpers);
        global.TouchRipple = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _RippleCircle, _dom, _cxBuilder, _reactMotion, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _RippleCircle2 = babelHelpers.interopRequireDefault(_RippleCircle);

    var _dom2 = babelHelpers.interopRequireDefault(_dom);

    /**
     * @file melon/TouchRipple
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('TouchRipple');

    var TouchRipple = function (_Component) {
        babelHelpers.inherits(TouchRipple, _Component);

        function TouchRipple(props) {
            babelHelpers.classCallCheck(this, TouchRipple);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.state = {
                now: 't' + 0,
                center: [0, 0]
            };

            _this.onMouseDown = _this.onMouseDown.bind(_this);
            _this.willLeave = _this.willLeave.bind(_this);
            return _this;
        }

        TouchRipple.prototype.onMouseDown = function onMouseDown(_ref) {
            var pageX = _ref.pageX;
            var pageY = _ref.pageY;


            this.setState({
                center: this.getCenter(pageX, pageY),
                now: 't' + new Date().getTime()
            });
        };

        TouchRipple.prototype.sholdComponentUpdate = function sholdComponentUpdate(nextProps, nextState) {
            var props = this.props;
            var state = this.state;

            return props.opacity !== nextProps.opacity || state.now !== nextState.now;
        };

        TouchRipple.prototype.getCenter = function getCenter(pageX, pageY) {

            var main = _reactDom2['default'].findDOMNode(this);
            var position = _dom2['default'].getPosition(main);
            var radius = Math.max(position.width, position.height) / 2;

            this.radius = radius;

            return [pageX - position.left - radius, pageY - position.top - radius];
        };

        TouchRipple.prototype.willLeave = function willLeave(key, valOfKey) {
            return babelHelpers['extends']({}, valOfKey, {
                opacity: (0, _reactMotion.spring)(0, { stiffness: 60, damping: 15 }),
                scale: (0, _reactMotion.spring)(2, { stiffness: 60, damping: 15 })
            });
        };

        TouchRipple.prototype.render = function render() {
            var _this2 = this;

            var _state = this.state;
            var _state$center = _state.center;
            var centerX = _state$center[0];
            var centerY = _state$center[1];
            var now = _state.now;


            var styles = [{
                key: now,
                style: {
                    opacity: (0, _reactMotion.spring)(this.props.opacity),
                    scale: (0, _reactMotion.spring)(0)
                }
            }];

            var circleClassName = cx().part('circle').build();

            return _react2['default'].createElement(
                _reactMotion.TransitionMotion,
                {
                    willLeave: this.willLeave,
                    styles: styles },
                function (interpolatedStyles) {
                    return _react2['default'].createElement(
                        'div',
                        {
                            onMouseDown: _this2.onMouseDown,
                            className: cx(_this2.props).build() },
                        interpolatedStyles.map(function (config) {
                            var _config$style = config.style;
                            var opacity = _config$style.opacity;
                            var scale = _config$style.scale;

                            return _react2['default'].createElement(_RippleCircle2['default'], {
                                key: config.key,
                                className: circleClassName,
                                opacity: opacity,
                                scale: scale,
                                style: {
                                    width: _this2.radius * 2 || 0,
                                    height: _this2.radius * 2 || 0,
                                    left: centerX,
                                    top: centerY
                                } });
                        })
                    );
                }
            );
        };

        return TouchRipple;
    }(_react.Component);

    exports['default'] = TouchRipple;


    TouchRipple.defaultProps = {
        opacity: 0.3
    };

    TouchRipple.propTypes = {
        opacity: _react.PropTypes.number
    };
});
//# sourceMappingURL=TouchRipple.js.map
