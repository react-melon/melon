define('melon/textbox/FloatLabel', [
    'require',
    'exports',
    'module',
    'react',
    '../common/util/cxBuilder'
], function (require, exports, module) {
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('TextBoxFloatingLabel');
    function TextBoxFloatingLabel(props) {
        var floating = props.floating;
        var focused = props.focused;
        var label = props.label;
        var className = cx(props).addStates({
            focus: focused,
            floating: floating
        }).build();
        return React.createElement('label', { className: className }, label);
    }
    var PropTypes = React.PropTypes;
    TextBoxFloatingLabel.propTypes = {
        label: PropTypes.string.isRequired,
        floating: PropTypes.bool.isRequired
    };
    module.exports = TextBoxFloatingLabel;
});