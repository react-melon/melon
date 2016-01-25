/**
 * @file Example / SnackBarActive
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
import SnackBar from 'melon/SnackBar';
import Button from 'melon/Button';
import TextBox from 'melon/TextBox';

require('../code/SnackBarActive.txt');

const SnackBarExample = React.createClass({

    getInitialState() {
        return {
            content: 'hello snack bar'
        };
    },

    onBarClick() {
        const {
            content
        } = this.state;

        SnackBar.show(content, 2000, 'bc');
    },

    onContentChange({value}) {
        this.setState({
            content: value
        });
    },

    render() {

        return (
            <div>
                <TextBox
                    floatingLabel="Content"
                    defaultValue="这里输入一些内容"
                    onChange={this.onContentChange}
                    multiline={true}
                    value={this.state.content} />
                <br />
                <br />
                <Button variants={['raised', 'primary']} onClick={this.onBarClick} label="动态创建" />
            </div>
        );
    }

});

export default SnackBarExample;
