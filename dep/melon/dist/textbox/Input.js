define('melon/textbox/Input', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var cx = require('../common/util/cxBuilder').create('TextBoxInput');
    var TextBoxInput = React.createClass({
        displayName: 'TextBoxInput',
        render: function () {
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
                className: cx(this.props).addStates({ focus: isFocus }).build(),
                rows: multiline ? rows : null
            }));
        }
    });
    TextBoxInput.defaultProps = { rows: 2 };
    module.exports = TextBoxInput;
});