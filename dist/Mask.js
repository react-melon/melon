/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './dialog/windowScrollHelper', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./dialog/windowScrollHelper'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.windowScrollHelper, global.babelHelpers);
        global.Mask = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _windowScrollHelper, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var windowScrollHelper = babelHelpers.interopRequireWildcard(_windowScrollHelper);

    /**
     * @file melon/Mask
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('Mask');

    /**
     * melon/Pager
     *
     * @extends {React.Component}
     * @class
     */

    var Mask = function (_Component) {
        babelHelpers.inherits(Mask, _Component);

        function Mask() {
            babelHelpers.classCallCheck(this, Mask);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        Mask.prototype.componentDidMount = function componentDidMount() {
            var _props = this.props;
            var show = _props.show;
            var lockScrollingOnShow = _props.lockScrollingOnShow;


            if (show && lockScrollingOnShow) {
                this.lockScroll();
            }
        };

        Mask.prototype.shouldComponentUpdate = function shouldComponentUpdate(_ref) {
            var show = _ref.show;

            return this.props.show !== show;
        };

        Mask.prototype.componentDidUpdate = function componentDidUpdate() {
            var _props2 = this.props;
            var show = _props2.show;
            var lockScrollingOnShow = _props2.lockScrollingOnShow;

            show && lockScrollingOnShow ? this.lockScroll() : this.unlockScroll();
        };

        Mask.prototype.componentWillUnmount = function componentWillUnmount() {
            this.unlockScroll();
        };

        Mask.prototype.lockScroll = function lockScroll() {
            windowScrollHelper.stop();
        };

        Mask.prototype.unlockScroll = function unlockScroll() {
            windowScrollHelper.restore();
        };

        Mask.prototype.render = function render() {

            var props = this.props;
            var show = props.show;

            return _react2['default'].createElement('div', babelHelpers['extends']({}, props, { className: cx(props).addStates({ show: show }).build() }));
        };

        return Mask;
    }(_react.Component);

    exports['default'] = Mask;


    Mask.defaultProps = {
        lockScrollingOnShow: true,
        show: false
    };

    Mask.propTypes = {
        lockScrollingOnShow: _react.PropTypes.bool,
        show: _react.PropTypes.bool
    };
});