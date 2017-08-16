## Breadcrumb

显示当前页面在系统层级结构中的位置，并能向上返回。

### 何时使用

1. 当系统拥有超过两级以上的层级结构时；
2. 当需要告知用户『你在哪里』时；
3. 当需要向上导航的功能时。


```react 简单使用
import React from 'react';
import Breadcrumb, {Item} from 'melon/Breadcrumb';

export default () => (
    <Breadcrumb>
        <Item href="#/">首页</Item>
        <Item href="#/settings">设置</Item>
        <Item href="#/settings/user">用户设置</Item>
        <Item>头像设置</Item>
    </Breadcrumb>
)
```

### 设置 `seperator` 可以自定义分隔符

```react 自定义分隔符
import React from 'react';
import Breadcrumb, {Item} from 'melon/Breadcrumb';
import Icon from 'melon/Icon';

export default () => (
    <div>
        <Breadcrumb seperator="|">
            <Item href="#/">首页</Item>
            <Item href="#/settings">设置</Item>
            <Item href="#/settings/user">用户设置</Item>
            <Item>头像设置</Item>
        </Breadcrumb>
        <Breadcrumb seperator="🐶">
            <Item href="#/">首页</Item>
            <Item href="#/settings">设置</Item>
            <Item href="#/settings/user">用户设置</Item>
            <Item>头像设置</Item>
        </Breadcrumb>
    </div>
)
```

### 与 `Icon` 结合使用

```react 与 Icon 结合使用
import React from 'react';
import Breadcrumb, {Item} from 'melon/Breadcrumb';
import Icon from 'melon/Icon';

export default () => (
    <Breadcrumb>
        <Item href="#/">
            <Icon icon="home" />
        </Item>
        <Item href="#/settings">
            <Icon icon="settings" />
            <span>设置</span>
        </Item>
        <Item href="#/settings/user">用户设置</Item>
        <Item>头像设置</Item>
    </Breadcrumb>
)
```

### 使用 `Breadcrumb.createCrumbs` 来批量创建结点

```react 使用 createCrumbs 批量创建结点
import React from 'react';
import Breadcrumb from 'melon/Breadcrumb';

const ITEMS = Array
    .from({length: 5})
    .map((_, index) => (
        {
            text: `第${index}级`,
            href: index < 4 ? `#/level${index}` : null,
            icon: 'done'
        }
    ));

export default () => (
    <Breadcrumb>
        {Breadcrumb.createCrumbs(ITEMS)}
    </Breadcrumb>
)
```

## API

### Breadcrumb

|名称|类型|默认值|描述|
|---|---|---|---|
|seperator|element|/|分隔符|

### BreadcrumbItem

|名称|类型|默认值|描述|
|---|---|---|---|
|href|string|无|点击时跳转的链接|
