define('melon/ripples/CenterRipple', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/cxBuilder',
    './RippleCircle',
    'react-motion'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('CenterRipple');
    var RippleCircle = require('./RippleCircle');
    var PropTypes = React.PropTypes;
    var _require = require('react-motion');
    var spring = _require.spring;
    var TransitionMotion = _require.TransitionMotion;
    var CenterRipple = React.createClass({
        displayName: 'CenterRipple',
        getInitialState: function () {
            return { now: 't' + 0 };
        },
        getDefaultProps: function () {
            return {
                opacity: 0.5,
                scale: 2
            };
        },
        propTypes: {
            opacity: PropTypes.number.isRequired,
            scale: PropTypes.number.isRequired,
            flag: PropTypes.bool
        },
        animate: function () {
            this.setState({ now: 't' + Date.now() });
        },
        componentWillReceiveProps: function (nextProps) {
            if (nextProps.flag === !this.props.flag) {
                this.animate();
            }
        },
        willLeave: function (key, valOfKey) {
            return babelHelpers._extends({}, valOfKey, {
                opacity: spring(0, [
                    60,
                    15
                ]),
                scale: spring(this.props.scale, [
                    60,
                    15
                ])
            });
        },
        render: function () {
            var _styles, _this = this;
            var now = this.state.now;
            var styles = (_styles = {}, _styles[now] = {
                opacity: spring(this.props.opacity),
                scale: spring(0)
            }, _styles);
            var className = cx(this.props).build();
            var circleClassName = cx().part('circle').build();
            return React.createElement(TransitionMotion, {
                willLeave: this.willLeave,
                styles: styles
            }, function (circles) {
                return React.createElement('div', { className: className }, Object.keys(circles).map(function (key) {
                    var _circles$key = circles[key];
                    var opacity = _circles$key.opacity;
                    var scale = _circles$key.scale;
                    opacity = Math.round(opacity * 100) / 100;
                    scale = opacity <= 0.01 ? _this.props.scale : Math.round(scale * 100) / 100;
                    return React.createElement(RippleCircle, {
                        key: key,
                        className: circleClassName,
                        opacity: opacity,
                        scale: scale
                    });
                }), _this.props.children);
            });
        }
    });
    module.exports = CenterRipple;
});