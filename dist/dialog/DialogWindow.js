/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.babelHelpers);
        global.DialogWindow = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

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
            return nextProps.top !== this.props.top || nextProps.width !== this.props.width || nextProps.footer !== this.props.footer || nextProps.title !== this.props.title;
        };

        DialogWindow.prototype.render = function render() {
            var _props = this.props;
            var children = _props.children;
            var top = _props.top;
            var title = _props.title;
            var footer = _props.footer;
            var width = _props.width;
            var others = babelHelpers.objectWithoutProperties(_props, ['children', 'top', 'title', 'footer', 'width']);


            var style = {
                transform: 'translate(0, ' + top + 'px)',
                WebkitTransform: 'translate(0, ' + top + 'px)',
                msTransform: 'translate(0, ' + top + 'px)',
                MozTransform: 'translate(0, ' + top + 'px)'
            };

            if (top === 0) {
                style = {};
            }

            if (typeof width === 'number' || !isNaN(+width)) {
                style.width = width + 'px';
            }

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, others, { style: style, className: cx(this.props).build() }),
                title,
                children,
                footer
            );
        };

        return DialogWindow;
    }(_react.Component);

    exports['default'] = DialogWindow;


    DialogWindow.propTypes = {
        top: _react.PropTypes.number.isRequired,
        footer: _react.PropTypes.element,
        title: _react.PropTypes.element
    };
});