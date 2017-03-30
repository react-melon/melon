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
     * @param  {Function}      Dialog      ReactComponent
     * @param  {Array<string>} closeEvents 指定的事件会被包裹成高阶函数，获得一个 close 函数
     * @return {Function} 一个可以实时创建对话框的函数
     */
    function createDialogCommand(Dialog) {
        var closeEvents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


        return function (options) {

            if (!container) {
                container = document.createElement('div');
                container.className = 'melon-seperate-dialog-container';
                document.body.appendChild(container);
            }

            var element = document.createElement('div');
            container.appendChild(element);

            options = closeEvents.reduce(function (options, event) {
                var _babelHelpers$extends;

                return babelHelpers['extends']({}, options, (_babelHelpers$extends = {}, _babelHelpers$extends[event] = function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    return options[event].apply(options, [close].concat(args));
                }, _babelHelpers$extends));
            }, options);

            _reactDom2['default'].render(_react2['default'].createElement(Dialog, babelHelpers['extends']({}, options, { open: true })), element);

            function close() {

                _reactDom2['default'].render(_react2['default'].createElement(Dialog, babelHelpers['extends']({}, options, { open: false })), element);

                setTimeout(function () {

                    _reactDom2['default'].unmountComponentAtNode(element);
                    container.removeChild(element);
                    element = null;
                }, 1000);
            }

            return close;
        };
    }
});
//# sourceMappingURL=commander.js.map
