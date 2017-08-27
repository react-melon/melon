## Ripple

### TouchRipple

```react TouchRipple
import React from 'react';
import {TouchRipple} from 'melon/Ripple';

const REAT_BASE_STYLE = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1 auto',
    height: '20rem',
    position: 'relative',
    borderRadius: '5px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#eee'
};

function getRectStyle(color, index) {
    return {
        ...REAT_BASE_STYLE,
        borderColor: color,
        marginLeft: index ? '1rem' : null,
        color
    };
}

const RECTS = [
    '#333333',
    '#2196f3',
    '#009F93'
];

export default () => {

    let rects = RECTS.map((rect, index) => (
        <div
            key={rect}
            style={getRectStyle(rect, index)}>
            {rect}
            <TouchRipple color={rect} />
        </div>
    ));

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {rects}
        </div>
    );

}
```

### CenterRipple

```react CenterRipple
import React from 'react';
import {CenterRipple} from 'melon/Ripple';

const REAT_BASE_STYLE = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1 auto',
    height: '20rem',
    position: 'relative',
    borderRadius: '5px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#eee',
    useSelect: 'none'
};

function getRectStyle(color, index) {
    return {
        ...REAT_BASE_STYLE,
        borderColor: color,
        marginLeft: index ? '1rem' : null,
        color
    };
}

const RECTS = [
    '#333333',
    '#2196f3',
    '#009F93'
];

export default () => {

    let rects = RECTS.map((rect, index) => (
        <div
            key={rect}
            style={getRectStyle(rect, index)}>
            {rect}
            <CenterRipple color={rect} />
        </div>
    ));

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {rects}
        </div>
    );

}
```
