## DropDownMenu

### 示例

```react DropDownMenu
import React, {Component} from 'react';
import DropDownMenu from 'melon/DropDownMenu';
import {MenuItem} from 'melon/Menu';

export default class DropDownMenuDemo extends Component {

    render() {
        return (
            <div>
                <DropDownMenu label="heihei">
                    <MenuItem label="favorite" icon="favorite" />
                    <MenuItem label="favorite" icon="checked" />
                    <MenuItem label="favorite" />
                    <MenuItem label="favorite" />
                    <MenuItem label="favorite" />
                </DropDownMenu>
            </div>
        );
    }

}
```
