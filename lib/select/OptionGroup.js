(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', './Option', 'melon-core/classname/cxBuilder', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('./Option'), require('melon-core/classname/cxBuilder'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.Option, global.cxBuilder, global.babelHelpers);
        global.OptionGroup = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _Option, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = SelectOptionGroup;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    var _Option2 = babelHelpers.interopRequireDefault(_Option);

    /**
     * @file 下拉框选项组
     * @author leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('SelectOptionGroup');

    /**
     * OptionGroup
     *
     * @class
     * @param {*} props 属性
     */
    function SelectOptionGroup(props) {
        var value = props.value,
            children = props.children,
            disabled = props.disabled,
            label = props.label,
            onClick = props.onClick;


        return _react2['default'].createElement(
            'div',
            { className: cx(props).build() },
            _react2['default'].createElement(
                'h4',
                { className: cx().part('title').build() },
                label
            ),
            _react2['default'].createElement(
                'div',
                { className: cx().part('list').build() },
                _react.Children.map(children, function (child, index) {

                    if (child.type !== 'option') {
                        return null;
                    }

                    return _react2['default'].createElement(_Option2['default'], babelHelpers['extends']({}, child.props, {
                        key: child.props.value,
                        selected: child.props.value === value,
                        disabled: child.props.disabled || disabled,
                        onClick: onClick }));
                })
            )
        );
    }

    SelectOptionGroup.propTypes = {
        disabled: _propTypes2['default'].bool,
        label: _propTypes2['default'].string.isRequired
    };
});
//# sourceMappingURL=OptionGroup.js.map
