/**
 * @file IconMenu
 * @author leon <ludafa@outlook.com>
 */

import React, {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import IconMenu from '../../src/IconMenu';
import Menu, {MenuItem} from '../../src/Menu';
import Divider from '../../src/Divider';

let book = storiesOf('IconMenu', module);

class Demo extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            layout: 'blocks',
            fullScreen: false
        };
    }

    updateRadio(choice) {
        this.setState({
            layout: choice
        });
    }

    render() {

        let {
            layout,
            fullScreen
        } = this.state;

        let {
            maxHeight,
            style
        } = this.props;

        return (
            <IconMenu icon="more-horiz" style={style} maxHeight={maxHeight}>
                <MenuItem
                    radioGroup="layout"
                    type="radio"
                    label="Blocks"
                    checked={layout === 'blocks'}
                    onClick={this.updateRadio.bind(this, 'blocks')} />
                <MenuItem
                    radioGroup="layout"
                    type="radio"
                    checked={layout === 'fluid'}
                    label="Fluid"
                    onClick={this.updateRadio.bind(this, 'fluid')} />
                <MenuItem
                    radioGroup="layout"
                    type="radio"
                    checked={layout === 'unified'}
                    label="Unified"
                    onClick={this.updateRadio.bind(this, 'unified')} />
                <Divider />
                <MenuItem
                    type="checkbox"
                    label="Full Screen"
                    checked={fullScreen}
                    onClick={() => this.setState({fullScreen: !fullScreen})} />
                <Divider />
                <MenuItem
                    label="Preview"
                    icon="remove-red-eye"
                    onClick={action('copy')} />
                <Divider />
                <MenuItem
                    label="Copy"
                    icon="content-copy"
                    onClick={action('copy')} />
                <MenuItem
                    icon="delete"
                    label="Delete"
                    disabled
                    onClick={action('delete')} />
                <MenuItem
                    icon="stop"
                    label="Stop"
                    onClick={action('stop')} />
                <MenuItem
                    icon="mode-edit"
                    label="Edit"
                    onClick={action('edit')} />
                <Divider />
                <Menu label="Find">
                    <MenuItem
                        label="Preview"
                        icon="remove-red-eye"
                        onClick={action('copy')} />
                    <Menu label="Find">
                        <MenuItem
                            label="Preview"
                            icon="remove-red-eye"
                            onClick={action('copy')} />
                        <MenuItem
                            label="Preview"
                            icon="remove-red-eye"
                            onClick={action('copy')} />
                    </Menu>
                    <Menu label="Find">
                        <MenuItem
                            label="Preview"
                            icon="remove-red-eye"
                            onClick={action('copy')} />
                        <MenuItem
                            label="Preview"
                            icon="remove-red-eye"
                            onClick={action('copy')} />
                    </Menu>
                </Menu>
                <Menu label="Edit">
                    <MenuItem
                        label="Preview"
                        icon="remove-red-eye"
                        onClick={action('copy')} />
                    <Menu label="Find">
                        <MenuItem
                            label="Preview"
                            icon="remove-red-eye"
                            onClick={action('copy')} />
                        <Menu label="Find">
                            <MenuItem
                                label="Preview"
                                icon="remove-red-eye"
                                onClick={action('copy')} />
                        </Menu>
                    </Menu>
                </Menu>
            </IconMenu>
        );

    }

}

book.addWithInfo(
    '用法',
    () => (
        <div>
            <Demo style={{position: 'fixed', top: 32, left: 32}}/>
            <Demo style={{position: 'fixed', top: 32, right: 32}} maxHeight={300} />
            <IconMenu
                icon="more-horiz"
                style={{position: 'fixed', top: '50%', left: '50%', margin: '-16px 0 0 -16px'}}>
                <MenuItem label="Refresh" icon="refresh" onClick={action('Refresh')} />
                <MenuItem label="Send Feedback" onClick={action('Send Feedback')} />
                <MenuItem label="Settings" onClick={action('Settings')} />
                <MenuItem label="Help" onClick={action('Help')} />
                <MenuItem label="Sign out" onClick={action('Sign out')} />
            </IconMenu>
            <Demo style={{position: 'fixed', bottom: 32, right: 32}}/>
            <Demo style={{position: 'fixed', bottom: 32, left: 32}}/>
        </div>
    )
);
