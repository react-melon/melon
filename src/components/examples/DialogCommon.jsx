/**
 * @file Example / DialogCommon
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
import Dialog from 'melon/Dialog';
import Button from 'melon/Button';
import Title from 'melon/Title';

class View extends React.Component {

    constructor() {
        super();

        this.state = {
            dialog1: false,
            dialog2: false,
            dialog3: false,
            dialog4: false
        };
    }

    render() {

        const actions = [
            <Button label="Submit" key="submit" />,
            <Button label="Cancel" key="cancel" onClick={this.onHide.bind(this, 4)} />
        ];

        return (
            <div>
                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={4}>普通</Title>
                        <Button variants={['raised', 'primary']} onClick={this.onShow.bind(this, 1)}>弹出窗口</Button>
                        <Dialog open={this.state.dialog1} onHide={this.onHide.bind(this, 1)}>Hello</Dialog>
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={4}>内容很长的弹窗</Title>
                        <Button variants={['raised', 'primary']} onClick={this.onShow.bind(this, 2)}>弹出窗口</Button>
                        <Dialog open={this.state.dialog2} onHide={this.onHide.bind(this, 2)}>
                            <div ref="content" style={{height: 1000}}>Long!</div>
                        </Dialog>
                    </div>
                </div>
                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <Title level={4}>有标题的弹窗</Title>
                        <Button variants={['raised', 'primary']} onClick={this.onShow.bind(this, 3)}>弹出窗口</Button>
                        <Dialog
                            open={this.state.dialog3}
                            onHide={this.onHide.bind(this, 3)}
                            title="Dialog With A Title">
                            This is Content.
                        </Dialog>
                    </div>
                    <div className="melon-column melon-column-6">
                        <Title level={4}>有按钮的弹窗</Title>
                        <Button variants={['raised', 'primary']} onClick={this.onShow.bind(this, 4)}>弹出窗口</Button>
                        <Dialog
                            open={this.state.dialog4}
                            onHide={this.onHide.bind(this, 4)}
                            maskClickClose={false}
                            title="Dialog With Actions"
                            actions={actions}>
                            This is Content.
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    }

    onShow(i) {
        this.setState({
            [`dialog${i}`]: true
        });
    }

    onHide(i) {
        this.setState({
            [`dialog${i}`]: false
        });
    }
}

module.exports = View;
