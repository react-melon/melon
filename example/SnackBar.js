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
        this.onBarClick = this.onBarClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDirChange = this.onDirChange.bind(this);
        this.onHide = this.onHide.bind(this);

        this.state = {
            open: false,
            duration: 0,
            direction: 'bl'
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

    onDirChange(e) {
        var direction = e.value;
        this.setState({direction: direction});
    }

    onBarClick() {
        var {
            direction,
            duration
        } = this.state;

        SnackBar.show('这是一个新鲜出炉的通知', duration, direction);
    }

    render() {
        return (
            <div>
                <Title level={3}>SnackBar</Title>
                <Button variants={['raised', 'primary']} onClick={this.onClick} label="点我打开" />
                <br />
                <br />
                <TextBox
                    floatingLabel='Auto Hide Duration in ms'
                    defaultValue='0'
                    onChange={this.onChange}
                    value={this.state.duration + ''} />
                <br />
                <br />
                <TextBox
                    floatingLabel='Direction'
                    defaultValue='bl'
                    onChange={this.onDirChange}
                    value={this.state.direction + ''} />
                <SnackBar
                    open={this.state.open}
                    autoHideDuration={this.state.duration}
                    message='This is a SnackBar'
                    direction={this.state.direction}
                    action='close'
                    onHide={this.onHide} />
                <br />
                <br />
                <Button variants={['raised', 'primary']} onClick={this.onBarClick} label="动态创建" />
            </div>
        );
    }


}

module.exports = View;
