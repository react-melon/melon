/**
 * @file Tooltip
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Button from '../../src/Button';
import CenterDecorator from '../decorator/CenterDecorator';
import Tooltip from '../../src/Tooltip';

class Demo extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            count: 0
        };
    }

    render() {
        return (
            <div>
                <Tooltip content={`点了 ${this.state.count} 次`} direction="top">
                    <Button onClick={e => this.setState({count: this.state.count + 1})}>
                        上边
                    </Button>
                </Tooltip>
                <Tooltip content={`点了 ${this.state.count} 次`} direction="bottom">
                    <Button onClick={e => this.setState({count: this.state.count + 1})}>
                        下边
                    </Button>
                </Tooltip>
                <Tooltip content={`点了 ${this.state.count} 次`} direction="left">
                    <Button onClick={e => this.setState({count: this.state.count + 1})}>
                        左边
                    </Button>
                </Tooltip>
                <Tooltip content={`点了 ${this.state.count} 次`} direction="right">
                    <Button onClick={e => this.setState({count: this.state.count + 1})}>
                        右边
                    </Button>
                </Tooltip>
            </div>
        );
    }

}

storiesOf('Tooltip', module)
    .addDecorator(CenterDecorator)
    .add('hover', () => <Demo />)
    .add('click', () => (
        <Tooltip content="我是一个 tip" direction="top" mode="click">
            <Button>click me</Button>
        </Tooltip>
    ))
    .add('hover delay close', () => (
        <Tooltip
            content="我是一个 tip"
            direction="top"
            closeDelay={1000}>
            <Button>hover me</Button>
        </Tooltip>
    ));
