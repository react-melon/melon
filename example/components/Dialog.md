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

### Alert & Confirm

对于系统中常用的 `window.alert` 和 `window.confirm` 来讲，`Dialog` 使用起来稍显示复杂。

因此，我们提供了更加简单的命令式 API，简化开发。

```react Alert & Confirm API
import {Alert, Confirm, Button} from 'melon';
import React from 'react';
export default () => (
    <div>
        <Button
            variants={['dange']}
            onClick={() => {
                Alert.show({
                    title: '出错了',
                    children: '对不起，服务异常，请稍候再试',
                    onConfirm: close => close(),
                    width: 400
                });
            }}>
            弹出警告对话窗
        </Button>
        <Button
            variants={['dange']}
            onClick={() => {
                Confirm.show({
                    title: '请确认',
                    children: '此消息被删除后无法恢复，确认要删除它吗？',
                    width: 400,
                    // onCancel(close) {
                    //    如果不指定 onCancel / onConfirm 的处理函数，会自动关闭掉对话窗
                    // },
                    onConfirm(close) {
                        // 这里可以做一些额外的处理
                        // 如果指定了 onCancel / onConfirm 那么需要手动关闭对话窗
                        close();
                    }
                });
            }}>
            弹出确认对话窗
        </Button>
    </div>
)
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
