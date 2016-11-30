(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.babelHelpers);
        global.FloatLabel = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = TextBoxFloatingLabel;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file melon/textbox/FloatingLabel
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('TextBoxFloatingLabel');

    /* eslint-disable fecs-prefer-class */
    function TextBoxFloatingLabel(props) {
        var floating = props.floating,
            focused = props.focused,
            label = props.label;


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
//# sourceMappingURL=FloatLabel.js.map
