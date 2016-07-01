/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './Option', 'melon-core/classname/cxBuilder', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./Option'), require('melon-core/classname/cxBuilder'), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Option, global.cxBuilder, global.babelHelpers);
        global.OptionGroup = mod.exports;
    }
})(this, function (exports, _react, _Option, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = SelectOptionGroup;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Option2 = babelHelpers.interopRequireDefault(_Option);

    /**
     * @file 下拉框选项组
     * @author leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('SelectOptionGroup');

    function SelectOptionGroup(props) {
        var children = props.children;
        var disabled = props.disabled;
        var label = props.label;
        var onClick = props.onClick;


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
                        disabled: child.props.disabled || disabled,
                        onClick: onClick }));
                })
            )
        );
    }

    SelectOptionGroup.propTypes = {
        disabled: _react.PropTypes.bool,
        label: _react.PropTypes.string.isRequired
    };
});