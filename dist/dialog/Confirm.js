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
    var Confirm = function (_Dialog) {
        babelHelpers.inherits(Confirm, _Dialog);
        function Confirm(props) {
            babelHelpers.classCallCheck(this, Confirm);
            babelHelpers.get(Object.getPrototypeOf(Confirm.prototype), 'constructor', this).call(this, props);
            this.type = 'dialog';
        }
        babelHelpers.createClass(Confirm, [
            {
                key: 'onConfirmSubmit',
                value: function onConfirmSubmit(confirm) {
                    this.setState({ open: false }, function () {
                        var onConfirm = this.props.onConfirm;
                        if (onConfirm) {
                            onConfirm({
                                target: this,
                                value: confirm
                            });
                        }
                        this.onHide();
                    });
                }
            },
            {
                key: 'getVariants',
                value: function getVariants(props) {
                    var variants = babelHelpers.get(Object.getPrototypeOf(Confirm.prototype), 'getVariants', this).call(this, props);
                    variants.push('confirm');
                    return variants;
                }
            },
            {
                key: 'renderAction',
                value: function renderAction() {
                    var _props = this.props;
                    var buttonVariants = _props.buttonVariants;
                    var size = _props.size;
                    return React.createElement('div', {
                        ref: 'dialogActions',
                        className: this.getPartClassName('actions')
                    }, React.createElement(Button, {
                        label: '\u53D6\u6D88',
                        key: 'cancel',
                        size: size,
                        onClick: this.onConfirmSubmit.bind(this, false),
                        variants: buttonVariants
                    }), React.createElement(Button, {
                        label: '\u786E\u5B9A',
                        key: 'submit',
                        size: size,
                        onClick: this.onConfirmSubmit.bind(this, true),
                        variants: buttonVariants
                    }));
                }
            }
        ]);
        return Confirm;
    }(Dialog);
    Confirm.propTypes = babelHelpers._extends({}, Dialog.propTypes, {
        onConfirm: React.PropTypes.func,
        buttonVariants: React.PropTypes.arrayOf(React.PropTypes.string)
    });
    Confirm.defaultProps = babelHelpers._extends({}, Dialog.defaultProps, {
        maskClickClose: false,
        title: null,
        buttonVariants: ['primary']
    });
    module.exports = Confirm;
});