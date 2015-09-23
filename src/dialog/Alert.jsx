/**
 * @file melon/dialog/Alert
 * @author cxtom(cxtom2010@gmail.com)
 */

var React = require('react');
var Dialog = require('../Dialog.jsx');
var Component = require('../Component.jsx');
var Button = require('../Button.jsx');

class Alert extends Component {

    constructor(props) {

        super(props);

        this.onAlertSubmit = this.onAlertSubmit.bind(this);
        this.onHide = this.onHide.bind(this);

        this.state = {
            open: props.open || false
        };
    }

    componentWillReceiveProps(nextProps) {

        var open = nextProps.open;

        if (!open) {
            return;
        }

        this.setState({open: open});
    }

    onAlertSubmit() {
        this.setState({open: false});
    }

    onHide() {
        var onHide = this.props.onHide;
        if (onHide) {
            onHide();
        }
    }

    render() {
        let props = this.props;

        var actions = ([
            <Button
                label="确定"
                key="submit"
                onClick={this.onAlertSubmit}
                variants={['primary']} />
        ]);

        return (
            <Dialog
                {...props}
                open={this.state.open}
                actions={actions}
                onHide={this.onHide} >
                {props.children}
            </Dialog>
        );
    }

}

Alert.defaultProps = {
    ...Dialog.defaultProps,
    maskClickClose: false,
    title: null
};

module.exports = Alert;
