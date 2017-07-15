/**
 * @file Popover
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Button from '../../src/Button';
import CenterDecorator from '../decorator/CenterDecorator';
import Popover from '../../src/Popover';

class Demo extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            open: false
        };
    }

    render() {
        return (
            <div ref="main">
                <Button
                    onClick={e => this.setState({
                        open: true
                    })}>
                    click
                </Button>
                <Popover
                    variants={['select']}
                    open={this.state.open}
                    anchor={this.refs.main}
                    onRequestClose={() => this.setState({
                        open: false
                    })}>
                    aaaaa
                </Popover>
            </div>
        );
    }

}

storiesOf('Popover', module)
    .addDecorator(CenterDecorator)
    .add('普通', () => <Demo />);
