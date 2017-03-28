(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './ripples/TouchRipple', 'lodash/omit', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./ripples/TouchRipple'), require('lodash/omit'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.TouchRipple, global.omit, global.babelHelpers);
        global.Button = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _TouchRipple, _omit, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = Button;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _TouchRipple2 = babelHelpers.interopRequireDefault(_TouchRipple);

    var _omit2 = babelHelpers.interopRequireDefault(_omit);

    /**
     * @file melon/Button
     * @author leon<lupengyu@baidu.com>
     */

    var cx = (0, _cxBuilder.create)('Button');

    /* eslint-disable fecs-prefer-class */

    /**
     * melon/Button
     *
     * @class
     * @param {Object}  props           属性
     * @param {boolean} props.disabled  是否不可点击
     * @param {boolean} props.hasRipple 是否有ripple动画
     * @return {ReactElement}
     */
    function Button(props) {
        var hasRipple = props.hasRipple,
            label = props.label,
            children = props.children,
            disabled = props.disabled,
            others = babelHelpers.objectWithoutProperties(props, ['hasRipple', 'label', 'children', 'disabled']);


        var className = cx(props).addVariants({
            icon: _react2['default'].Children.count(children) === 1 && (typeof children === 'undefined' ? 'undefined' : babelHelpers['typeof'](children)) === 'object' && children.type.displayName === 'Icon',
            ripple: hasRipple && !disabled
        }).build();

        return _react2['default'].createElement(
            'button',
            babelHelpers['extends']({}, (0, _omit2['default'])(others, ['variants']), {
                disabled: disabled,
                className: className }),
            label || children,
            hasRipple && !disabled ? _react2['default'].createElement(_TouchRipple2['default'], null) : null
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
//# sourceMappingURL=Button.js.map
