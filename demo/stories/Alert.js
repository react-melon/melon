/**
 * @file Alert
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Button from '../../src/Button';
import Alert from '../../src/Alert';

let book = storiesOf('Alert', module);

class ControlledAlertDemo extends Component {
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
                    action('打开警告框')();
                }}>
                    click me
                </Button>
                <Alert
                    open={this.state.open}
                    onConfirm={() => {
                        this.setState({open: false});
                        action('关闭警告框')();
                    }}>
                    hello world
                </Alert>
            </div>
        );
    }
}

book.add('控制的警告框', () => <ControlledAlertDemo />);

book.add('命令式警告', () => (
    <Button onClick={() => {
        Alert.show({
            title: '命令式警告框',
            children: (
                <div style={{color: 'rgb(0, 159, 147)'}} className="test">
                    这个警告框是由命令式 API 触发的
                </div>
            ),
            onConfirm(close) {
                action('关闭窗口')();
                close();
            }
        });
    }}>
        click me
    </Button>
));

// book.add('警告框', () => (
//
//     <Button onClick={action('clicked')}>Hello Button</Button>
// ));
