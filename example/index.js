/**
 * @file melon example index
 * @author leon <ludafa@outlook.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import HashLocator from 'numen/HashLocator';

import BoxGroup from './BoxGroup';
import Breadcrumb from './Breadcrumb';
import Button from './Button';
import Chip from './Chip';
import Dialog from './Dialog';
import Drawer from './Drawer';
import Grid from './Grid';
import Icon from './Icon';
import Pager from './Pager';
import Progress from './Progress';
import Region from './Region';
import ScrollView from './ScrollView';
import Select from './Select';
import Slider from './Slider';
import SnackBar from './SnackBar';
import Table from './Table';
import Tabs from './Tabs';
import TextBox from './TextBox';
import Tooltip from './Tooltip';
import Tree from './Tree';
import Uploader from './Uploader';
import Zippy from './Zippy';

import App from './App';
import config from './config';
import './index.styl';

const routes = {
    BoxGroup,
    Breadcrumb,
    Button,
    Chip,
    Dialog,
    Drawer,
    Grid,
    Icon,
    Pager,
    Progress,
    Region,
    ScrollView,
    Select,
    Slider,
    SnackBar,
    Table,
    Tabs,
    TextBox,
    Tooltip,
    Tree,
    Uploader,
    Zippy
};

/* eslint-disable no-console */

function bootstrap(account) {

    const locator = new HashLocator();

    locator.on(function (location) {

        const name = location.pathname.slice(1) || 'Button';
        const Component = routes[name];

        ReactDOM.render(
            <App
                Component={Component}
                name={name}
                components={config.components} />,
            document.querySelector('#app')
        );

    });

    locator.start();
}

bootstrap();
