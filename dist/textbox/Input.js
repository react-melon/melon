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
        global.Input = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    /**
     * @file TextBox/Input
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('TextBoxInput');

    var TextBoxInput = function (_Component) {
        babelHelpers.inherits(TextBoxInput, _Component);

        function TextBoxInput() {
            babelHelpers.classCallCheck(this, TextBoxInput);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        TextBoxInput.prototype.render = function render() {

            var props = this.props;

            var multiline = props.multiline;
            var className = props.className;
            var rows = props.rows;
            var isFocus = props.isFocus;
            var rest = babelHelpers.objectWithoutProperties(props, ['multiline', 'className', 'rows', 'isFocus']);


            var tag = multiline ? 'textarea' : 'input';

            return (0, _react.createElement)(tag, babelHelpers['extends']({}, rest, {
                className: cx(props).addStates({
                    focus: isFocus
                }).build(),
                rows: multiline ? rows : null
            }));
        };

        return TextBoxInput;
    }(_react.Component);

    exports['default'] = TextBoxInput;


    TextBoxInput.displayName = 'TextBoxInput';

    TextBoxInput.propTypes = {
        rows: _react.PropTypes.number
    };

    TextBoxInput.defaultProps = {
        rows: 2
    };
});