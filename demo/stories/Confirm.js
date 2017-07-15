/**
 * @file Confirm
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Button from '../../src/Button';
import Confirm from '../../src/Confirm';

let book = storiesOf('Confirm', module);

class ControlledConfirmDemo extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            open: false
        };
    }
    render() {
        return (
            <div>
                <Button onClick={() => {
                    this.setState({open: true});
                    action('打开确认框')();
                }}>
                    click me
                </Button>
                <Confirm
                    open={this.state.open}
                    onConfirm={() => {
                        this.setState({open: false});
                        action('关闭确认框')();
                    }}
                    onCancel={() => {
                        this.setState({open: false});
                        action('关闭确认框')();
                    }}>
                    hello world
                </Confirm>
            </div>
        );
    }
}

book.add('控制的确认框', () => <ControlledConfirmDemo />);

book.add('命令式确认框', () => (
    <Button onClick={() => {
        Confirm.show({
            title: '命令式确认框',
            children: (
                <div style={{color: 'rgb(0, 159, 147)'}} className="test">
                    这个确认框是由命令式 API 触发的
                </div>
            ),
            onConfirm(close) {
                action('确认')();
                close();
            },
            onCancel(close) {
                action('取消')();
                close();
            }
        });
    }}>
        click me
    </Button>
));
