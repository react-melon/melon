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
        global.Input = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

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
            var _props = this.props,
                multiline = _props.multiline,
                rows = _props.rows,
                isFocus = _props.isFocus,
                value = _props.value,
                variants = _props.variants,
                states = _props.states,
                rest = babelHelpers.objectWithoutProperties(_props, ['multiline', 'rows', 'isFocus', 'value', 'variants', 'states']);


            var Text = multiline ? 'textarea' : 'input';
            var className = cx().addVariants(variants).addStates(babelHelpers['extends']({}, states, {
                focus: isFocus
            })).build();

            var props = babelHelpers['extends']({}, rest, {
                className: className,
                value: value,
                rows: multiline ? rows : null
            });

            return _react2['default'].createElement(Text, props);
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
//# sourceMappingURL=Input.js.map
