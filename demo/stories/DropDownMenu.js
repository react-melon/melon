/**
 * @file DropDownMenu
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {MenuItem} from '../../src/Menu';
import DropDownMenu from '../../src/DropDownMenu';
import Button from '../../src/Button';

let book = storiesOf('DropDownMenu', module);

book.add('用法', () => (

    <DropDownMenu
        label={<Button>启动 / 暂停</Button>}>
        <MenuItem label="启动" icon="play-arrow" onClick={action('start')} />
        <MenuItem label="暂停" icon="pause" onClick={action('pause')} />
    </DropDownMenu>

));
