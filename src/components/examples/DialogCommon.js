/**
 * @file Example / DialogCommon
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
import Dialog from 'melon/Dialog';
import Button from 'melon/Button';
import Title from 'melon/Title';

require('../code/DialogCommon.txt');

const View = React.createClass({

    getInitialState() {
        return {
            dialog1: false,
            dialog2: false,
            dialog3: false,
            dialog4: false
        };
    },

    render() {

        const actions = [
            <Button label="Submit" key="submit" />,
            <Button label="Cancel" key="cancel" onClick={this.dialog4Hide} />
        ];

        return (
            <div>
                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={4}>普通</Title>
                        <Button variants={['raised', 'primary']} onClick={this.dialog1Show}>弹出窗口</Button>
                        <Dialog open={this.state.dialog1} onHide={this.dialog1Hide}>Hello</Dialog>
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={4}>内容很长的弹窗</Title>
                        <Button variants={['raised', 'primary']} onClick={this.dialog2Show}>弹出窗口</Button>
                        <Dialog open={this.state.dialog2} onHide={this.dialog2Hide}>
                            <div ref="content" style={{height: 1000}}>Long!</div>
                        </Dialog>
                    </div>
                </div>
                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={4}>有标题的弹窗</Title>
                        <Button variants={['raised', 'primary']} onClick={this.dialog3Show}>弹出窗口</Button>
                        <Dialog open={this.state.dialog3} onHide={this.dialog3Hide} title="Dialog With A Title">
                            This is Content.
                        </Dialog>
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={4}>有按钮的弹窗</Title>
                        <Button variants={['raised', 'primary']} onClick={this.dialog4Show}>弹出窗口</Button>
                        <Dialog
                            open={this.state.dialog4}
                            maskClickClose={false}
                            title="Dialog With Actions"
                            actions={actions}>
                            This is Content.
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    },

    dialog1Show() {
        this.setState({dialog1: true});
    },

    dialog1Hide() {
        this.setState({dialog1: false});
    },

    dialog2Show() {
        this.setState({dialog2: true});
    },

    dialog2Hide() {
        this.setState({dialog2: false});
    },

    dialog3Show() {
        this.setState({dialog3: true});
    },

    dialog3Hide() {
        this.setState({dialog3: false});
    },

    dialog4Show() {
        this.setState({dialog4: true});
    },

    dialog4Hide() {
        this.setState({dialog4: false});
    }
});

module.exports = View;
