define('melon/dialog/Confirm', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Dialog',
    '../Button'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Dialog = require('../Dialog');
    var Button = require('../Button');
    var Confirm = React.createClass({
        displayName: 'Confirm',
        onConfirmSubmit: function (confirm) {
            var _props = this.props;
            var onConfirm = _props.onConfirm;
            var onCancel = _props.onCancel;
            var callback = confirm ? onConfirm : onCancel;
            callback && callback();
        },
        renderAction: function () {
            var _props2 = this.props;
            var buttonVariants = _props2.buttonVariants;
            var size = _props2.size;
            return [
                React.createElement(Button, {
                    label: '\u53D6\u6D88',
                    key: 'cancel',
                    size: size,
                    type: 'button',
                    onClick: this.onConfirmSubmit.bind(this, false),
                    variants: [].concat(buttonVariants, ['cancel'])
                }),
                React.createElement(Button, {
                    label: '\u786E\u5B9A',
                    key: 'submit',
                    type: 'button',
                    size: size,
                    onClick: this.onConfirmSubmit.bind(this, true),
                    variants: [].concat(buttonVariants, ['confirm'])
                })
            ];
        },
        render: function () {
            var _props3 = this.props;
            var _props3$variants = _props3.variants;
            var variants = _props3$variants === undefined ? [] : _props3$variants;
            var rest = babelHelpers.objectWithoutProperties(_props3, ['variants']);
            return React.createElement(Dialog, babelHelpers._extends({}, rest, {
                actions: this.renderAction(),
                variants: [].concat(variants, ['confirm'])
            }));
        }
    });
    var PropTypes = React.PropTypes;
    Confirm.propTypes = babelHelpers._extends({}, Dialog.propTypes, {
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        buttonVariants: PropTypes.arrayOf(PropTypes.string)
    });
    Confirm.defaultProps = babelHelpers._extends({}, Dialog.defaultProps, {
        maskClickClose: false,
        title: null,
        buttonVariants: ['primary']
    });
    module.exports = Confirm;
});