## BoxGroup

### 简单使用

BoxGroup 支持复选框和单选框两种形态。

非控制状态下可以通过 `defaultValue` 来提供默认值，并通过 `onChange` 事件来获取当前值。

但我们无法通过修改 `defaultValue` 的值来修改组件的当前值。

```react 基础用法
import React from 'react';
import BoxGroup from 'melon/BoxGroup';
import Title from 'melon/Title';

/* eslint-disable fecs-prefer-class */

export default function View(props) {

    return (
        <div>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    <Title level={5}>复选框 - 纵向</Title>
                    <BoxGroup
                        boxModel="checkbox"
                        defaultValue={['1', '2']}>
                        <option name="checkbox1" value="1" label="选项1" />
                        <option name="checkbox1" value="2" label="选项2" />
                        <option name="checkbox1" value="3" label="选项3" />
                    </BoxGroup>
                </div>
                <div style={{flex: 1}}>
                    <Title level={5}>单选框 - 纵向</Title>
                    <BoxGroup boxModel="radio" defaultValue={['2']}>
                        <option name="radio1" value="1" label="选项1" />
                        <option name="radio1" value="2" label="选项2" />
                        <option name="radio1" value="3" label="选项3" />
                    </BoxGroup>
                </div>
            </div>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    <Title level={5}>复选框 - 横向</Title>
                    <BoxGroup
                        boxModel="checkbox"
                        variants={['horizontal']}
                        defaultValue={['1', '2']}>
                        <option name="checkbox1" value="1" label="选项1" />
                        <option name="checkbox1" value="2" label="选项2" />
                        <option name="checkbox1" value="3" label="选项3" />
                    </BoxGroup>
                </div>
                <div style={{flex: 1}}>
                    <Title level={5}>单选框 - 横向</Title>
                    <BoxGroup
                        boxModel="radio"
                        variants={['horizontal']}
                        defaultValue={['1']}>
                        <option name="radio1" value="1" label="选项1" />
                        <option name="radio1" value="2" label="选项2" />
                        <option name="radio1" value="3" label="选项3" />
                    </BoxGroup>
                </div>
            </div>
        </div>
    );
}
```

### 控制状态

当 `value` 和 `onChange` 属性同时存在时，组件进入控制模式，值由 store 管理。

组件的状态与 `value` 完全同步：在 store 中的数据发生变化后，组件的状态自动同步。

因此，你需要在 `onChange` 事件发生时修改 store 中对应的值。否则组件的状态则会保持不变。

```react 控制状态
import React from 'react';

import Title from 'melon/Title';
import BoxGroup from 'melon/BoxGroup';

export default class View extends React.Component {

    constructor() {
        super();
        this.state = {
            a: [],
            b: []
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

        return (
            <div className="melon-row">
                <BoxGroup
                    name="a"
                    boxModel="checkbox"
                    value={this.state.a}
                    onChange={this.onChange.bind(this, 'a')}>
                    <option value="A" label="青年A" />
                    <option value="B" label="青年B" />
                    <option value="C" label="青年C" />
                </BoxGroup>
                <p style={{marginTop: '10px'}}>
                    {this.getCurrentValue('a')}
                </p>
                <BoxGroup
                    name="controlled-radio"
                    boxModel="radio"
                    value={this.state.b}
                    onChange={this.onChange.bind(this, 'b')}>
                    <option value="A" label="青年A" />
                    <option value="B" label="青年B" />
                    <option value="C" label="青年C" />
                </BoxGroup>
                <p style={{marginTop: '10px'}}>
                    {this.getCurrentValue('b')}
                </p>
            </div>
        );
    }

}
```

### 禁用状态

```react 禁用状态
import React from 'react';
import BoxGroup from 'melon/BoxGroup';
export default function View(props) {
    return (
        <div>
            <h4>整体禁用</h4>
            <div style={{display: 'flex'}}>
                <BoxGroup name="boxgroup3" boxModel="checkbox" defaultValue={['C']} disabled>
                    <option value="A" label="青年A" />
                    <option value="B" label="青年B" />
                    <option name="checkbox1" value="C" label="青年C" />
                </BoxGroup>
                <BoxGroup name="boxgroup3" boxModel="radio" defaultValue={['C']} disabled>
                    <option value="A" label="青年A" />
                    <option value="B" label="青年B" />
                    <option name="checkbox1" value="C" label="青年C" />
                </BoxGroup>
            </div>
            <h4>禁用某些项</h4>
            <div style={{display: 'flex'}}>
                <BoxGroup name="boxgroup3" boxModel="checkbox" defaultValue={['C']}>
                    <option value="A" label="青年A" disabled />
                    <option value="B" label="青年B" />
                    <option name="checkbox1" value="C" label="青年C" />
                </BoxGroup>
                <BoxGroup name="boxgroup3" boxModel="radio" defaultValue={['C']}>
                    <option value="A" label="青年A" />
                    <option value="B" label="青年B" disabled />
                    <option name="checkbox1" value="C" label="青年C" />
                </BoxGroup>
            </div>
        </div>
    );
}
```

### 通过 `createOptions` 来批量生成选项

```react 批量生成选项
import React from 'react';
import BoxGroup, {createOptions} from 'melon/BoxGroup';

const OPTIONS = Array
    .from({length: 10})
    .map((_, index) => ({
        name: `第${index}项`,
        value: `value-${index}`,
        disabled: index === 5
    }));

export default function View(props) {
    return (
        <div>
            <div style={{display: 'flex'}}>
                <BoxGroup name="boxgroup3" boxModel="checkbox">
                    {createOptions(OPTIONS)}
                </BoxGroup>
                <BoxGroup name="boxgroup3" boxModel="radio">
                    {createOptions(OPTIONS)}
                </BoxGroup>
            </div>
        </div>
    );
}
```

### 属性

#### BoxGroup

|名称|类型|默认值|描述|
|---|---|---|---|
|value|Array\<string\>|无|组件的值，与 `defaultValue` 不可同时存在；一般与 `onChange` 同时设定|
|defaultValue|Array\<string\>|无|默认值，与 `value` 不可同时存在|
|onChange|Function|无|组件值变化事件|
|disabled|boolean|false|是否为禁用|
|children|Array\<option\>|无|一般由多个 option 构成|

#### option

|名称|类型|默认值|描述|
|---|---|---|---|
|name|string|无|选项的文本|
|value|string|无|选项值|
|disabled|boolean|false|是否为禁用|
