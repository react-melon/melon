/**
 * @file melon/dialog/Alert
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');
const Dialog = require('../Dialog');
const Button = require('../Button');
const cx = require('../common/util/cxBuilder').create('Alert');

const Alert = React.createClass({

    displayName: 'Alert',

    propTypes: {
        ...Dialog.propTypes,
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

    onAlertSubmit() {
        const {onHide} = this.props;
        onHide();
    },

    renderAction() {

        const {
            buttonVariants,
            size
        } = this.props;

        return (
            <div className={cx().part('actions').build()} >
                <Button
                    label="确定"
                    key="submit"
                    size={size}
                    type="button"
                    onClick={this.onAlertSubmit}
                    variants={buttonVariants} />
            </div>
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
                actions={this.renderAction()}
                variants={[...(variants || []), 'alert']} />
        );
    }

});

module.exports = Alert;
