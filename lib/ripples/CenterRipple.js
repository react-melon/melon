(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './RippleCircle', 'react-motion', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./RippleCircle'), require('react-motion'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.RippleCircle, global.reactMotion, global.babelHelpers);
        global.CenterRipple = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _RippleCircle, _reactMotion, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _RippleCircle2 = babelHelpers.interopRequireDefault(_RippleCircle);

    /**
     * @file melon/CenterRipple
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('CenterRipple');

    var CenterRipple = function (_Component) {
        babelHelpers.inherits(CenterRipple, _Component);

        function CenterRipple(props) {
            babelHelpers.classCallCheck(this, CenterRipple);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.state = {
                now: 't' + 0
            };

            _this.willLeave = _this.willLeave.bind(_this);
            return _this;
        }

        CenterRipple.prototype.animate = function animate() {
            this.setState({
                now: 't' + Date.now()
            });
        };

        CenterRipple.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            if (nextProps.flag === !this.props.flag) {
                this.animate();
            }
        };

        CenterRipple.prototype.shouldCompoenntUpdate = function shouldCompoenntUpdate(nextProps, nextState) {
            return this.props.opacity !== nextProps.opacity || this.props.scale !== nextProps.scale || this.props.flag !== nextProps.flag || this.state.now !== nextState.now;
        };

        CenterRipple.prototype.willLeave = function willLeave(key, valOfKey) {
            return babelHelpers['extends']({}, valOfKey, {
                opacity: (0, _reactMotion.spring)(0, { stiffness: 60, damping: 15 }),
                scale: (0, _reactMotion.spring)(this.props.scale, { stiffness: 60, damping: 15 })
            });
        };

        CenterRipple.prototype.render = function render() {
            var _props = this.props,
                opacity = _props.opacity,
                children = _props.children;

            var now = this.state.now;

            var styles = [{
                key: now,
                style: {
                    opacity: (0, _reactMotion.spring)(opacity),
                    scale: (0, _reactMotion.spring)(0)
                }
            }];

            var className = cx(this.props).build();
            var circleClassName = cx().part('circle').build();

            return _react2['default'].createElement(
                _reactMotion.TransitionMotion,
                {
                    willLeave: this.willLeave,
                    styles: styles },
                function (interpolatedStyles) {
                    return _react2['default'].createElement(
                        'div',
                        { className: className },
                        interpolatedStyles.map(function (config) {
                            var _config$style = config.style,
                                opacity = _config$style.opacity,
                                scale = _config$style.scale;

                            return _react2['default'].createElement(_RippleCircle2['default'], {
                                key: config.key,
                                className: circleClassName,
                                opacity: opacity,
                                scale: scale });
                        }),
                        children
                    );
                }
            );
        };

        return CenterRipple;
    }(_react.Component);

    exports['default'] = CenterRipple;


    CenterRipple.defaultProps = {
        opacity: 0.5,
        scale: 2
    };

    CenterRipple.propTypes = {
        opacity: _react.PropTypes.number.isRequired,
        scale: _react.PropTypes.number.isRequired,
        flag: _react.PropTypes.bool
    };

    CenterRipple.displayName = 'CenterRipple';
});
//# sourceMappingURL=CenterRipple.js.map
