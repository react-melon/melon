/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../common/util/cxBuilder', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../common/util/cxBuilder'), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.babelHelpers);
        global.Bar = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = SliderBar;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file Slider/SliderBar
     * @author cxtom(cxtom2010@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('SliderBar');

    function SliderBar(props) {
        var height = props.height;
        var max = props.max;
        var min = props.min;
        var value = props.value;


        var percent = (value - min) / (max - min) * 100 + '%';

        var activeStyle = {
            width: percent
        };

        var pointerStyle = {
            left: percent
        };

        return _react2['default'].createElement(
            'div',
            { style: { height: height }, className: cx(props).build() },
            _react2['default'].createElement('div', { style: activeStyle, className: cx().part('active').build() }),
            _react2['default'].createElement('div', { style: pointerStyle, className: cx().part('pointer').build() }),
            _react2['default'].createElement('div', { style: pointerStyle, className: cx().part('pointer-outer').build() })
        );
    }

    SliderBar.displayName = 'SliderBar';

    SliderBar.propTypes = {
        height: _react.PropTypes.number
    };
});