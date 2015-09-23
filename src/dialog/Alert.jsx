/**
 * @file melon/dialog/Alert
 * @author cxtom(cxtom2010@gmail.com)
 */

var React = require('react');
var Dialog = require('../Dialog.jsx');
var Button = require('../Button.jsx');

class Alert extends Dialog {

    constructor(props) {

        super(props);

        this.onAlertSubmit = this.onAlertSubmit.bind(this);
    }

    onAlertSubmit() {
        this.setState({open: false}, this.onHide);
    }

}

Alert.defaultProps = {
    ...Dialog.defaultProps,
    maskClickClose: false,
    actions: (
        <Button
            label="确定"
            onClick={this.onAlertSubmit}
            variants={['primary']} />
    ),
    title: null
};

module.exports = Alert;
