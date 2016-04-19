/**
 * @file melon demo Tabs
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';

import Title from '../src/Title';
import Tabs from '../src/Tabs';

/* eslint-disable no-console */

const Tab = Tabs.Tab;

class View extends React.Component {

    render() {
        return (
            <div>
                <Title level={3}>Tabs</Title>

                <Tabs initialSelectedIndex={1} style={{width: 500}} onBeforeChange={this.onBeforeChange}>
                    <Tab label="Tab A" id="Tab1">This is Tab A</Tab>
                    <Tab label="Tab B">This is Tab B</Tab>
                    <Tab label="Tab C" />
                    <Tab label="被禁用的Tab" disabled />
                </Tabs>

            </div>
        );
    }

    onBeforeChange({selectedIndex}) {
        console.log('你选择了' + selectedIndex);
    }
}

module.exports = View;
