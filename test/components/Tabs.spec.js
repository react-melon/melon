/**
 * @file Tabs单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import TestUtils from 'react-addons-test-utils';

import Tabs from '../../src/Tabs';
import TabsPanel from '../../src/tabs/Panel';

const Tab = Tabs.Tab;

expect.extend(expectJSX);

/* globals before, after */

describe('Tabs component', function () {

    let renderer;
    let container;

    beforeEach(function () {
        renderer = TestUtils.createRenderer();
    });

    afterEach(function () {
        renderer = null;
    });

    after(function () {
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
        container = null;
    });

    it('Tab', function () {
        renderer.render(<Tab label="Tab1" selected />);
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (<li className="ui-tabs-item state-selected">Tab1</li>);
        expect(actualElement).toEqualJSX(expectedElement);
    });

    it('TabsPanel', function () {
        renderer.render(<TabsPanel active />);
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (<div className="ui-tabs-panel state-active" />);
        expect(actualElement).toEqualJSX(expectedElement);
    });

    it('Tabs Structure', function () {
        renderer.render(
            <Tabs>
                <Tab label="Tab1">
                    Tab1 Content
                </Tab>
                <Tab label="Tab2" disabled>
                    Tab2 Content
                </Tab>
            </Tabs>
        );
        let actualElement = renderer.getRenderOutput();

        let expectedElement = (
            <div className="ui-tabs" selectedIndex={0}>
                <ul>
                    <Tab
                        label="Tab1"
                        selected={true}
                        style={{width: '50%'}}
                        onClick={function noRefCheck() {}}
                        tabIndex={0}>
                        Tab1 Content
                    </Tab>
                    <Tab
                        label="Tab2"
                        selected={false}
                        style={{width: '50%'}}
                        disabled={true}
                        tabIndex={1}>
                        Tab2 Content
                    </Tab>
                    <li className="ui-tabs-inkbar" style={{left: 'calc(50%*0)', width: '50%'}} />
                </ul>
                <TabsPanel active={true}>
                   Tab1 Content
                </TabsPanel>
                <TabsPanel active={false}>
                   Tab2 Content
                </TabsPanel>
            </div>
        );

        expect(actualElement).toEqualJSX(expectedElement);
    });

    it('Tabs functions', function (done) {

        let firstClick = true;

        const TestComponent = React.createClass({

            getInitialState() {
                return {
                    tabIndex: 0
                };
            },

            componentDidMount() {
                let tab2 = document.getElementById('tab2');
                TestUtils.Simulate.click(tab2);
            },

            onBeforeChange(e) {

                if (!firstClick) {
                    return;
                }

                firstClick = false;

                expect(e.selectedIndex).toBe(1);
                e.preventDefault();

                this.setState({
                    tabIndex: e.selectedIndex
                }, () => {
                    expect(this.refs.tabs.state.selectedIndex).toBe(1);
                    let tab2 = document.getElementById('tab2');
                    TestUtils.Simulate.click(tab2);
                    let tab1 = document.getElementById('tab1');
                    TestUtils.Simulate.click(tab1);
                });
            },

            onChange(e) {
                expect(e.selectedIndex).toBe(0);
                expect(this.refs.tabs.state.selectedIndex).toBe(0);
                done();
            },

            render() {
                return (
                    <Tabs
                        selectedIndex={this.state.tabIndex}
                        ref="tabs"
                        onBeforeChange={this.onBeforeChange}
                        onChange={this.onChange}>
                        <Tab label="Tab1" id="tab1">
                            Tab1 Content
                        </Tab>
                        <Tab label="Tab2" id="tab2">
                            Tab2 Content
                        </Tab>
                    </Tabs>
                );
            }
        });

        container = document.createElement('div');
        document.body.appendChild(container);

        ReactDOM.render(<TestComponent />, container);

    });

});
