(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.babelHelpers);
        global.RippleCircle = mod.exports;
    }
})(this, function (exports, _react, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var RippleCircle = function (_Component) {
        babelHelpers.inherits(RippleCircle, _Component);

        function RippleCircle() {
            babelHelpers.classCallCheck(this, RippleCircle);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        RippleCircle.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            var _props = this.props,
                opacity = _props.opacity,
                scale = _props.scale;


            return opacity !== nextProps.opacity || scale !== nextProps.scale;
        };

        RippleCircle.prototype.render = function render() {
            var _props2 = this.props,
                style = _props2.style,
                opacity = _props2.opacity,
                scale = _props2.scale,
                other = babelHelpers.objectWithoutProperties(_props2, ['style', 'opacity', 'scale']);


            return _react2['default'].createElement('div', babelHelpers['extends']({}, other, {
                style: babelHelpers['extends']({}, style, {
                    opacity: opacity,
                    WebkitTransform: 'scale(' + scale + ')',
                    MozTransform: 'scale(' + scale + ')',
                    msTransform: 'scale(' + scale + ')',
                    transform: 'scale(' + scale + ')'
                }) }));
        };

        return RippleCircle;
    }(_react.Component);

    exports['default'] = RippleCircle;


    RippleCircle.displayName = 'RippleCircle';

    RippleCircle.defaultProps = {
        opacity: 0.3,
        scale: 2
    };

    RippleCircle.propTypes = {
        opacity: _react.PropTypes.number.isRequired,
        scale: _react.PropTypes.number.isRequired
    };
});
//# sourceMappingURL=RippleCircle.js.map
