define('melon/dialog/Alert', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Dialog',
    '../Button',
    '../common/util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Dialog = require('../Dialog');
    var Button = require('../Button');
    var cx = require('../common/util/cxBuilder').create('Alert');
    var Alert = React.createClass({
        displayName: 'Alert',
        propTypes: babelHelpers._extends({}, Dialog.propTypes, { buttonVariants: React.PropTypes.arrayOf(React.PropTypes.string) }),
        getDefaultProps: function () {
            return babelHelpers._extends({}, Dialog.defaultProps, {
                maskClickClose: false,
                title: null,
                buttonVariants: ['primary']
            });
        },
        onAlertSubmit: function () {
            var onHide = this.props.onHide;
            onHide();
        },
        renderAction: function () {
            var _props = this.props;
            var buttonVariants = _props.buttonVariants;
            var size = _props.size;
            return React.createElement('div', { className: cx().part('actions').build() }, React.createElement(Button, {
                label: '\u786E\u5B9A',
                key: 'submit',
                size: size,
                type: 'button',
                onClick: this.onAlertSubmit,
                variants: buttonVariants
            }));
        },
        render: function () {
            var _props2 = this.props;
            var variants = _props2.variants;
            var rest = babelHelpers.objectWithoutProperties(_props2, ['variants']);
            return React.createElement(Dialog, babelHelpers._extends({}, rest, {
                actions: this.renderAction(),
                variants: [].concat(variants || [], ['alert'])
            }));
        }
    });
    module.exports = Alert;
});