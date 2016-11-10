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
        global.Option = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = SelectOption;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file Select/Option
     * @author leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('SelectOption');

    function SelectOption(props) {
        var children = props.children;
        var label = props.label;
        var disabled = props.disabled;
        var selected = props.selected;
        var value = props.value;
        var onClick = props.onClick;


        var className = cx(props).addStates({
            selected: selected,
            disabled: disabled
        }).build();

        return _react2['default'].createElement(
            'div',
            { className: className,
                key: value,
                'data-value': value,
                'data-role': 'option',
                title: label || children,
                onClick: !disabled && onClick ? function () {
                    return onClick({ value: value });
                } : null },
            children || label
        );
    }

    SelectOption.displayName = 'SelectOption';

    SelectOption.propTypes = {
        disabled: _react.PropTypes.bool,
        value: _react.PropTypes.string.isRequired,
        selected: _react.PropTypes.bool,
        label: _react.PropTypes.string
    };

    SelectOption.defaultProps = {
        disabled: false,
        selected: false
    };
});
//# sourceMappingURL=Option.js.map
