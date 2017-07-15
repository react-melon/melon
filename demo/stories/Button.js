/**
 * @file Melon Story
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import Button from '../../src/Button';
import CenterDecorator from '../decorator/CenterDecorator';

storiesOf('Button', module)
    .addDecorator(CenterDecorator)
    .add('with text', () => (
        <Button onClick={action('clicked')}>Hello Button</Button>
    ))
    .add('with some emoji', () => (
        <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
    ));
