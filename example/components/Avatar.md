## Avatar

Avatar 可以用来表现人物头像或者是人物简称。

### 示例

```react Examples
import React from 'react';
import Avatar from 'melon/Avatar';
import IMG from './img/uxceo-128.jpg';
export default () => {

    return (
        <section>
            <div>
                <h3>使用文本</h3>
                <div style={{margin: '1rem 0'}}>
                    <Avatar style={{backgroundColor: '#111', marginRight: '1rem'}}>A</Avatar>
                    <Avatar style={{marginRight: '1rem'}}>BC</Avatar>
                    <Avatar>D</Avatar>
                </div>
            </div>
            <div>
                <h3>使用 icon</h3>
                <div style={{margin: '1rem 0'}}>
                    <Avatar style={{backgroundColor: '#111', marginRight: '1rem'}} icon="home"/>
                    <Avatar icon="favorite" />
                </div>
            </div>
            <div>
                <h3>使用图片</h3>
                <div style={{margin: '1rem 0'}}>
                    <Avatar image={IMG} />
                </div>
            </div>
            <div>
                <h3>使用svg</h3>
                <div style={{margin: '1rem 0'}}>
                    <Avatar>
                        <svg
                            viewBox="0 0 24 24"
                            style={{
                                display: 'inline-block',
                                color: '#fff',
                                fill: '#fff',
                                height: '20px',
                                width: '20px',
                                margin: '8px'
                            }}>
                            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                        </svg>
                    </Avatar>
                </div>
            </div>
            <div>
                <h3>不同大小</h3>
                <div style={{margin: '1rem 0'}}>
                    {['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'].map(
                        size => (<Avatar key={size} size={size} style={{marginLeft: '1rem'}}>{size}</Avatar>)
                    )}
                </div>
            </div>
        </section>
    );

}
```

## API

### 属性

|名称|类型|默认值|描述|
|---|---|---|---|
|image|string|无|图片地址|
|icon|string|无|使用的 icon 编码|
|children|any|无|任意内容|
