(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'melon-core/classname/cxBuilder', '../Tooltip', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('melon-core/classname/cxBuilder'), require('../Tooltip'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.cxBuilder, global.Tooltip, global.babelHelpers);
        global.Bar = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _cxBuilder, _Tooltip, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _Tooltip2 = babelHelpers.interopRequireDefault(_Tooltip);

    /**
     * @file Slider/SliderBar
     * @author cxtom(cxtom2008@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('SliderBar');

    var SliderBar = function (_Component) {
        babelHelpers.inherits(SliderBar, _Component);

        function SliderBar() {
            babelHelpers.classCallCheck(this, SliderBar);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        SliderBar.prototype.render = function render() {
            var _props = this.props,
                height = _props.height,
                maximum = _props.maximum,
                minimum = _props.minimum,
                value = _props.value,
                disableFocusRipple = _props.disableFocusRipple,
                pointerSize = _props.pointerSize,
                active = _props.active,
                states = _props.states,
                variants = _props.variants,
                rest = babelHelpers.objectWithoutProperties(_props, ['height', 'maximum', 'minimum', 'value', 'disableFocusRipple', 'pointerSize', 'active', 'states', 'variants']);


            var percent = (value - minimum) / (maximum - minimum) * 100 + '%';

            var activeStyle = {
                width: percent
            };

            var pointerStyle = {};
            var outerPointerStyle = {};

            if (pointerSize) {
                pointerStyle.width = pointerStyle.height = pointerSize;

                if (typeof pointerSize === 'string') {
                    var unit = pointerSize.replace(/\d(\.)?\d*/, '');
                    var _value = parseFloat(pointerSize);
                    outerPointerStyle.width = outerPointerStyle.height = _value * 2 + unit;
                    outerPointerStyle.marginTop = -_value + unit;
                    pointerStyle.marginTop = -_value / 2 + unit;
                } else {
                    outerPointerStyle.width = outerPointerStyle.height = pointerSize * 2;
                    outerPointerStyle.marginTop = -pointerSize;
                    pointerStyle.marginTop = -pointerSize / 2;
                }
            }

            var className = cx().part('wrapper').addVariants(variants).addStates(babelHelpers['extends']({}, states, { active: active })).build();

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, rest, { className: className }),
                _react2['default'].createElement(
                    'div',
                    { style: { height: height }, className: cx(this.props).build() },
                    _react2['default'].createElement('div', { style: activeStyle, className: cx().part('active').build() }),
                    _react2['default'].createElement(_Tooltip2['default'], {
                        content: value,
                        style: babelHelpers['extends']({ left: percent }, pointerStyle),
                        className: cx().part('pointer').build() }),
                    disableFocusRipple ? null : _react2['default'].createElement('div', {
                        style: babelHelpers['extends']({ left: percent }, outerPointerStyle),
                        className: cx().part('pointer-outer').build() })
                )
            );
        };

        return SliderBar;
    }(_react.Component);

    exports['default'] = SliderBar;


    SliderBar.displayName = 'SliderBar';

    SliderBar.propTypes = {
        width: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
        height: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
        maximum: _propTypes2['default'].number,
        minimum: _propTypes2['default'].number,
        disableFocusRipple: _propTypes2['default'].bool
    };

    SliderBar.defaultProps = {
        height: 2,
        width: '100%',
        disableFocusRipple: false
    };
});
//# sourceMappingURL=Bar.js.map
