/**
 * @file melon demo Dialog
 * @author cxtom(cxtom2008@gmail.com)
 */

var React = require('react');

var Title = require('../src/Title');
var Mask = require('../src/Mask');
var Dialog = require('../src/Dialog');
var Button = require('../src/Button');
var Alert = require('../src/dialog/Alert');
var Confirm = require('../src/dialog/Confirm');

var View = React.createClass({

    getInitialState: function () {
        return {
            dialog1: false,
            dialog2: false,
            dialog3: false,
            dialog4: false,
            dialog5: false,
            dialog6: false
        };
    },

    render: function () {

        var actions = [
            <Button label="Submit" key="submit" />,
            <Button label="Cancel" key="cancel" onClick={this.dialog4Hide} />
        ];

        return (
            <div>
                <Title level={3}>Dialog</Title>

                <div className="row">
                    <Title level={4}>普通</Title>
                    <Button variants={['raised', 'primary']} onClick={this.dialog1Show}>弹出窗口</Button>
                    <Dialog open={this.state.dialog1} onHide={this.dialog1Hide}>Hello</Dialog>
                </div>

                <div className="row">
                    <Title level={4}>内容很长的弹窗</Title>
                    <Button variants={['raised', 'primary']} onClick={this.dialog2Show}>弹出窗口</Button>
                    <Dialog open={this.state.dialog2} onHide={this.dialog2Hide}><div ref="content">Long!</div></Dialog>
                </div>

                <div className="row">
                    <Title level={4}>有标题的弹窗</Title>
                    <Button variants={['raised', 'primary']} onClick={this.dialog3Show}>弹出窗口</Button>
                    <Dialog open={this.state.dialog3} onHide={this.dialog3Hide} title="Dialog With A Title">This is Content.</Dialog>
                </div>

                <div className="row">
                    <Title level={4}>有按钮的弹窗</Title>
                    <Button variants={['raised', 'primary']} onClick={this.dialog4Show}>弹出窗口</Button>
                    <Dialog open={this.state.dialog4} maskClickClose={false} title="Dialog With Actions" actions={actions}>This is Content.</Dialog>
                </div>

                <div className="row">
                    <Title level={4}>Alert</Title>
                    <Button variants={['raised', 'primary']} onClick={this.dialog5Show}>弹出窗口</Button>
                    <Alert open={this.state.dialog5}  onHide={this.dialog5Hide} >This is Content.</Alert>
                </div>

                <div className="row">
                    <Title level={4}>Confirm</Title>
                    <Button variants={['raised', 'primary']} onClick={this.dialog6Show}>弹出窗口</Button>
                    <Confirm open={this.state.dialog6} onConfirm={this.onConfirm}>This is Content.</Confirm>
                </div>
            </div>
        );
    },

    dialog1Show: function () {
        this.setState({dialog1: true});
    },

    dialog1Hide: function () {
        this.setState({dialog1: false});
    },

    dialog2Show: function () {

        var me = this;

        this.setState({dialog2: true}, function () {
            setTimeout(function () {
                me.refs.content.style.height = '1000px';
            }, 1000);
        });
    },

    dialog2Hide: function () {
        this.setState({dialog2: false});
    },

    dialog3Show: function () {
        this.setState({dialog3: true});
    },

    dialog3Hide: function () {
        this.setState({dialog3: false});
    },

    dialog4Show: function () {
        this.setState({dialog4: true});
    },

    dialog4Hide: function () {
        this.setState({dialog4: false});
    },

    dialog5Show: function () {
        this.setState({dialog5: true});
    },

    dialog5Hide: function () {
        this.setState({dialog5: false});
    },

    dialog6Show: function () {
        this.setState({dialog6: true});
    },

    onConfirm: function (e) {
        console.log(e.value);
        this.setState({dialog6: false});
    }

});

module.exports = View;
