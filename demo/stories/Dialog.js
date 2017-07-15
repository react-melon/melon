/**
 * @file Melon Story Dialog
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Dialog from '../../src/Dialog';
import Button from '../../src/Button';
import CenterDecorator from '../decorator/CenterDecorator';

class Demo1 extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            open: false
        };
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.setState({open: true})}>OPEN A DIALOG</Button>
                <Dialog
                    title="普通窗口"
                    open={this.state.open}
                    onHide={action('点击 mask 会触发自动关闭')}>
                    <section>hello</section>
                </Dialog>
            </div>
        );
    }

}

class Demo2 extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            open: false
        };
    }

    render() {
        return (
            <div>
                <Button
                    variants={['primary', 'raised']}
                    onClick={() => this.setState({open: true})}>
                    打开一个带有按钮的窗口
                </Button>
                <Dialog
                    title="带按钮的窗口"
                    open={this.state.open}
                    actions={[
                        <Button
                            label="并没有"
                            key="cancel"
                            variants={['info']}
                            onClick={() => {
                                action('自定义按钮『取消』被点击，关闭窗口')();
                                this.setState({open: false});
                            }} />,
                        <Button
                            label="是的"
                            variants={['info']}
                            key="submit"
                            onClick={() => {
                                action('自定义按钮『确认』被点击，关闭窗口')();
                                this.setState({open: false});
                            }} />
                    ]}>
                    <section>Melon 可以帮忙快速搭建整洁、标准、好看的网站</section>
                </Dialog>
            </div>
        );
    }

}

storiesOf('Dialog', module)
    .addDecorator(CenterDecorator)
    .add('普通', () => <Demo1 />)
    .add('带有底部按钮的窗口', () => <Demo2 />);
