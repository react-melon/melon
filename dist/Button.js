/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', './common/util/cxBuilder', './ripples/TouchRipple', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('./common/util/cxBuilder'), require('./ripples/TouchRipple'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.TouchRipple, global.babelHelpers);
        global.Button = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _TouchRipple, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Button;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _TouchRipple2 = babelHelpers.interopRequireDefault(_TouchRipple);

    /**
     * @file melon/Button
     * @author leon<lupengyu@baidu.com>
     */

    var cx = (0, _cxBuilder.create)('Button');

    /* eslint-disable fecs-prefer-class */
    function Button(props) {
        var hasRipple = props.hasRipple;
        var label = props.label;
        var children = props.children;
        var disabled = props.disabled;
        var others = babelHelpers.objectWithoutProperties(props, ['hasRipple', 'label', 'children', 'disabled']);


        var className = cx(props).addVariants({
            icon: _react2['default'].Children.count(children) === 1 && (typeof children === 'undefined' ? 'undefined' : babelHelpers['typeof'](children)) === 'object' && children.type.displayName === 'Icon',
            ripple: hasRipple && !disabled
        }).build();

        return _react2['default'].createElement(
            'button',
            babelHelpers['extends']({}, others, {
                disabled: disabled,
                className: className }),
            label || children,
            hasRipple ? _react2['default'].createElement(_TouchRipple2['default'], null) : null
        );
    }
    /* eslint-enable fecs-prefer-class */

    Button.defaultProps = {
        hasRipple: true,
        disabled: false
    };

    Button.propTypes = {
        hasRipple: _react2['default'].PropTypes.bool,
        disabled: _react2['default'].PropTypes.bool
    };
});