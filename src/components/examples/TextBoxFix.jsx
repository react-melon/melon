/**
 * @file Example / TextBoxFix
 * @author cxtom<cxtom2010@gmail.com>
 */


import React from 'react';
import TextBox from 'melon/TextBox';
import Title from 'melon/Title';

/* eslint-disable fecs-prefer-class */

function View(props) {

    return (
        <div className="melon-row">
            <div className="melon-column melon-column-6">
                <Title level={5}>前缀</Title>
                <TextBox floatingLabel="出价" />
                <span className="ui-text-box-suffix">
                    万元
                </span>
            </div>
            <div className="melon-column melon-column-6">
                <Title level={5}>后缀</Title>
                <span className="ui-text-box-prefix">{'http://'}</span>
                <TextBox floatingLabel="网址" prefix="http://" />
            </div>
        </div>
    );
}

module.exports = View;
