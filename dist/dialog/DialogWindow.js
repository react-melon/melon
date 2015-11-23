define('melon/dialog/DialogWindow', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var PropTypes = React.PropTypes;
    var cx = require('../common/util/cxBuilder').create('DialogWindow');
    var DialogWindow = React.createClass({
        displayName: 'DialogWindow',
        propTypes: {
            top: PropTypes.number,
            footer: PropTypes.element,
            title: PropTypes.element
        },
        render: function render() {
            var _props = this.props;
            var children = _props.children;
            var top = _props.top;
            var title = _props.title;
            var footer = _props.footer;
            var others = babelHelpers.objectWithoutProperties(_props, [
                'children',
                'top',
                'title',
                'footer'
            ]);
            return React.createElement('div', babelHelpers._extends({}, others, {
                style: { marginTop: top },
                className: cx(this.props).build()
            }), title, children, footer);
        }
    });
    module.exports = DialogWindow;
});