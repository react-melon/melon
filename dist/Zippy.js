/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './common/util/cxBuilder', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./common/util/cxBuilder'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.babelHelpers);
        global.Zippy = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file Zippy
     * @author cxtom(cxtom2010@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('Zippy');

    var Zippy = function (_React$Component) {
        babelHelpers.inherits(Zippy, _React$Component);

        function Zippy() {
            babelHelpers.classCallCheck(this, Zippy);
            return babelHelpers.possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        Zippy.prototype.render = function render() {

            var props = this.props;

            var expand = props.expand;
            var horizontal = props.horizontal;
            var others = babelHelpers.objectWithoutProperties(props, ['expand', 'horizontal']);


            /* eslint-disable fecs-min-vars-per-destructure */

            var className = cx(props).addVariants(horizontal ? 'horizontal' : 'vertical').addStates({ close: !expand }).build();

            return _react2['default'].createElement('div', babelHelpers['extends']({}, others, { className: className }));
        };

        return Zippy;
    }(_react2['default'].Component);

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