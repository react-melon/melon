/**
 * @file melon/dialog/Alert
 * @author cxtom(cxtom2010@gmail.com)
 */

var React = require('react');
var Dialog = require('../Dialog');
var Button = require('../Button');

class Alert extends Dialog {

    constructor(props) {

        super(props);

        this.onAlertSubmit = this.onAlertSubmit.bind(this);

        this.type = 'dialog';
    }

    getVariants(props) {

        var variants = super.getVariants(props);

        variants.push('alert');

        return variants;
    }

    onAlertSubmit() {
        this.setState({open: false}, function () {
            this.onHide();
        });
    }

    renderAction() {
        let {
            buttonVariants,
            size
        } = this.props;

        return (
            <div ref="dialogActions"
                className={this.getPartClassName('actions')} >
                <Button
                    label="确定"
                    key="submit"
                    size={size}
                    onClick={this.onAlertSubmit}
                    variants={buttonVariants} />
            </div>
        );
    }

}

Alert.propTypes = {
    ...Dialog.propTypes,
    buttonVariants: React.PropTypes.arrayOf(React.PropTypes.string)
};


Alert.defaultProps = {
    ...Dialog.defaultProps,
    maskClickClose: false,
    title: null,
    buttonVariants: ['primary']
};

module.exports = Alert;
