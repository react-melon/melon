/**
 * @file Example / TextBox
 * @author cxtom<cxtom2010@gmail.com>
 */


import React from 'react';
import TextBox from 'melon/TextBox';
import Title from 'melon/Title';

require('../code/TextBoxFloatingLabel.txt');

/* eslint-disable fecs-prefer-class */
function View(props) {

    return (
        <div className="melon-row">
            <div className="melon-column melon-column-6">
                <TextBox floatingLabel='姓名' />
            </div>
            <div className="melon-column melon-column-6">
                <TextBox floatingLabel='爱好' defaultValue='melon' />
                <br />
                <Title level={5}>带有默认值</Title>
            </div>
        </div>
    );
}

module.exports = View;
