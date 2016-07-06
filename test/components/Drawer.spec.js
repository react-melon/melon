/**
 * @file Drawer单测
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

import then from '../then';

import Drawer from '../../src/Drawer';
import Mask from '../../src/Mask';

const TestComponent = React.createClass({
    getInitialState() {
        return {
            open: false
        };
    },

    render() {

        return (
            <Drawer
                onHide={() => {}}
                {...this.props}
                open={this.state.open} />
        );
    }
});

describe('Drawer', () => {

    let component;

    it('work', done => {

        const spy = expect.createSpy();
        component = TestUtils.renderIntoDocument(<TestComponent onHide={spy} />);
        const drawer = TestUtils.findRenderedComponentWithType(component, Drawer);
        const masks = TestUtils.scryRenderedComponentsWithType(component, Mask);
        const dWindow = TestUtils.findRenderedDOMComponentWithClass(component, 'ui-drawer-window');

        expect(TestUtils.isCompositeComponent(drawer)).toBe(true);
        expect(TestUtils.isDOMComponent(dWindow)).toBe(true);
        expect(ReactDOM.findDOMNode(drawer).className).toBe('ui-drawer');
        expect(masks.length).toBe(1);

        component.setState({open: true});
        then(() => {
            expect(dWindow.style.opacity).toBe('1');
            TestUtils.Simulate.click(ReactDOM.findDOMNode(masks[0]));
        })
        .then(() => {
            expect(spy).toHaveBeenCalled();
            expect(dWindow.style.opacity).toBe('1');
            component.setState({open: false});
        })
        .then(() => {
            expect(dWindow.style.opacity).toBe('0');
            done();
        });

    });

    it('no mask', () => {
        component = TestUtils.renderIntoDocument(<TestComponent mask={false} />);
        let masks = TestUtils.scryRenderedComponentsWithType(component, Mask);

        expect(masks.length).toBe(0);
    });

    ['top', 'left', 'right', 'bottom'].forEach(function (pos) {

        it('position ' + pos, () => {
            component = TestUtils.renderIntoDocument(<TestComponent position={pos} />);
            const dWindow = TestUtils.findRenderedDOMComponentWithClass(component, 'ui-drawer-window');

            expect(dWindow.style.transition).toInclude(pos);
        });

        it('position ' + pos + ' size < 0', () => {
            component = TestUtils.renderIntoDocument(<TestComponent position={pos} size={-100} />);
            const dWindow = TestUtils.findRenderedDOMComponentWithClass(component, 'ui-drawer-window');

            const REVERT_POSITION = {
                top: 'bottom',
                bottom: 'top',
                left: 'right',
                right: 'left'
            };

            expect(dWindow.style.transition).toInclude(REVERT_POSITION[pos]);
        });

    });

});

