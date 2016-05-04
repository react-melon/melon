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
        global.FloatLabel = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = TextBoxFloatingLabel;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file melon/textbox/FloatingLabel
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('TextBoxFloatingLabel');

    /* eslint-disable fecs-prefer-class */
    function TextBoxFloatingLabel(props) {
        var floating = props.floating;
        var focused = props.focused;
        var label = props.label;


        var className = cx(props).addStates({
            focus: focused,
            floating: floating
        }).build();

        return _react2['default'].createElement(
            'label',
            { className: className },
            label
        );
    }

    TextBoxFloatingLabel.propTypes = {
        label: _react.PropTypes.string.isRequired,
        floating: _react.PropTypes.bool.isRequired
    };
});