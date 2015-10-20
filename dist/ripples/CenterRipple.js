define('melon/ripples/CenterRipple', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component',
    'react-motion'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var _require = require('react-motion');
    var spring = _require.spring;
    var TransitionMotion = _require.TransitionMotion;
    var CenterRipple = function (_Component) {
        babelHelpers.inherits(CenterRipple, _Component);
        function CenterRipple(props) {
            babelHelpers.classCallCheck(this, CenterRipple);
            babelHelpers.get(Object.getPrototypeOf(CenterRipple.prototype), 'constructor', this).call(this, props);
            this.state = { now: 't' + 0 };
            this.willLeave = this.willLeave.bind(this);
            this.type = 'center-ripple';
        }
        babelHelpers.createClass(CenterRipple, [
            {
                key: 'animate',
                value: function animate() {
                    this.setState({ now: 't' + Date.now() });
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    if (nextProps.flag === !this.props.flag) {
                        this.animate();
                    }
                }
            },
            {
                key: 'willLeave',
                value: function willLeave(key, valOfKey) {
                    return babelHelpers._extends({}, valOfKey, {
                        opacity: spring(0, [
                            80,
                            15
                        ]),
                        scale: spring(this.props.scale, [
                            80,
                            15
                        ])
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this = this;
                    var now = this.state.now;
                    var styles = babelHelpers.defineProperty({}, now, {
                        opacity: spring(this.props.opacity),
                        scale: spring(0)
                    });
                    return React.createElement(TransitionMotion, {
                        willLeave: this.willLeave,
                        styles: styles
                    }, function (circles) {
                        return React.createElement('div', { className: _this.getClassName() }, Object.keys(circles).map(function (key) {
                            var _circles$key = circles[key];
                            var opacity = _circles$key.opacity;
                            var scale = _circles$key.scale;
                            return React.createElement('div', {
                                key: key,
                                className: _this.getPartClassName('circle'),
                                style: {
                                    opacity: opacity,
                                    transform: 'scale(' + scale + ')',
                                    WebkitTransform: 'scale(' + scale + ')'
                                }
                            });
                        }), _this.props.children);
                    });
                }
            }
        ]);
        return CenterRipple;
    }(Component);
    var PropTypes = React.PropTypes;
    CenterRipple.defaultProps = {
        opacity: 0.5,
        scale: 2
    };
    CenterRipple.propTypes = {
        opacity: PropTypes.number,
        scale: PropTypes.number,
        flag: PropTypes.bool
    };
    module.exports = CenterRipple;
});