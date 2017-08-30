(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'melon-core/classname/cxBuilder', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('melon-core/classname/cxBuilder'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.cxBuilder, global.babelHelpers);
        global.Option = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = SelectOption;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    /**
     * @file Select/Option
     * @author leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('SelectOption');

    /**
     * SelectOption
     *
     * @class
     * @param {*} props 属性
     */
    function SelectOption(props) {
        var children = props.children,
            label = props.label,
            disabled = props.disabled,
            selected = props.selected,
            value = props.value,
            onClick = props.onClick,
            style = props.style;


        var className = cx(props).addStates({
            selected: selected,
            disabled: disabled
        }).build();

        return _react2['default'].createElement(
            'div',
            {
                className: className,
                style: style,
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
        disabled: _propTypes2['default'].bool,
        value: _propTypes2['default'].string.isRequired,
        selected: _propTypes2['default'].bool,
        label: _propTypes2['default'].string
    };

    SelectOption.defaultProps = {
        disabled: false,
        selected: false
    };
});
//# sourceMappingURL=Option.js.map
