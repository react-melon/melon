define('melon/ripples/TouchRipple', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'react-dom',
    '../Component',
    'react-motion',
    '../common/util/dom'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Component = require('../Component');
    var _require = require('react-motion');
    var spring = _require.spring;
    var TransitionMotion = _require.TransitionMotion;
    var dom = require('../common/util/dom');
    var TouchRipple = function (_Component) {
        babelHelpers.inherits(TouchRipple, _Component);
        function TouchRipple(props) {
            babelHelpers.classCallCheck(this, TouchRipple);
            babelHelpers.get(Object.getPrototypeOf(TouchRipple.prototype), 'constructor', this).call(this, props);
            this.onMouseDown = this.onMouseDown.bind(this);
            this.state = {
                now: 't' + 0,
                center: [
                    0,
                    0
                ]
            };
            this.type = 'touch-ripple';
        }
        babelHelpers.createClass(TouchRipple, [
            {
                key: 'onMouseDown',
                value: function onMouseDown(_ref) {
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
                        now: 't' + Date.now()
                    });
                }
            },
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var main = ReactDOM.findDOMNode(this);
                    this.position = dom.getPosition(main);
                    this.radius = Math.max(this.position.width, this.position.height) / 2;
                }
            },
            {
                key: 'willLeave',
                value: function willLeave(key, valOfKey) {
                    return babelHelpers._extends({}, valOfKey, {
                        opacity: spring(0, [
                            40,
                            15
                        ]),
                        scale: spring(2, [
                            40,
                            15
                        ])
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this = this;
                    var _state = this.state;
                    var _state$center = babelHelpers.slicedToArray(_state.center, 2);
                    var centerX = _state$center[0];
                    var centerY = _state$center[1];
                    var now = _state.now;
                    var styles = babelHelpers.defineProperty({}, now, {
                        opacity: spring(0.16),
                        scale: spring(0)
                    });
                    return React.createElement(TransitionMotion, {
                        willLeave: this.willLeave,
                        styles: styles
                    }, function (circles) {
                        return React.createElement('div', {
                            onMouseDown: _this.onMouseDown,
                            className: _this.getClassName()
                        }, Object.keys(circles).map(function (key) {
                            var _circles$key = circles[key];
                            var opacity = _circles$key.opacity;
                            var scale = _circles$key.scale;
                            return React.createElement('div', {
                                key: key,
                                className: _this.getPartClassName('circle'),
                                style: {
                                    width: _this.radius * 2 || 0,
                                    height: _this.radius * 2 || 0,
                                    opacity: opacity,
                                    left: centerX,
                                    top: centerY,
                                    transform: 'scale(' + scale + ')',
                                    WebkitTransform: 'scale(' + scale + ')'
                                }
                            });
                        }));
                    });
                }
            }
        ]);
        return TouchRipple;
    }(Component);
    var PropTypes = React.PropTypes;
    TouchRipple.propTypes = {
        centerRipple: PropTypes.bool,
        color: PropTypes.string,
        opacity: PropTypes.number
    };
    module.exports = TouchRipple;
});