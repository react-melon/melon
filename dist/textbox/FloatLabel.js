define('melon/textbox/FloatLabel', [
    'require',
    'exports',
    'module',
    'react',
    '../createComponent',
    '../common/util/classname'
], function (require, exports, module) {
    var React = require('react');
    var createComponent = require('../createComponent');
    var cx = require('../common/util/classname');
    function TextBoxFloatingLabel(props) {
        var className = props.className;
        var floating = props.floating;
        var focused = props.focused;
        var getStateClassName = props.getStateClassName;
        var label = props.label;
        return React.createElement('label', {
            className: cx.createClassName(className, getStateClassName({
                focus: focused,
                floating: floating
            }))
        }, label);
    }
    var PropTypes = React.PropTypes;
    TextBoxFloatingLabel.propTypes = {
        label: PropTypes.string.isRequired,
        floating: PropTypes.bool.isRequired
    };
    module.exports = createComponent('TextboxFloatingLabel', TextBoxFloatingLabel);
});