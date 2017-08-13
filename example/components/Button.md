## Button

material风格的按钮，带有 waves 动画，有 `Flat` `Raised` `Floating` 三种样式，有 default、primary、secondery、success、info、warning、danger 七种状态，支持图标按钮

### Flat Button

[Flat Button](https://material.google.com/components/buttons.html#buttons-flat-raised-buttons) 用于通用功能和减少分层在屏幕上，使其更具可读性。

```react Flat 按钮
import React from 'react';
import Button from 'melon/Button';
import Icon from 'melon/Icon';
export default function () {
    return (
        <section>
            <div style={{display: 'flex'}}>
                <Button>default</Button>
                <Button variants={['primary']}>primary</Button>
                <Button variants={['secondery']}>secondery</Button>
                <Button variants={['success']}>success</Button>
                <Button variants={['info']}>info</Button>
                <Button variants={['warning']}>warning</Button>
                <Button variants={['danger']}>danger</Button>
                <Button variants={['danger']}>
                    <Icon icon="add" />
                </Button>
            </div>
        </section>
    );
};
```
### Raised Button

[Raised Button](https://material.google.com/components/buttons.html#buttons-flat-raised-buttons) 用于在平面布局和页面上强调重要的功能。

```react Raised 按钮
import React from 'react';
import Button from 'melon/Button';
import Icon from 'melon/Icon';
export default function () {
    return (
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Button variants={['primary', 'raised']}>default</Button>
            <Button variants={['primary', 'raised']}>primary</Button>
            <Button variants={['secondery', 'raised']}>secondery</Button>
            <Button variants={['success', 'raised']}>success</Button>
            <Button variants={['info', 'raised']}>info</Button>
            <Button variants={['warning', 'raised']}>warning</Button>
            <Button variants={['danger', 'raised']}>danger</Button>
            <Button variants={['danger', 'raised']}><Icon icon="add" /></Button>
        </div>
    );
};
```

### Floating Action Button

[浮动动作按钮](https://material.io/guidelines/components/buttons-floating-action-button.html) 代表着应用中的主要动作。

```react FloatingAction 按钮
import React from 'react';
import Button from 'melon/Button';
import Icon from 'melon/Icon';

export default () => (
    <div style={{display: 'flex'}}>
        <Button variants={['floating', 'success']}>
            <Icon icon="add" />
        </Button>
        <Button variants={['floating', 'primary']} style={{marginLeft: '1rem'}}>
            <Icon icon="edit" />
        </Button>
    </div>
);
```

### 与 Icon 结合使用

```react 与 Icon 结合使用
import React from 'react';
import Button from 'melon/Button';
import Icon from 'melon/Icon';

export default () => (
    <div style={{display: 'flex'}}>
        <Button><Icon icon="add" style={{marginRight: '.5rem'}}/>添加</Button>
        <Button variants={['raised', 'primary']} style={{marginLeft: '1rem'}}>
            <Icon icon="edit" style={{marginRight: '.5rem'}}/>编辑
        </Button>
        <Button variants={['raised', 'danger']} style={{marginLeft: '1rem'}}>
            喜欢 <Icon icon="favorite" style={{marginLeft: '.5rem'}}/>
        </Button>
    </div>
);
```

### 按钮组

```react 按钮组
import React from 'react';
import Button from 'melon/Button';
export default function View(props) {
    return (
        <div className="melon-row">
            <div className="melon-column melon-column-12">
                <div className="ui-buttongroup">
                    <Button variants={['raised', 'info']}>
                        添加
                    </Button>
                    <Button variants={['raised', 'info']}>
                        删除
                    </Button>
                    <Button variants={['raised', 'info']}>
                        启用
                    </Button>
                </div>
            </div>
        </div>
    );
}
```

### 不同大小的按钮

```react 按钮大小
import React from 'react';
import Button from 'melon/Button';

export default function (props) {
    return (
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <Button variants={['raised', 'primary']} size="xxs">xxs</Button>
            <Button variants={['raised', 'primary']} size="xs">xs</Button>
            <Button variants={['raised', 'primary']} size="s">s</Button>
            <Button variants={['raised', 'primary']} size="m">m</Button>
            <Button variants={['raised', 'primary']} size="l">l</Button>
            <Button variants={['raised', 'primary']} size="xl">xl</Button>
            <Button variants={['raised', 'primary']} size="xxl">xxl</Button>
            <Button variants={['raised', 'primary']} size="xxxl">xxxl</Button>
        </div>
    );
}
```
### 禁用状态

```react 禁用状态
import React from 'react';
import Button from 'melon/Button';
export default function (props) {
    return (
        <div className="melon-row">
            <div className="melon-column melon-column-12">
                <Button disabled>disabled</Button>
                <Button variants={['raised']} disabled>disabled</Button>
            </div>
        </div>
    );
}
```

### 属性

|名称|类型|默认值|描述|
|---|---|---|---|
|hasRipple|boolean|true|是否有 waves 动画|
|disabled|boolean|false|禁用|
|variants|array\|string|无|不同的按钮样式|
|children|any|无|任意内容|
|onClick|function|无|点击事件回调|

> 可以添加任意 `button` 元素支持的其他属性
