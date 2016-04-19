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
        this.state = {a: [], b: [], controlledCheckbox: [], controlledRadio: []};
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

                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>复选框</Title>
                        <BoxGroup boxModel="checkbox">
                            <option name="checkbox1" value="1" label="1" />
                            <option name="checkbox1" value="2" label="2" />
                            <option name="checkbox1" value="3" label="3" />
                        </BoxGroup>
                    </div>
                    <div className="melon-column melon-column-4">
                        <Title level={5}>单选框</Title>
                        <BoxGroup boxModel="radio">
                            <option name="radio1" value="1" label="1" />
                            <option name="radio1" value="2" label="2" />
                            <option name="radio1" value="3" label="3" />
                        </BoxGroup>
                    </div>
                    <div className="melon-column melon-column-4">
                        <Title level={5}>Toggle</Title>
                        <Toggle name="toggle1" value="haha" trueValue="haha" falseValue="hehe" />
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
                        <Toggle name="toggle2" value="1" label="On" leftLabel="Off" disabled />
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

                <Title level={5}>Controlled</Title>
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

            </div>
        );
    }

    onChange(name, e) {
        this.setState({
            [name + 'value']: e.value
        });
    }

    getCurrentValue(name) {
        const value = this.state[name + 'value'];
        return value ? '当前的选择是：' + value : '';
    }

    onButtonClick() {
        this.setState({value: ['A', 'B']});
    }

}

module.exports = View;
