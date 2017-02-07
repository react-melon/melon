/**
 * @file Example / BoxGroup1
 */


import React from 'react';
import BoxGroup from 'melon/BoxGroup';
import Title from 'melon/Title';

/* eslint-disable fecs-prefer-class */

function View(props) {

    return (
        <div className="melon-row">
            <div className="melon-column melon-column-6">
                <Title level={5}>复选框</Title>
                <BoxGroup
                    boxModel="checkbox"
                    defaultValue={['1', '2']}>
                    <option name="checkbox1" value="1" label="1" />
                    <option name="checkbox1" value="2" label="2" />
                    <option name="checkbox1" value="3" label="3" />
                </BoxGroup>
            </div>
            <div className="melon-column melon-column-6">
                <Title level={5}>单选框</Title>
                <BoxGroup boxModel="radio" defaultValue={['2']}>
                    <option name="radio1" value="1" label="1" />
                    <option name="radio1" value="2" label="2" />
                    <option name="radio1" value="3" label="3" />
                </BoxGroup>
            </div>
        </div>
    );
}

module.exports = View;
