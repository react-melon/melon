define('melon/dialog/Alert', [
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
    var Alert = function (_Component) {
        babelHelpers.inherits(Alert, _Component);
        function Alert(props) {
            babelHelpers.classCallCheck(this, Alert);
            babelHelpers.get(Object.getPrototypeOf(Alert.prototype), 'constructor', this).call(this, props);
            this.onAlertSubmit = this.onAlertSubmit.bind(this);
            this.onHide = this.onHide.bind(this);
            this.state = { open: props.open || false };
        }
        babelHelpers.createClass(Alert, [
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
                key: 'onAlertSubmit',
                value: function onAlertSubmit() {
                    this.setState({ open: false });
                }
            },
            {
                key: 'onHide',
                value: function onHide() {
                    var onHide = this.props.onHide;
                    if (onHide) {
                        onHide();
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var actions = [React.createElement(Button, {
                            label: '\u786E\u5B9A',
                            key: 'submit',
                            onClick: this.onAlertSubmit,
                            variants: ['primary']
                        })];
                    return React.createElement(Dialog, babelHelpers._extends({}, props, {
                        open: this.state.open,
                        actions: actions,
                        onHide: this.onHide
                    }), props.children);
                }
            }
        ]);
        return Alert;
    }(Component);
    Alert.defaultProps = babelHelpers._extends({}, Dialog.defaultProps, {
        maskClickClose: false,
        title: null
    });
    module.exports = Alert;
});