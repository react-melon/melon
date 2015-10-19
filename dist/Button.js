define('melon/Button', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component',
    './ripples/TouchRipple'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var TouchRipple = require('./ripples/TouchRipple');
    var Button = function (_Component) {
        babelHelpers.inherits(Button, _Component);
        function Button() {
            babelHelpers.classCallCheck(this, Button);
            babelHelpers.get(Object.getPrototypeOf(Button.prototype), 'constructor', this).apply(this, arguments);
        }
        babelHelpers.createClass(Button, [
            {
                key: 'getVariants',
                value: function getVariants(props) {
                    var variants = babelHelpers.get(Object.getPrototypeOf(Button.prototype), 'getVariants', this).call(this, props);
                    if (props.hasRipple) {
                        variants.push('ripple');
                    }
                    return variants;
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props = this.props;
                    var props = _props.props;
                    var hasRipple = _props.hasRipple;
                    var label = _props.label;
                    var children = _props.children;
                    var other = babelHelpers.objectWithoutProperties(_props, [
                        'props',
                        'hasRipple',
                        'label',
                        'children'
                    ]);
                    var content = label || children;
                    var style = hasRipple ? { position: 'relative' } : {};
                    return React.createElement('button', babelHelpers._extends({}, other, {
                        className: this.getClassName(),
                        style: style
                    }), hasRipple ? React.createElement(TouchRipple, null) : null, content);
                }
            }
        ]);
        return Button;
    }(Component);
    Button.propTypes = { hasRipple: React.PropTypes.bool };
    module.exports = Button;
});