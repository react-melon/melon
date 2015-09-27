define('melon/dialog/Alert', [
    'exports',
    '../babelHelpers',
    'react',
    '../Dialog',
    '../Button'
], function (exports) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Dialog = require('../Dialog');
    var Button = require('../Button');
    var Alert = function (_Dialog) {
        babelHelpers.inherits(Alert, _Dialog);
        function Alert(props) {
            babelHelpers.classCallCheck(this, Alert);
            babelHelpers.get(Object.getPrototypeOf(Alert.prototype), 'constructor', this).call(this, props);
            this.onAlertSubmit = this.onAlertSubmit.bind(this);
            this.type = 'dialog';
        }
        babelHelpers.createClass(Alert, [
            {
                key: 'getVariants',
                value: function getVariants(props) {
                    var variants = babelHelpers.get(Object.getPrototypeOf(Alert.prototype), 'getVariants', this).call(this, props);
                    variants.push('alert');
                    return variants;
                }
            },
            {
                key: 'onAlertSubmit',
                value: function onAlertSubmit() {
                    this.setState({ open: false }, function () {
                        this.onHide();
                    });
                }
            },
            {
                key: 'renderAction',
                value: function renderAction() {
                    var buttonVariants = this.props.buttonVariants;
                    return React.createElement('div', {
                        ref: 'dialogActions',
                        className: this.getPartClassName('actions')
                    }, React.createElement(Button, {
                        label: '\u786E\u5B9A',
                        key: 'submit',
                        onClick: this.onAlertSubmit,
                        variants: buttonVariants
                    }));
                }
            }
        ]);
        return Alert;
    }(Dialog);
    Alert.propTypes = babelHelpers._extends({}, Dialog.propTypes, { buttonVariants: React.PropTypes.arrayOf(React.PropTypes.string) });
    Alert.defaultProps = babelHelpers._extends({}, Dialog.defaultProps, {
        maskClickClose: false,
        title: null,
        buttonVariants: ['primary']
    });
    module.exports = Alert;
});