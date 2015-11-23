define('melon/textbox/Input', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/createClassNameBuilder'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var createCXBuilder = require('../common/util/createClassNameBuilder');
    var cxBuilder = createCXBuilder('TextboxInput');
    var TextBoxInput = React.createClass({
        displayName: 'TextBoxInput',
        render: function render() {
            var _props = this.props;
            var multiline = _props.multiline;
            var className = _props.className;
            var rows = _props.rows;
            var isFocus = _props.isFocus;
            var rest = babelHelpers.objectWithoutProperties(_props, [
                'multiline',
                'className',
                'rows',
                'isFocus'
            ]);
            var tag = multiline ? 'textarea' : 'input';
            return React.createElement(tag, babelHelpers._extends({}, rest, {
                className: cxBuilder.resolve(this.props).addState({ focus: isFocus }).addVariant('a', 'b', 'c').build(),
                rows: multiline ? rows : null
            }));
        }
    });
    TextBoxInput.defaultProps = { rows: 2 };
    module.exports = TextBoxInput;
});