/**
 * @file Example / SnackBar
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
import SnackBar from 'melon/SnackBar';
import Button from 'melon/Button';
import TextBox from 'melon/TextBox';

const SnackBarExample = React.createClass({

    getInitialState() {
        return {
            open: false,
            duration: 0,
            direction: 'bl'
        };
    },

    onHide(e) {
        this.setState({open: false});
    },

    onClick(e) {
        if (this.state.open) {
            return;
        }
        this.setState({open: true});
    },

    onChange(e) {
        const duration = e.value - 0;
        this.setState({duration});
    },

    onDirChange(e) {
        const direction = e.value;
        this.setState({direction});
    },

    render() {

        return (
            <div>
                <Button variants={['raised', 'primary']} onClick={this.onClick} label="点我打开" />
                <br />
                <br />
                <TextBox
                    floatingLabel='Auto Hide Duration in ms'
                    defaultValue='0'
                    onChange={this.onChange}
                    value={this.state.duration + ''} />
                <br />
                <br />
                <TextBox
                    floatingLabel='Direction'
                    defaultValue='bl'
                    onChange={this.onDirChange}
                    value={this.state.direction + ''} />
                <SnackBar
                    open={this.state.open}
                    autoHideDuration={this.state.duration}
                    message={
                        <div style={{clear: 'both'}}>
                            <h1>以下结点操作异常</h1>
                            <ul>
                                {['华北', '华南', '华东', '日本', '台湾', '美国'].map(number => {
                                    return (
                                        <li key={number}>{number}{number}{number}{number}{number}</li>
                                    );
                                })}
                            </ul>
                        </div>
                    }
                    direction={this.state.direction}
                    action='close'
                    onHide={this.onHide} />
            </div>
        );
    }

});

module.exports = SnackBarExample;
