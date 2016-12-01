/**
 * @file melon demo Tabs
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';

import Title from '../src/Title';
import BoxGroup from '../src/BoxGroup';
import Toggle from '../src/Toggle';

class View extends React.Component {

    constructor() {
        super();
        this.state = {
            a: [],
            b: [],
            controlledCheckbox: [],
            controlledRadio: []
        };
    }

    onChange(name, e) {
        this.setState({
            [name]: e.value
        });
    }

    getCurrentValue(name) {
        const value = this.state[name];
        return value ? '当前的选择是：' + value : '';
    }

    render() {
        const datasource = [{
            value: 'A',
            name: '青年A'
        }, {
            value: 'B',
            name: '青年B'
        }, {
            value: 'C',
            name: '青年C'
        }];

        return (
            <div>
                <Title level={3}>Switches</Title>

                <p>Uncontrolled Component Usage</p>

                <p>Don't set `value`, use `defaultValue` instead.</p>

                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>复选框</Title>
                        <BoxGroup
                            boxModel="checkbox"
                            defaultValue={['1', '2']}>
                            <option name="checkbox1" value="1" label="1" />
                            <option name="checkbox1" value="2" label="2" />
                            <option name="checkbox1" value="3" label="3" />
                        </BoxGroup>
                    </div>
                    <div className="melon-column melon-column-4">
                        <Title level={5}>单选框</Title>
                        <BoxGroup boxModel="radio" defaultValue={['2']}>
                            <option name="radio1" value="1" label="1" />
                            <option name="radio1" value="2" label="2" />
                            <option name="radio1" value="3" label="3" />
                        </BoxGroup>
                    </div>
                    <div className="melon-column melon-column-4">
                        <Title level={5}>开关</Title>
                        <Toggle
                            name="toggle1"
                            defaultValue="haha"
                            trueValue="haha"
                            falseValue="hehe" />
                    </div>
                </div>

                <Title level={5}>Controlled</Title>
                <p>设置 `value` 值；</p>
                <p>需要修改 value 值时，直接给出新的 `value` 即可</p>
                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <BoxGroup
                            name="a"
                            boxModel="checkbox"
                            value={this.state.a}
                            onChange={this.onChange.bind(this, 'a')}>
                            <option value="A" label="青年A" />
                            <option value="B" label="青年B" />
                            <option value="C" label="青年C" />
                        </BoxGroup>
                        {this.getCurrentValue('a')}
                    </div>
                    <div className="melon-column melon-column-6">
                        <BoxGroup
                            name="controlled-radio"
                            boxModel="radio"
                            value={this.state.b}
                            onChange={this.onChange.bind(this, 'b')}>
                            <option value="A" label="青年A" />
                            <option value="B" label="青年B" />
                            <option value="C" label="青年C" />
                        </BoxGroup>
                        {this.getCurrentValue('b')}
                    </div>
                </div>

                <Title level={5}>禁用</Title>
                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <BoxGroup name="boxgroup3" boxModel="checkbox" value={['C']} disabled>
                            <option value="A" label="青年A" />
                            <option value="B" label="青年B" />
                            <option name="checkbox1" value="C" label="青年C" />
                        </BoxGroup>
                    </div>
                    <div className="melon-column melon-column-4">
                        <BoxGroup name="boxgroup3" boxModel="radio" value={['C']} disabled>
                            <option value="A" label="青年A" />
                            <option value="B" label="青年B" />
                            <option name="checkbox1" value="C" label="青年C" />
                        </BoxGroup>
                    </div>
                    <div className="melon-column melon-column-4">
                        <Toggle
                            name="toggle2"
                            value="1"
                            label="On"
                            leftLabel="Off"
                            readOnly
                            disabled />
                    </div>
                </div>

                <Title level={4}>使用DataSource</Title>
                <div className="melon-row">
                    <div className="melon-column melon-column-6">
                        <BoxGroup
                            boxModel="checkbox"
                            name="boxgroup4"
                            value={['B', 'C']}>
                            {BoxGroup.createOptions(datasource)}
                        </BoxGroup>
                    </div>
                    <div className="melon-column melon-column-6">
                        <BoxGroup name="boxgroup3" boxModel="radio" value={['C']}>
                            {BoxGroup.createOptions(datasource)}
                        </BoxGroup>
                    </div>
                </div>


            </div>
        );
    }

}

module.exports = View;
