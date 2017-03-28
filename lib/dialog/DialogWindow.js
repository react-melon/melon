(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', 'melon-core/util/shallowEqual', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('melon-core/util/shallowEqual'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.shallowEqual, global.babelHelpers);
        global.DialogWindow = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _shallowEqual, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _shallowEqual2 = babelHelpers.interopRequireDefault(_shallowEqual);

    /**
     * @file melon/Dialog/DialogWindow
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('DialogWindow');

    var DialogWindow = function (_Component) {
        babelHelpers.inherits(DialogWindow, _Component);

        function DialogWindow() {
            babelHelpers.classCallCheck(this, DialogWindow);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        DialogWindow.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return !(0, _shallowEqual2['default'])(this.props, nextProps);
        };

        DialogWindow.prototype.render = function render() {
            var _props = this.props,
                children = _props.children,
                title = _props.title,
                footer = _props.footer,
                width = _props.width,
                style = _props.style,
                others = babelHelpers.objectWithoutProperties(_props, ['children', 'title', 'footer', 'width', 'style']);


            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, others, {
                    style: babelHelpers['extends']({}, style, { width: width + 'px' }),
                    className: cx(this.props).build() }),
                title,
                children,
                footer
            );
        };

        return DialogWindow;
    }(_react.Component);

    exports['default'] = DialogWindow;


    DialogWindow.propTypes = {
        footer: _react.PropTypes.element,
        title: _react.PropTypes.element
    };
});
//# sourceMappingURL=DialogWindow.js.map
