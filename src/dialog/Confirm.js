/**
 * @file melon/dialog/Confirm
 * @author cxtom(cxtom2010@gmail.com)
 */

var React = require('react');
var Dialog = require('../Dialog');
var Button = require('../Button');

class Confirm extends Dialog {

    constructor(props) {

        super(props);

        this.type = 'dialog';

    }

    onConfirmSubmit(confirm) {
        this.setState({open: false}, function () {
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

    getVariants(props) {

        var variants = super.getVariants(props);

        variants.push('confirm');

        return variants;
    }

    renderAction() {

        let {
            buttonVariants,
            size
        } = this.props;

        return (
            <div ref="dialogActions"
                className={this.getPartClassName('actions')}>
                <Button
                    label="取消"
                    key="cancel"
                    size={size}
                    onClick={this.onConfirmSubmit.bind(this, false)}
                    variants={buttonVariants} />
                <Button
                    label="确定"
                    key="submit"
                    size={size}
                    onClick={this.onConfirmSubmit.bind(this, true)}
                    variants={buttonVariants} />
            </div>
        );
    }

}

Confirm.propTypes = {
    ...Dialog.propTypes,
    onConfirm: React.PropTypes.func,
    buttonVariants: React.PropTypes.arrayOf(React.PropTypes.string)
};

Confirm.defaultProps = {
    ...Dialog.defaultProps,
    maskClickClose: false,
    title: null,
    buttonVariants: ['primary']
};

module.exports = Confirm;
