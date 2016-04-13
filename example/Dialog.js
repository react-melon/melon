/**
 * @file melon demo Dialog
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {Component} from 'react';

import Title from '../src/Title';
import Dialog from '../src/Dialog';
import Button from '../src/Button';
import Alert from '../src/Alert';
import Confirm from '../src/Confirm';

export default class View extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            dialog1: false,
            dialog2: false,
            dialog3: false,
            dialog4: false,
            dialog5: false,
            dialog6: false
        };
    }

    onShow(field) {
        this.setState({
            [field]: true
        });
    }

    onHide(field) {
        this.setState({
            [field]: false
        });
    }

    render() {

        const actions = [
            <Button label="Submit" key="submit" onClick={this.onHide.bind(this, 'dialog4')} />,
            <Button label="Cancel" key="cancel" onClick={this.onHide.bind(this, 'dialog4')} />
        ];

        return (
            <div>
                <Title level={3}>Dialog</Title>

                <div className="row">
                    <Title level={4}>普通</Title>
                    <Button
                        variants={['raised', 'primary']}
                        onClick={this.onShow.bind(this, 'dialog1')}>
                        弹出窗口
                    </Button>
                    <Dialog
                        open={this.state.dialog1}
                        onHide={this.onHide.bind(this, 'dialog1')}>Hello</Dialog>
                </div>

                <div className="row">
                    <Title level={4}>内容很长的弹窗</Title>
                    <Button
                        variants={['raised', 'primary']}
                        onClick={this.onShow.bind(this, 'dialog2')}>弹出窗口</Button>
                    <Dialog
                        open={this.state.dialog2}
                        onHide={this.onHide.bind(this, 'dialog2')}>
                        <div ref="content" style={{height: 1000}}>Long!</div>
                    </Dialog>
                </div>

                <div className="row">
                    <Title level={4}>有标题的弹窗</Title>
                    <Button
                        variants={['raised', 'primary']}
                        onClick={this.onShow.bind(this, 'dialog3')}>弹出窗口</Button>
                    <Dialog
                        open={this.state.dialog3}
                        onHide={this.onHide.bind(this, 'dialog3')}
                        title="Dialog With A Title">
                        This is Content.
                    </Dialog>
                </div>

                <div className="row">
                    <Title level={4}>有按钮的弹窗</Title>
                    <Button
                        variants={['raised', 'primary']}
                        onClick={this.onShow.bind(this, 'dialog4')}>
                        弹出窗口
                    </Button>
                    <Dialog
                        open={this.state.dialog4}
                        maskClickClose={false}
                        title="Dialog With Actions"
                        actions={actions}>
                        This is Content.
                    </Dialog>
                </div>

                <div className="row">
                    <Title level={4}>Alert</Title>
                    <Button
                        variants={['raised', 'primary']}
                        onClick={this.onShow.bind(this, 'dialog5')}>
                        弹出窗口
                    </Button>
                    <Alert
                        open={this.state.dialog5}
                        onConfirm={this.onHide.bind(this, 'dialog5')}>
                        This is Content.
                    </Alert>
                </div>

                <div className="row">
                    <Title level={4}>Confirm</Title>
                    <Button
                        variants={['raised', 'primary']}
                        onClick={this.onShow.bind(this, 'dialog6')}>
                        弹出窗口
                    </Button>
                    <Confirm
                        open={this.state.dialog6}
                        onConfirm={this.onHide.bind(this, 'dialog6')}
                        onCancel={this.onHide.bind(this, 'dialog6')}>
                        This is Content.
                    </Confirm>
                </div>

            </div>
        );
    }


    //

    //

    //

    //


}
