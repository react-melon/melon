define('melon/dialog/Confirm', [
    'exports',
    '../babelHelpers',
    'react',
    '../Dialog',
    '../Component',
    '../Button'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Dialog = require('../Dialog');
    var Component = require('../Component');
    var Button = require('../Button');
    var Confirm = function (_Component) {
        babelHelpers.inherits(Confirm, _Component);
        function Confirm(props) {
            babelHelpers.classCallCheck(this, Confirm);
            babelHelpers.get(Object.getPrototypeOf(Confirm.prototype), 'constructor', this).call(this, props);
            this.state = { open: props.open || false };
        }
        babelHelpers.createClass(Confirm, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var open = nextProps.open;
                    if (!open) {
                        return;
                    }
                    this.setState({ open: open });
                }
            },
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
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _props = this.props;
                    var actions = _props.actions;
                    var children = _props.children;
                    var others = babelHelpers.objectWithoutProperties(_props, [
                        'actions',
                        'children'
                    ]);
                    actions = [
                        React.createElement(Button, {
                            label: '\u53D6\u6D88',
                            key: 'cancel',
                            onClick: this.onConfirmSubmit.bind(this, false),
                            variants: ['primary']
                        }),
                        React.createElement(Button, {
                            label: '\u786E\u5B9A',
                            key: 'submit',
                            onClick: this.onConfirmSubmit.bind(this, true),
                            variants: ['primary']
                        })
                    ];
                    return React.createElement(Dialog, babelHelpers._extends({}, others, {
                        ref: 'dialog',
                        open: this.state.open,
                        actions: actions
                    }), children);
                }
            }
        ]);
        return Confirm;
    }(Component);
    Confirm.propTypes = babelHelpers._extends({}, Dialog.propTypes, { onConfirm: React.PropTypes.func });
    Confirm.defaultProps = babelHelpers._extends({}, Dialog.defaultProps, {
        maskClickClose: false,
        title: null
    });
    module.exports = Confirm;
});