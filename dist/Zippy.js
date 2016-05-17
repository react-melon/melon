/*! 2016 Baidu Inc. All Rights Reserved */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', 'react-motion', './common/util/cxBuilder', './common/util/dom', "./babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('react-motion'), require('./common/util/cxBuilder'), require('./common/util/dom'), require("./babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.reactMotion, global.cxBuilder, global.dom, global.babelHelpers);
        global.Zippy = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _reactMotion, _cxBuilder, _dom, babelHelpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    /**
     * @file Zippy
     * @author cxtom(cxtom2010@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('Zippy');

    function getStyle(horizontal, value) {
        var _ref;

        return _ref = {}, _ref[horizontal ? 'overflowX' : 'overflowY'] = 'hidden', _ref[horizontal ? 'width' : 'height'] = Math.round(value), _ref;
    }

    var Zippy = function (_React$Component) {
        babelHelpers.inherits(Zippy, _React$Component);

        function Zippy(props) {
            babelHelpers.classCallCheck(this, Zippy);

            var _this = babelHelpers.possibleConstructorReturn(this, _React$Component.call(this, props));

            _this.state = {
                size: props.size,
                first: true
            };
            _this.main = null;
            return _this;
        }

        Zippy.prototype.componentDidMount = function componentDidMount() {
            var _props = this.props;
            var isAdaptive = _props.isAdaptive;
            var horizontal = _props.horizontal;

            if (isAdaptive && !this.state.size) {
                this.setState({
                    size: (0, _dom.getPosition)(this.main)[horizontal ? 'width' : 'height'],
                    first: false
                });
            }
        };

        Zippy.prototype.componentWillUnmount = function componentWillUnmount() {
            this.main = null;
        };

        Zippy.prototype.render = function render() {

            var props = this.props;

            var expand = props.expand;
            var horizontal = props.horizontal;
            var style = props.style;
            var isAdaptive = props.isAdaptive;
            var others = babelHelpers.objectWithoutProperties(props, ['expand', 'horizontal', 'style', 'isAdaptive']);
            var _state = this.state;
            var _state$size = _state.size;
            var

            /* eslint-disable fecs-min-vars-per-destructure */

            size = _state$size === undefined ? 0 : _state$size;
            var first = _state.first;


            var me = this;

            var children = _react2['default'].Children.only(props.children);
            children = _react2['default'].cloneElement(children, {
                ref: function ref(main) {
                    me.main = _reactDom2['default'].findDOMNode(main);
                }
            });

            var className = cx(props).addStates({ expand: expand }).build();

            // 刚开始没有动画
            if (isAdaptive && !size && expand && first) {
                return _react2['default'].createElement(
                    'div',
                    babelHelpers['extends']({}, others, {
                        className: className,
                        style: style }),
                    children
                );
            }

            return _react2['default'].createElement(
                _reactMotion.Motion,
                { style: { value: (0, _reactMotion.spring)(expand ? size : 0) } },
                function (_ref2) {
                    var value = _ref2.value;
                    return _react2['default'].createElement(
                        'div',
                        babelHelpers['extends']({}, others, {
                            className: className,
                            style: babelHelpers['extends']({}, style, getStyle(horizontal, value)) }),
                        children
                    );
                }
            );
        };

        return Zippy;
    }(_react2['default'].Component);

    exports['default'] = Zippy;


    Zippy.displayName = 'Zippy';

    Zippy.propTypes = {
        size: _react.PropTypes.number,
        horizontal: _react.PropTypes.bool,
        expand: _react.PropTypes.bool,
        isAdaptive: _react.PropTypes.bool
    };

    Zippy.defaultProps = {
        horizontal: false,
        expand: false,
        isAdaptive: false
    };
});