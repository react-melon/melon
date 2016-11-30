/**
 * @file Tabs单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {mount, shallow} from 'enzyme';
import Tabs from '../../src/Tabs';
import TabsPanel from '../../src/tabs/Panel';
import then from '../then';

const Tab = Tabs.Tab;

describe('Tabs', function () {

    let renderer;
    let container;

    beforeEach(function () {
        renderer = TestUtils.createRenderer();
    });

    afterEach(function () {
        renderer = null;
    });

    afterAll(function () {
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
        container = null;
    });

    it('Tab', function () {

        const tab = shallow(
            <Tab label="Tab1" selected />
        );

        expect(tab.hasClass('ui-tabs-item')).toBe(true);
        expect(tab.hasClass('state-selected')).toBe(true);

    });

    it('TabsPanel', function () {
        renderer.render(<TabsPanel active />);
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (<div className="ui-tabs-panel state-active" />);
        expect(actualElement).toEqualJSX(expectedElement);
    });

    it('Tabs functions', function (done) {

        const spy = jasmine.createSpy('tabs-change');

        const tabs = mount(
            <Tabs onChange={spy}>
                <Tab label="Tab1" id="tab1">
                    Tab1 Content
                </Tab>
                <Tab label="Tab2" id="tab2">
                    Tab2 Content
                </Tab>
            </Tabs>
        );

        const labels = tabs.find('.ui-tabs-item');

        expect(labels.length).toBe(2);
        expect(tabs.find('.ui-tabs-panel').length).toBe(2);
        expect(tabs.state('selectedIndex')).toBe(0);

        labels.at(1).simulate('click');

        then(() => {
            expect(tabs.state('selectedIndex')).toBe(1);
            done();
        });

    });

});
