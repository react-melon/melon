/**
 * @file melon demo SnackBar
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import Button from 'melon/Button';
import Drawer from 'melon/Drawer';
import Select from 'melon/Select';

require('../code/Drawer.txt');

class View extends React.Component {

    constructor() {
        super();

        this.state = {
            open: false,
            position: 'left',
            size: '300'
        };
    }

    render() {

        const {open, position, size} = this.state;

        return (
            <div>
                <Button
                    variants={['raised', 'primary']}
                    onClick={() => {
                        this.setState({
                            open: true
                        });
                    }}
                    label="点我打开" />
                <Drawer
                    open={open}
                    position={position}
                    size={+size}
                    onHide={() => {
                        this.setState({
                            open: !this.state.open
                        });
                    }}>
                    <div style={{padding: 20}}>
                        <Select
                            variants={['fluid']}
                            value={this.state.position}
                            onChange={({value}) => {
                                this.setState({
                                    position: value
                                });
                            }}>
                            <option value="left">left</option>
                            <option value="right">right</option>
                            <option value="top">top</option>
                            <option value="bottom">bottom</option>
                        </Select>
                    </div>
                    <div style={{padding: 20}}>
                        <Select
                            variants={['fluid']}
                            value={this.state.size}
                            onChange={({value}) => {
                                this.setState({
                                    size: value
                                });
                            }}>
                            <option value="300">300</option>
                            <option value="500">500</option>
                            <option value="-300">-300</option>
                            <option value="-500">-500</option>
                        </Select>
                    </div>
                </Drawer>
            </div>
        );
    }
}

module.exports = View;
