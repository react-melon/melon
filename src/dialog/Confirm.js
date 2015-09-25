/**
 * @file melon/dialog/Confirm
 * @author cxtom(cxtom2010@gmail.com)
 */

var React = require('react');
var Dialog = require('../Dialog');
var Component = require('../Component');
var Button = require('../Button');

class Confirm extends Component {

    constructor(props) {

        super(props);

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

    onConfirmSubmit(confirm) {
        this.setState({open: false}, function () {
            var onConfirm = this.props.onConfirm;

            if (onConfirm) {
                onConfirm({
                    target: this,
                    value: confirm
                });
            }
        });
    }

    render() {
        let {
            actions,
            children,
            ...others
        } = this.props;

        actions = ([
            <Button
                label="取消"
                key="cancel"
                onClick={this.onConfirmSubmit.bind(this, false)}
                variants={['primary']} />,
            <Button
                label="确定"
                key="submit"
                onClick={this.onConfirmSubmit.bind(this, true)}
                variants={['primary']} />
        ]);

        return (
            <Dialog
                {...others}
                ref="dialog"
                open={this.state.open}
                actions={actions} >
                {children}
            </Dialog>
        );
    }

}

Confirm.propTypes = {
    ...Dialog.propTypes,
    onConfirm: React.PropTypes.func
};

Confirm.defaultProps = {
    ...Dialog.defaultProps,
    maskClickClose: false,
    title: null
};

module.exports = Confirm;
