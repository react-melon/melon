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
        global.Panel = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = TabsPanel;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file melon Tabs Panel
     * @author cxtom<cxtom2010@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('TabsPanel');

    function TabsPanel(props) {
        var active = props.active;
        var others = babelHelpers.objectWithoutProperties(props, ['active']);


        return _react2['default'].createElement('div', babelHelpers['extends']({}, others, { className: cx(props).addStates({ active: active }).build() }));
    }

    TabsPanel.displayName = 'TabsPanel';

    TabsPanel.propTypes = {
        active: _react.PropTypes.bool
    };

    TabsPanel.defaultProps = {
        active: false
    };
});