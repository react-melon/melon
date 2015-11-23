define('melon/Button', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './common/util/cxBuilder',
    './ripples/TouchRipple'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./common/util/cxBuilder').create('Button');
    var TouchRipple = require('./ripples/TouchRipple');
    function Button(props) {
        var hasRipple = props.hasRipple;
        var label = props.label;
        var children = props.children;
        var disabled = props.disabled;
        var getVariantClassName = props.getVariantClassName;
        var others = babelHelpers.objectWithoutProperties(props, [
            'hasRipple',
            'label',
            'children',
            'disabled',
            'getVariantClassName'
        ]);
        var className = cx(props).addVariants({ ripple: hasRipple && !disabled }).build();
        return React.createElement('button', babelHelpers._extends({}, others, {
            disabled: disabled,
            className: className
        }), hasRipple ? React.createElement(TouchRipple, null) : null, label || children);
    }
    Button.defaultProps = { hasRipple: true };
    Button.propTypes = { hasRipple: React.PropTypes.bool };
    module.exports = Button;
});