/**
 * @file Example / TextBox
 * @author cxtom<cxtom2010@gmail.com>
 */


import React from 'react';
import TextBox from 'melon/TextBox';
import Title from 'melon/Title';

/* eslint-disable fecs-prefer-class */

function View(props) {

    return (
        <div>
            <div className="melon-row">
                <div className="melon-column melon-column-6">
                    <Title level={5}>普通</Title>
                    <TextBox placeholder='请输入' />
                </div>
                <div className="melon-column melon-column-6">
                    <Title level={5}>默认值</Title>
                    <TextBox defaultValue="default value" placeholder='请输入' />
                </div>
            </div>

            <div className="melon-row">
                <div className="melon-column melon-column-6">
                    <Title level={5}>只读状态</Title>
                    <TextBox value='只读' readOnly={true} />
                </div>
                <div className="melon-column melon-column-6">
                    <Title level={5}>禁用状态</Title>
                    <TextBox value='禁用' disabled={true} />
                </div>
            </div>
        </div>
    );
}

module.exports = View;
