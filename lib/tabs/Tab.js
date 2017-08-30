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
        global.Tab = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = Tab;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    /**
     * @file melon Tabs Tab
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('TabsItem');

    /* eslint-disable fecs-prefer-class */

    /**
     * melon/Tabs/TabPanel
     *
     * @class
     * @param {Object}              props          属性
     * @param {number}              props.index    序号
     * @param {string|ReactElement} props.label    Tab上显示的内容
     * @param {boolean}             props.disabled 是否不可选
     * @param {boolean}             props.selected 是否选中
     * @return {ReactElement}
     */
    function Tab(props) {
        var selected = props.selected,
            disabled = props.disabled,
            label = props.label,
            index = props.index,
            _onClick = props.onClick,
            others = babelHelpers.objectWithoutProperties(props, ['selected', 'disabled', 'label', 'index', 'onClick']);


        var className = cx(props).addStates({ selected: selected, disabled: disabled }).build();

        return _react2['default'].createElement(
            'li',
            babelHelpers['extends']({}, others, {
                className: className,
                onClick: function onClick(e) {
                    return disabled || _onClick(index);
                } }),
            label
        );
    }

    Tab.propTypes = {
        label: _propTypes2['default'].node,
        disabled: _propTypes2['default'].bool
    };

    Tab.defaultProps = {
        disabled: false,
        selected: false
    };
});
//# sourceMappingURL=Tab.js.map
