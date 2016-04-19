/**
 * @file melon demo SnackBar
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import Title from '../src/Title';
import SnackBar from '../src/SnackBar';
import Button from '../src/Button';
import TextBox from '../src/TextBox';

class View extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onBarClick = this.onBarClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDirChange = this.onDirChange.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onContentChange = this.onContentChange.bind(this);

        this.state = {
            open: false,
            duration: 0,
            direction: 'bl',
            content: 'hello snack bar'
        };
    }

    onHide(e) {
        this.setState({open: false});
    }

    onClick(e) {
        if (this.state.open) {
            return;
        }
        this.setState({open: true});
    }

    onChange(e) {
        const duration = e.value - 0;
        this.setState({duration});
    }

    onDirChange(e) {
        const direction = e.value;
        this.setState({direction});
    }

    onBarClick() {
        const {
            direction,
            duration,
            content
        } = this.state;

        SnackBar.show(content, duration, direction);
    }

    onContentChange({value}) {
        this.setState({
            content: value
        });
    }

    render() {
        return (
            <div>
                <Title level={3}>SnackBar</Title>
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
                <br />
                <TextBox
                    floatingLabel="Content"
                    defaultValue="这里输入一些内容"
                    onChange={this.onContentChange}
                    multiline={true}
                    value={this.state.content} />
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
                <br />
                <br />
                <Button variants={['raised', 'primary']} onClick={this.onBarClick} label="动态创建" />
            </div>
        );
    }


}

module.exports = View;
