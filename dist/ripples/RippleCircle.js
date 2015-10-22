define('melon/ripples/RippleCircle', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var RippleCircle = function (_Component) {
        babelHelpers.inherits(RippleCircle, _Component);
        function RippleCircle(props) {
            babelHelpers.classCallCheck(this, RippleCircle);
            babelHelpers.get(Object.getPrototypeOf(RippleCircle.prototype), 'constructor', this).call(this, props);
            this.type = 'ripple-circle';
        }
        babelHelpers.createClass(RippleCircle, [
            {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps) {
                    var _props = this.props;
                    var opacity = _props.opacity;
                    var scale = _props.scale;
                    return opacity !== nextProps.opacity || scale !== nextProps.scale;
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props2 = this.props;
                    var style = _props2.style;
                    var opacity = _props2.opacity;
                    var scale = _props2.scale;
                    var other = babelHelpers.objectWithoutProperties(_props2, [
                        'style',
                        'opacity',
                        'scale'
                    ]);
                    style = babelHelpers._extends({}, style, {
                        opacity: opacity,
                        transform: 'scale(' + scale + ')',
                        WebkitTransform: 'scale(' + scale + ')'
                    });
                    return React.createElement('div', babelHelpers._extends({}, other, { style: style }));
                }
            }
        ]);
        return RippleCircle;
    }(Component);
    var PropTypes = React.PropTypes;
    RippleCircle.defaultProps = {
        opacity: 0.3,
        scale: 2
    };
    RippleCircle.propTypes = {
        opacity: PropTypes.number.isRequired,
        scale: PropTypes.number.isRequired
    };
    module.exports = RippleCircle;
});