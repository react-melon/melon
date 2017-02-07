/**
 * @file Example / Select
 * @author cxtom<cxtom2010@gmail.com>
 */


import React from 'react';
import Select from 'melon/Select';
import Title from 'melon/Title';

/* eslint-disable fecs-prefer-class */

function View(props) {

    const datasource = [
        {value: '1', name: 'Never'},
        {value: '2', name: 'Every Night'},
        {value: '3', name: 'Weeknights'},
        {value: '4', name: 'WeekendsWeekendsWeekendsWeekends'},
        {value: '5', name: 'Weekly'}
    ];

    return (
        <div>
            <div className="melon-row">
                <div className="melon-column melon-column-6">
                    <Title level={6}>普通</Title>
                    <Select name="a" defaultValue={''} >
                        {Select.createOptions(datasource)}
                    </Select>
                </div>
                <div className="melon-column melon-column-6">
                    <Title level={6}>选项分组</Title>
                    <Select name="b" defaultValue={''}>
                        <optgroup label="fruit">
                            <option value="Apple" label="Apple" />
                            <option value="Banana" label="Banana" />
                            <option value="Mango" label="Mango" disabled />
                            <option value="Pear" label="Pear" disabled />
                        </optgroup>
                        <optgroup label="sport">
                            <option value="Basketball" label="Basketball" />
                            <option value="Football" label="Football" />
                        </optgroup>
                    </Select>
                </div>
            </div>
            <div className="melon-row">
                <div className="melon-column melon-column-6">
                    <Title level={6}>只读</Title>
                    <Select
                        name="a"
                        readOnly={true}
                        defaultValue={''} >
                        {Select.createOptions(datasource)}
                    </Select>
                </div>
                <div className="melon-column melon-column-6">
                    <Title level={6}>禁用</Title>
                    <Select
                        name="a"
                        disabled={true}
                        defaultValue={''} >
                        {Select.createOptions(datasource)}
                    </Select>
                </div>
            </div>
        </div>
    );
}

module.exports = View;
