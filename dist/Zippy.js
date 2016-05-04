/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-motion', './common/util/cxBuilder', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-motion'), require('./common/util/cxBuilder'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactMotion, global.cxBuilder, global.babelHelpers);
        global.Zippy = mod.exports;
    }
})(this, function (exports, _react, _reactMotion, _cxBuilder, babelHelpers) {
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

    function getStyle(horizontal, value) {
        var _ref;

        return _ref = {}, _ref[horizontal ? 'overflowX' : 'overflowY'] = 'hidden', _ref[horizontal ? 'width' : 'height'] = Math.round(value), _ref;
    }

    var Zippy = function (_React$Component) {
        babelHelpers.inherits(Zippy, _React$Component);

        function Zippy() {
            babelHelpers.classCallCheck(this, Zippy);
            return babelHelpers.possibleConstructorReturn(this, _React$Component.apply(this, arguments));
        }

        Zippy.prototype.render = function render() {

            var props = this.props;

            var expand = props.expand;
            var size = props.size;
            var children = props.children;
            var horizontal = props.horizontal;
            var value = props.value;
            var style = props.style;
            var others = babelHelpers.objectWithoutProperties(props, ['expand', 'size', 'children', 'horizontal', 'value', 'style']);


            var className = cx(props).addStates({ expand: expand }).build();

            return _react2['default'].createElement(
                _reactMotion.Motion,
                { style: { value: (0, _reactMotion.spring)(expand ? size : 0, { stiffness: 60, damping: 15 }) } },
                function (_ref2) {
                    var value = _ref2.value;
                    return _react2['default'].createElement(
                        'div',
                        babelHelpers['extends']({}, others, {
                            className: className,
                            style: babelHelpers['extends']({}, style, getStyle(horizontal, value)) }),
                        children
                    );
                }
            );
        };

        return Zippy;
    }(_react2['default'].Component);

    exports['default'] = Zippy;


    Zippy.displayName = 'Zippy';

    Zippy.propTypes = {
        size: _react.PropTypes.number.isRequired,
        horizontal: _react.PropTypes.bool,
        expand: _react.PropTypes.bool
    };

    Zippy.defaultProps = {
        horizontal: false,
        expand: false
    };
});