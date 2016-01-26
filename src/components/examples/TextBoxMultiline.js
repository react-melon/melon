/**
 * @file Example / TextBoxMultiLine
 * @author cxtom<cxtom2010@gmail.com>
 */


import React from 'react';
import TextBox from 'melon/TextBox';

require('../code/TextBoxMultiline.txt');

function View(props) {

    return (
        <div className="melon-row">
            <div className="melon-column melon-column-6">
                <TextBox placeholder='发个微博...' multiline={true} />
            </div>
            <div className="melon-column melon-column-6">
                <TextBox floatingLabel='多行文本浮动提示' multiline={true} />
            </div>
        </div>
    );
}

module.exports = View;
