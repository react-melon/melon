/**
 * @file react story book configure
 * @author leon <ludafa@outlook.com>
 */

import {configure, setAddon} from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import {setOptions} from '@kadira/storybook-addon-options';
// import React from 'react';
// import {whyDidYouUpdate} from 'why-did-you-update';
//
// if (process.env.NODE_ENV !== 'production') {
//     whyDidYouUpdate(React);
// }

setAddon(infoAddon);

setOptions({
    name: 'Melon',
    url: 'https://github.com/react-melon/melon',
    goFullScreen: true,
    showLeftPanel: true,
    showDownPanel: false,
    showSearchBox: false,
    downPanelInRight: false,
    sortStoriesByKind: false
});

function loadStories() {
    require('./index.styl');
    require('./stories/Button.js');
    require('./stories/Dialog.js');
    require('./stories/IconMenu.js');
    require('./stories/Select.js');
    require('./stories/Popover.js');
    require('./stories/Tooltip.js');
    require('./stories/Navigation.js');
    require('./stories/Table.js');
    require('./stories/Alert.js');
    require('./stories/Confirm.js');
    require('./stories/DropDownMenu.js');
}

configure(loadStories, module);
