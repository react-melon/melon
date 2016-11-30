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

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 2
        };
    }

    renderPanel(content) {
        return (
            <div style={{
                display: 'flex',
                height: '10rem',
                background: '#eee',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666'
            }}>
                {content}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Title level={3}>Tabs</Title>
                <p>uncontrolled tabs</p>
                <Tabs
                    selectedIndex={1}
                    style={{width: 500}}>
                    <Tab label="Tab A" id="Tab1">
                        {this.renderPanel('This is Tab A')}
                    </Tab>
                    <Tab label="Tab B">
                        {this.renderPanel('This is Tab B')}
                    </Tab>
                    <Tab label="Tab C">
                        {this.renderPanel()}
                    </Tab>
                    <Tab label="被禁用的Tab" disabled />
                </Tabs>
                <p>controlled tabs</p>
                <div style={{margin: '1rem 0'}}>
                    当前选中的是第 {this.state.selectedIndex} 个 tab
                </div>
                <Tabs
                    selectedIndex={this.state.selectedIndex}
                    onChange={({selectedIndex}) => this.setState({selectedIndex})}>
                    <Tab label="Tab A" id="Tab1">
                        {this.renderPanel('This is Tab A')}
                    </Tab>
                    <Tab label="Tab B">
                        {this.renderPanel('This is Tab B')}
                    </Tab>
                    <Tab label="Tab C">
                        {this.renderPanel()}
                    </Tab>
                    <Tab label="被禁用的Tab" disabled />
                </Tabs>
            </div>
        );
    }

}

module.exports = View;
