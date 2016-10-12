(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.babelHelpers);
        global.commander = mod.exports;
    }
})(this, function (exports, _react, _reactDom, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.default = createDialogCommand;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    /**
     * @file 命令式窗口管理
     * @author leon <ludafa@baidu.com>
     */

    var container = null;

    /**
     * 创建一个对话框构造器
     *
     * @param  {Function} Dialog ReactComponent
     * @return {Function}        一个可以实时创建对话框的函数
     */
    function createDialogCommand(Dialog) {

        return function (options) {

            if (!container) {
                container = document.createElement('div');
                container.className = 'melon-seperate-dialog-container';
                document.body.appendChild(container);
            }

            var element = document.createElement('div');
            container.appendChild(element);

            _reactDom2['default'].render(_react2['default'].createElement(Dialog, babelHelpers['extends']({}, options, { open: true })), element);

            return function () {
                _reactDom2['default'].unmountComponentAtNode(element);
                container.removeChild(element);
                element = null;
            };
        };
    }
});
//# sourceMappingURL=commander.js.map
