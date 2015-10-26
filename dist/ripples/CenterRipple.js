define('melon/ripples/CenterRipple', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component',
    './RippleCircle',
    'react-motion'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var RippleCircle = require('./RippleCircle');
    var _require = require('react-motion');
    var spring = _require.spring;
    var TransitionMotion = _require.TransitionMotion;
    var CenterRipple = function (_Component) {
        babelHelpers.inherits(CenterRipple, _Component);
        babelHelpers.createClass(CenterRipple, null, [{
                key: 'displayName',
                value: 'CenterRipple',
                enumerable: true
            }]);
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
                            60,
                            15
                        ]),
                        scale: spring(this.props.scale, [
                            60,
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
                            if (opacity < 0.01) {
                                opacity = 0;
                                scale = _this.props.scale;
                            }
                            return React.createElement(RippleCircle, {
                                key: key,
                                className: _this.getPartClassName('circle'),
                                opacity: opacity,
                                scale: scale
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