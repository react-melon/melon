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
        global.Panel = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = TabsPanel;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _propTypes2 = babelHelpers.interopRequireDefault(_propTypes);

    /**
     * @file melon Tabs Panel
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('TabsPanel');

    /**
     * melon/Tabs/TabPanel
     *
     * @class
     * @param {Object}  props        属性
     * @param {boolean} props.active 是否选中
     * @return {ReactElement}
     */
    function TabsPanel(props) {
        var active = props.active,
            others = babelHelpers.objectWithoutProperties(props, ['active']);


        return _react2['default'].createElement('div', babelHelpers['extends']({}, others, { className: cx(props).addStates({ active: active }).build() }));
    }

    TabsPanel.displayName = 'TabsPanel';

    TabsPanel.propTypes = {
        active: _propTypes2['default'].bool
    };

    TabsPanel.defaultProps = {
        active: false
    };
});
//# sourceMappingURL=Panel.js.map
