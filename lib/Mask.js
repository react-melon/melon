(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './dialog/windowScrollHelper', 'lodash/omit', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./dialog/windowScrollHelper'), require('lodash/omit'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.windowScrollHelper, global.omit, global.babelHelpers);
        global.Mask = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _windowScrollHelper, _omit, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var windowScrollHelper = babelHelpers.interopRequireWildcard(_windowScrollHelper);

    var _omit2 = babelHelpers.interopRequireDefault(_omit);

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
            var _props = this.props,
                show = _props.show,
                lockScrollingOnShow = _props.lockScrollingOnShow;


            if (show && lockScrollingOnShow) {
                this.lockScroll();
            }
        };

        Mask.prototype.shouldComponentUpdate = function shouldComponentUpdate(_ref) {
            var show = _ref.show;

            return this.props.show !== show;
        };

        Mask.prototype.componentDidUpdate = function componentDidUpdate() {
            var _props2 = this.props,
                show = _props2.show,
                lockScrollingOnShow = _props2.lockScrollingOnShow;

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
            var _props3 = this.props,
                show = _props3.show,
                variants = _props3.variants,
                states = _props3.states,
                rest = babelHelpers.objectWithoutProperties(_props3, ['show', 'variants', 'states']);


            var className = cx().addVariants(variants).addStates(babelHelpers['extends']({}, states, {
                show: show
            })).build();

            return _react2['default'].createElement('div', babelHelpers['extends']({}, (0, _omit2['default'])(rest, 'lockScrollingOnShow'), {
                className: className }));
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
//# sourceMappingURL=Mask.js.map
