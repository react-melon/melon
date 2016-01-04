define('melon/ripples/RippleCircle', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var RippleCircle = function (_React$Component) {
        babelHelpers.inherits(RippleCircle, _React$Component);
        function RippleCircle() {
            babelHelpers.classCallCheck(this, RippleCircle);
            _React$Component.apply(this, arguments);
        }
        RippleCircle.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            var _props = this.props;
            var opacity = _props.opacity;
            var scale = _props.scale;
            return opacity !== nextProps.opacity || scale !== nextProps.scale;
        };
        RippleCircle.prototype.render = function render() {
            var _props2 = this.props;
            var style = _props2.style;
            var opacity = _props2.opacity;
            var scale = _props2.scale;
            var other = babelHelpers.objectWithoutProperties(_props2, [
                'style',
                'opacity',
                'scale'
            ]);
            return React.createElement('div', babelHelpers._extends({}, other, {
                style: babelHelpers._extends({}, style, {
                    opacity: opacity,
                    WebkitTransform: 'scale(' + scale + ')',
                    MozTransform: 'scale(' + scale + ')',
                    msTransform: 'scale(' + scale + ')',
                    transform: 'scale(' + scale + ')'
                })
            }));
        };
        babelHelpers.createClass(RippleCircle, null, [{
                key: 'displayName',
                value: 'RippleCircle',
                enumerable: true
            }]);
        return RippleCircle;
    }(React.Component);
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