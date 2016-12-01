(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.babelHelpers);
        global.Zippy = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file Zippy
     * @author cxtom(cxtom2008@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('Zippy');

    /**
     * melon/Zippy
     *
     * @extends {React.Component}
     * @class
     */

    var Zippy = function (_Component) {
        babelHelpers.inherits(Zippy, _Component);

        function Zippy() {
            babelHelpers.classCallCheck(this, Zippy);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        Zippy.prototype.render = function render() {

            var props = this.props;

            var expand = props.expand,
                horizontal = props.horizontal,
                variants = props.variants,
                states = props.states,
                others = babelHelpers.objectWithoutProperties(props, ['expand', 'horizontal', 'variants', 'states']);


            var className = cx().addVariants(variants).addStates(states).addVariants(horizontal ? 'horizontal' : 'vertical').addStates({ close: !expand }).build();

            var style = this.props.style;

            if (!expand) {
                var _babelHelpers$extends;

                style = babelHelpers['extends']({}, style, (_babelHelpers$extends = {}, _babelHelpers$extends[horizontal ? 'width' : 'height'] = 0, _babelHelpers$extends));
            }

            return _react2['default'].createElement('div', babelHelpers['extends']({}, others, { style: style, className: className }));
        };

        return Zippy;
    }(_react.Component);

    exports['default'] = Zippy;


    Zippy.displayName = 'Zippy';

    Zippy.propTypes = {
        horizontal: _react.PropTypes.bool,
        expand: _react.PropTypes.bool
    };

    Zippy.defaultProps = {
        horizontal: false,
        expand: false
    };
});
//# sourceMappingURL=Zippy.js.map
