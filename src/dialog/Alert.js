/**
 * @file melon/dialog/Alert
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');
const Dialog = require('../Dialog');
const Button = require('../Button');

const Alert = React.createClass({

    displayName: 'Alert',

    propTypes: {
        ...Dialog.propTypes,
        onConfirm: React.PropTypes.func,
        buttonVariants: React.PropTypes.arrayOf(React.PropTypes.string)
    },

    getDefaultProps: function () {
        return {
            ...Dialog.defaultProps,
            maskClickClose: false,
            title: null,
            buttonVariants: ['primary']
        };
    },

    onConfirm() {
        const {onConfirm} = this.props;
        onConfirm && onConfirm();
    },

    renderAction() {

        const {
            buttonVariants,
            size
        } = this.props;

        return (
            <Button
                label="确定"
                key="submit"
                size={size}
                type="button"
                onClick={this.onConfirm}
                variants={buttonVariants} />
        );
    },

    render() {

        const {
            variants,
            ...rest
        } = this.props;

        return (
            <Dialog
                {...rest}
                ref="dialog"
                actions={this.renderAction()}
                variants={[...(variants || []), 'alert']} />
        );
    }

});

module.exports = Alert;
