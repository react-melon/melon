## Drawer

```react Drawer
import React, {Component} from 'react';
import Drawer from 'melon/Drawer';
import {FlatButton} from 'melon/Button';
import BoxGroup from 'melon/BoxGroup';
import Slider from 'melon/Slider';

export default class DrawerDemo extends Component {

    state = {
        open: false,
        position: 'left',
        size: 300
    };

    render() {
        let {position, open, size} = this.state;
        return (
            <div>
                <h4>位置</h4>
                <BoxGroup
                    variants={['horizontal', 'fluid']}
                    boxModel="radio"
                    value={position}
                    onChange={e => this.setState({position: e.value[0]})}
                >
                    <option value="left">左</option>
                    <option value="right">右</option>
                    <option value="top">上</option>
                    <option value="bottom">下</option>
                </BoxGroup>
                <h4>大小</h4>
                <Slider 
                    maximum={500}
                    minimum={100}
                    value={size} 
                    step={10} 
                    onChange={e => this.setState({size: e.value})} 
                />
                <FlatButton 
                    onClick={() => this.setState({open: true})}>
                    open a drawer
                </FlatButton>
                <Drawer 
                    size={size}
                    open={open}
                    maskClickClose={true}
                    position={position}
                    onHide={() => this.setState({open: false})}>
                    drawer content
                </Drawer>
            </div>
        );

    }

}
```

## API

### 属性

|名称|类型|默认值|描述|
|---|---|---|---|
|position|string|left|指定 Drawer 显示的位置|
|open|boolean|false|是否打开|
|size|number|300|Drawer的大小
|mask|boolean|true|是否使用遮罩层|
|maskClickClose|true|true|点击遮罩层是否关闭|
|onHide|Function|无|关闭事件回调|
