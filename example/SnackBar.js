/**
 * @file melon demo SnackBar
 * @author cxtom(cxtom2010@gmail.com)
 */

var React = require('react');
var Title = require('../src/Title');
var SnackBar = require('../src/SnackBar');
var Button = require('../src/Button');
var TextBox = require('../src/TextBox');

class View extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onHide = this.onHide.bind(this);

        this.state = {
            open: false,
            duration: 0
        };
    }

    onHide(e) {
        this.setState({open: false});
    }

    onClick(e) {
        if (this.state.open) {
            return;
        }
        this.setState({open: true});
    }

    onChange(e) {
        var duration = e.value - 0;
        this.setState({duration: duration});
    }

    render() {
        return (
            <div>
                <Title level={3}>SnackBar</Title>
                <Button variants={['raised', 'primary']} onClick={this.onClick} label="点我打开" />
                <br />
                <br />
                <TextBox floatingLabel='Auto Hide Duration in ms' defaultValue='0' onChange={this.onChange} value={this.state.duration + ''} />
                <SnackBar open={this.state.open} autoHideDuration={this.state.duration} message='This is a SnackBar' action='close' onHide={this.onHide} />
            </div>
        );
    }


}

module.exports = View;
