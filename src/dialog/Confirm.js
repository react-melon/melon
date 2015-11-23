/**
 * @file melon/dialog/Confirm
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');
const Dialog = require('../Dialog');
const Button = require('../Button');
const cx = require('../common/util/cxBuilder').create('Confirm');

const Confirm = React.createClass({

    displayName: 'Confirm',

    onConfirmSubmit(confirm) {

        const {onConfirm, onCancel} = this.props;

        const callback = confirm ? onConfirm : onCancel;

        callback && callback();

    },

    renderAction() {

        const {
            buttonVariants,
            size
        } = this.props;

        return (
            <div className={cx().part('actions').build()}>
                <Button
                    label="取消"
                    key="cancel"
                    size={size}
                    type="button"
                    onClick={this.onConfirmSubmit.bind(this, false)}
                    variants={buttonVariants} />
                <Button
                    label="确定"
                    key="submit"
                    type="button"
                    size={size}
                    onClick={this.onConfirmSubmit.bind(this, true)}
                    variants={buttonVariants} />
            </div>
        );
    },

    render() {

        const {
            variants = [],
            ...rest
        } = this.props;

        return (
            <Dialog
                {...rest}
                actions={this.renderAction()}
                variants={[...variants, 'confirm']} />
        );

    }

});

const {PropTypes} = React;

Confirm.propTypes = {
    ...Dialog.propTypes,
    onConfirm: PropTypes.func,
    buttonVariants: PropTypes.arrayOf(PropTypes.string)
};

Confirm.defaultProps = {
    ...Dialog.defaultProps,
    maskClickClose: false,
    title: null,
    buttonVariants: ['primary']
};

module.exports = Confirm;
