## Popover

### 示例

```react Popover
import React, {Component} from 'react';
import Popover from 'melon/Popover';
export default class PopoverDemo extends Component{

    state = {
        open: false
    };

    render() {
        return (
            <div>
                <label 
                    ref="label"
                    onClick={() => this.setState({open: true})}
                >
                    click me
                </label>
                <Popover
                    open={this.state.open}
                    anchor={this.refs.label}
                    onRequestClose={() => this.setState({open: false})}
                >
                    hahaha
                </Popover>
            </div>
        );
    }

}
```
