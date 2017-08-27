## Chip

[Chip](https://material.google.com/components/chips.html#chips-specs) 是一种小块的用来呈现复杂实体的块，比如说日历的事件或联系人。它可以包含一张图片，一个短字符串(必要时可能被截取的字符串)，或者是其它的一些与实体对象有关的简洁的信息。

```react Chip
import React from 'react';
import Chip from 'melon/Chip';
import Avatar from 'melon/Avatar';
import AVATAR_IMAGE from './img/uxceo-128.jpg';
export default () => {
    return (
        <div style={{display: 'flex'}}>
            <Chip> hello, melon~ </Chip>
            <Chip style={{marginLeft: '1rem', backgroundColor: '#2196f3', color: '#fff'}}>
                <Avatar icon="add" style={{color: '#fff', backgroundColor: '#009688'}}/>
                hello, melon~
            </Chip>
            <Chip removable style={{marginLeft: '1rem'}}>
                <Avatar icon="home" />
                hello, melon~
            </Chip>
            <Chip
                removable
                removeButtonStyle={{backgroundColor: '#4caf50'}}
                style={{marginLeft: '1rem'}}>
                <Avatar icon="home" />
                hello, melon~
            </Chip>
            <Chip style={{marginLeft: '1rem'}}>
                <Avatar image={AVATAR_IMAGE} />
                Image Avatar Chip
            </Chip>
        </div>
    );

}
```

### 渲染一组 Chip

下面是一个渲染成组的 `Chip` 的示例。

```react render a groups of chips
import React, {PureComponent} from 'react';
import Chip from 'melon/Chip';
export default class ChipExample extends PureComponent {

    state = {
        chips: ['React', 'Redux', 'numen', 'melon'],
        message: ''
    };

    render() {

        let {chips, message} = this.state;

        let children = this.state.chips.length
            ? this.state.chips.map((chip, index) => {
                return (
                    <Chip
                        key={chip}
                        removable
                        style={{marginLeft: index > 0 ? '0.5rem' : 0}}
                        onRemove={() => this.setState({
                            chips: [...chips.slice(0, index), ...chips.slice(index + 1)],
                            message: `移除${chip}`
                        })}
                        onClick={() => this.setState({message: `点击${chip}`})}>
                        {chip}
                    </Chip>
                );
            })
            : '没有 chips 啦';

        return (
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div>{children}</div>
                <p style={{marginLeft: '0.5rem', color: '#aaa'}}>{message}</p>
            </div>
        );

    }

}
```

## API

### 属性

|名称|类型|默认值|描述|
|---|---|---|---|
|removable|boolean|true|是否可以移除|
|removeButtonStyle|object|无|给移除按钮添加额外的样式|
|children|any|无|任意内容；如果包含 Avatar，那么会被当作左侧的图标；如果有多个 Avatar 会选取最后一个|
|onRemove|function|无|点击移除按钮时回调|
