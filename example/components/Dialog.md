## Dialog

[对话框 Dialog](https://material.google.com/components/dialogs.html) 用于提示用户作一些决定，或者是完成某个任务时需要的一些其它额外的信息。 Dialog可以是用一种 取消/确定 的简单应答模式，也可以是自定义布局的复杂模式，比如说一些文本设置或者是文本输入 。

### 简单用法

```react Dialog 简单用法
import React, {PureComponent} from 'react';
import Dialog from 'melon/Dialog';
import Button from 'melon/Button';
export default class DialogDemo extends PureComponent {
    state = {
        open: false
    };
    render() {
        return (
            <div>
                <Button
                    variants={['raised', 'primary']}
                    onClick={() => this.setState({open: true})}>
                    打开对话窗
                </Button>
                <Dialog
                    open={this.state.open}
                    onHide={() => this.setState({open: false})}>
                    Hello
                </Dialog>
            </div>
        );
    }

}
```

### 带按钮和标题的对话窗

你可以通过配置 `title` 和 `actions` 属性来调整标题和按钮

```react 带按钮和标题的对话窗
import React, {PureComponent} from 'react';
import Dialog from 'melon/Dialog';
import Button from 'melon/Button';
export default class DialogDemo extends PureComponent {
    state = {
        open: false
    };
    render() {
        const actions = [
            <Button
                label="取消"
                key="cancel"
                variants={['danger']}
                onClick={() => this.setState({open: false})} />,
            <Button
                label="确认"
                key="submit"
                variants={['info']}
                onClick={() => this.setState({open: false})} />
        ];
        return (
            <div>
                <Button
                    variants={['raised', 'primary']}
                    onClick={() => this.setState({open: true})}>
                    打开对话窗
                </Button>
                <Dialog
                    open={this.state.open}
                    onHide={() => this.setState({open: false})}
                    title="我是一个对话窗，还有有两个按钮"
                    actions={actions}>
                    我是一个对话窗，还有有两个按钮
                </Dialog>
            </div>
        );
    }

}
```

### 内容超长时的对话窗

当对话窗的内容很长时，对话窗会在整个浏览器器内部间滚动。

```react 内容超长时的对话窗
import React, {PureComponent} from 'react';
import Dialog from 'melon/Dialog';
import Button from 'melon/Button';
export default class DialogDemo extends PureComponent {
    state = {
        open: false
    };
    render() {
        return (
            <div>
                <Button
                    variants={['raised', 'primary']}
                    onClick={() => this.setState({open: true})}>
                    打开对话窗
                </Button>
                <Dialog
                    open={this.state.open}
                    onHide={() => this.setState({open: false})}>
                    <div style={{height: 1000}}>Hello</div>
                </Dialog>
            </div>
        );
    }

}
```

### 属性

|名称|类型|默认值|描述|
|---|---|---|---|
|open|boolean|false|是否打开对话窗|
|title|string|无|标题|
|actiosn|Array\<ReactElement\>|无|对话窗底部按钮|
|children|any|无|任意内容|
|onShow|function|无|对话窗显示时回调|
|onHide|function|无|对话窗关闭时回调|
