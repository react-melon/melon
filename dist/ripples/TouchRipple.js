define('melon/ripples/TouchRipple', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'react-dom',
    '../common/util/cxBuilder',
    './RippleCircle',
    'underscore',
    '../common/util/dom',
    'react-motion'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var cx = require('../common/util/cxBuilder').create('TouchRipple');
    var RippleCircle = require('./RippleCircle');
    var _ = require('underscore');
    var dom = require('../common/util/dom');
    var _require = require('react-motion');
    var spring = _require.spring;
    var TransitionMotion = _require.TransitionMotion;
    var TouchRipple = React.createClass({
        displayName: 'TouchRipple',
        getInitialState: function () {
            return {
                now: 't' + 0,
                center: [
                    0,
                    0
                ]
            };
        },
        onMouseDown: function (_ref) {
            var pageX = _ref.pageX;
            var pageY = _ref.pageY;
            var _position = this.position;
            var top = _position.top;
            var left = _position.left;
            this.setState({
                center: [
                    pageX - left - this.radius,
                    pageY - top - this.radius
                ],
                now: 't' + _.now()
            });
        },
        componentDidMount: function () {
            this.updatePosition();
        },
        componentDidUpdate: function () {
            this.updatePosition();
        },
        componentWillUnmount: function () {
            this.position = this.radius = null;
        },
        updatePosition: function () {
            var main = ReactDOM.findDOMNode(this);
            this.position = dom.getPosition(main);
            this.radius = Math.max(this.position.width, this.position.height) / 2;
        },
        willLeave: function (key, valOfKey) {
            return babelHelpers._extends({}, valOfKey, {
                opacity: spring(0, [
                    60,
                    15
                ]),
                scale: spring(2, [
                    60,
                    15
                ])
            });
        },
        render: function () {
            var _styles, _this = this;
            var _state = this.state;
            var _state$center = _state.center;
            var centerX = _state$center[0];
            var centerY = _state$center[1];
            var now = _state.now;
            var styles = (_styles = {}, _styles[now] = {
                opacity: spring(this.props.opacity),
                scale: spring(0)
            }, _styles);
            var circleClassName = cx().part('circle').build();
            return React.createElement(TransitionMotion, {
                willLeave: this.willLeave,
                styles: styles
            }, function (circles) {
                return React.createElement('div', {
                    onMouseDown: _this.onMouseDown,
                    className: cx(_this.props).build()
                }, Object.keys(circles).map(function (key) {
                    var _circles$key = circles[key];
                    var opacity = _circles$key.opacity;
                    var scale = _circles$key.scale;
                    opacity = Math.round(opacity * 100) / 100;
                    scale = opacity <= 0.01 ? 2 : Math.round(scale * 100) / 100;
                    return React.createElement(RippleCircle, {
                        key: key,
                        className: circleClassName,
                        opacity: opacity,
                        scale: scale,
                        style: {
                            width: _this.radius * 2 || 0,
                            height: _this.radius * 2 || 0,
                            left: centerX,
                            top: centerY
                        }
                    });
                }));
            });
        }
    });
    var PropTypes = React.PropTypes;
    TouchRipple.defaultProps = { opacity: 0.3 };
    TouchRipple.propTypes = { opacity: PropTypes.number };
    module.exports = TouchRipple;
});